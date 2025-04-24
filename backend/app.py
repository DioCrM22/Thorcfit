import os
import uuid
import bcrypt
import jwt
import secrets
import string
import smtplib
import requests 
import traceback
import random
import re
import socket
import ssl


from datetime import datetime, timedelta, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from dotenv import load_dotenv, find_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential
import psycopg2

load_dotenv(find_dotenv(), override=True, encoding='utf-8')
print("CARREGOU GOOGLE_CLIENT_ID:", os.getenv("GOOGLE_CLIENT_ID"))

# Configuração da aplicação Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# ======================================
# ROTA DO FAVICON (Adicione aqui)
# ======================================

@app.route('/favicon.ico')
def favicon():
    return '', 204 

# ======================================
# CONFIGURAÇÕES
# ======================================

# Validação de variáveis essenciais
required_env_vars = ["JWT_SECRET", "EMAIL_SENDER", "EMAIL_PASSWORD", "DB_PASS"]
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Variáveis faltando no .env: {', '.join(missing_vars)}")

# Só depois defina DB_CONFIG
print("Variáveis de ambiente carregadas:")
print("DB_PASS:", os.getenv("DB_PASS"))  # Verifique se há caracteres inválidos
print("DB_USER:", os.getenv("DB_USER"))
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "port": os.getenv("DB_PORT")
}

# Configurações JWT
JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", 3600))  # 1 hora

# Configurações de E-mail
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
EMAIL_CONFIG = {
    "server": os.getenv("SMTP_SERVER", "smtp.gmail.com"),
    "port": int(os.getenv("SMTP_PORT", 587)),
    "sender": os.getenv("EMAIL_SENDER"),
    "password": os.getenv("EMAIL_PASSWORD")
}

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# ======================================
# MIDDLEWARES
# ======================================

@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

# ======================================
# FUNÇÕES AUXILIARES
# ======================================

def get_db_connection():
    """Cria conexão com o banco de dados"""
    return psycopg2.connect(**DB_CONFIG)

def hash_password(password):
    """Gera hash seguro para senhas"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def check_password(password, hashed_password):
    """Verifica senha contra hash armazenado"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def generate_jwt(user_id):
    return jwt.encode({
        'sub': user_id,
        'exp': datetime.utcnow() + timedelta(seconds=JWT_EXPIRATION)
    }, JWT_SECRET, algorithm="HS256")  # Adicione expiração

@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "*"  # Permite todos os headers
    response.headers["Access-Control-Allow-Methods"] = "*"  # Permite todos os métodos
    return response

def _build_cors_preflight_response():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.status_code = 200
    return response

# ======================================
# ROTAS DA API
# ======================================

@app.route('/')
def index():
    return jsonify({
        "message": "Bem-vindo à API ThorcFit",
        "endpoints": {
            "login": "/api/login (POST)",
            "cadastro": "/api/signup (POST)",
            "confirmar_email": "/api/confirmar-email/<token> (GET)",
            "forgot_password": "/api/forgot-password (POST)",
            "reset_password": "/api/reset-password (POST)",
            "google_auth": "/api/auth/google (POST)"
        }
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "online" if get_db_connection() else "offline"
    }), 200

@app.route('/api/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type deve ser application/json"}), 415

        data = request.get_json()
        campos_obrigatorios = ["nome", "email", "senha"]
        
        if not all(data.get(campo) for campo in campos_obrigatorios):
            return jsonify({"error": "Todos os campos são obrigatórios"}), 400

        nome = data['nome'].strip()
        email = data['email'].strip().lower()
        senha = data['senha']

        # Validação de e-mail antes de inserir no banco
        if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
            return jsonify({"error": "Formato de e-mail inválido"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
            if cur.fetchone():
                return jsonify({"error": "E-mail já cadastrado"}), 409

            codigo_confirmacao = ''.join(random.choice('0123456789') for _ in range(6)) 
            cur.execute("""
                INSERT INTO usuarios 
                (nome, email, senha, confirmacao_code, email_confirmado)
                VALUES (%s, %s, %s, %s, %s)
            """, (nome, email, hash_password(senha), codigo_confirmacao, True))

            conn.commit()
            return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

    except psycopg2.IntegrityError as e:
        conn.rollback()
        return jsonify({"error": "Erro nos dados fornecidos"}), 400
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        print(f"Erro geral no cadastro: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Erro interno no servidor"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type deve ser application/json"}), 415

        data = request.get_json()
        email = data.get('email', '').lower().strip()
        senha = data.get('senha', '')

        if not email or not senha:
            return jsonify({"error": "E-mail e senha são obrigatórios"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, nome, email, senha, email_confirmado 
                FROM usuarios 
                WHERE email = %s
            """, (email,))
            
            usuario = cur.fetchone()
            if not usuario:
                return jsonify({"error": "Credenciais inválidas"}), 401

            user_id, nome, email, senha_hash, email_confirmado = usuario

            if not check_password(senha, senha_hash):
                return jsonify({"error": "Credenciais inválidas"}), 401

            token = generate_jwt(user_id)
            return jsonify({
                "message": "Login bem-sucedido",
                "token": token,
                "expires_in": JWT_EXPIRATION,
                "token_type": "Bearer",
                "usuario": {
                    "id": user_id,
                    "nome": nome,
                    "email": email
                }
            }), 200

    except Exception as e:
        print(f"Erro no login: {str(e)}")
        return jsonify({"error": "Erro interno no servidor"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/auth/google', methods=['POST', 'OPTIONS'])
def google_auth():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        data = request.get_json()
        print("📥 RECEBIDO em /api/auth/google:", data)
        token = data.get('token')
        if not token:
            print("⚠️ token ausente ou vazio!")
            return jsonify({"error": "Token do Google não fornecido"}), 400

        # 1) Usa o access_token para buscar os dados do usuário
        userinfo_resp = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {token}'}
        )
        if not userinfo_resp.ok:
            return jsonify({"error": "Token do Google inválido"}), 401

        id_info = userinfo_resp.json()

        # 2) Verifica se o e-mail passou no check do Google
        if not id_info.get('email_verified'):
            return jsonify({"error": "E-mail não verificado pelo Google"}), 401

        # 3) Conecta ao DB e cria/atualiza usuário
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, nome, email, avatar 
                FROM usuarios 
                WHERE google_id = %s OR email = %s
            """, (id_info['sub'], id_info['email']))
            usuario = cur.fetchone()

            if not usuario:
                senha_fake = bcrypt.hashpw(secrets.token_bytes(16), bcrypt.gensalt()).decode('utf-8')

                cur.execute("""
                    INSERT INTO usuarios 
                    (nome, email, senha, google_id, avatar, email_confirmado)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    id_info.get('name'),
                    id_info['email'],
                    senha_fake,
                    id_info['sub'],
                    id_info.get('picture'),
                    True
                ))
                user_id = cur.fetchone()[0]
                conn.commit()
            else:
                user_id = usuario[0]

        # 4) Gera JWT da sua aplicação
        token_app = generate_jwt(user_id)
        return jsonify({
            "message": "Login bem-sucedido",
            "token": token_app,
            "expires_in": JWT_EXPIRATION,
            "token_type": "Bearer",
            "usuario": {
                "id": user_id,
                "nome": usuario[1] if usuario else id_info.get('name'),
                "email": id_info['email'],
                "avatar": usuario[3] if usuario else id_info.get('picture')
            }
        }), 200

    except Exception as e:
        print(f"Erro no login Google: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Erro interno no servidor"}), 500

    finally:
        if 'conn' in locals():
            conn.close()


@app.route('/api/validate-token', methods=['GET'])
def validate_token():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user_id = payload['sub']
        
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT id, nome, email FROM usuarios WHERE id = %s", (user_id,))
            usuario = cur.fetchone()
            
            if not usuario:
                return jsonify({"error": "Usuário não encontrado"}), 404
            
            return jsonify({
                "usuario": {
                    "id": usuario[0],
                    "nome": usuario[1],
                    "email": usuario[2]
                }
            }), 200
            
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expirado"}), 401
    except Exception as e:
        print(f"Erro na validação do token: {str(e)}")
        return jsonify({"error": "Token inválido"}), 401


# Modifique a rota /api/forgot-password
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    try:
        email = request.json.get('email', '').lower().strip()
        if not email:
            return jsonify({"error": "E-mail é obrigatório"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
            usuario = cur.fetchone()
            
            if not usuario:
                return jsonify({"error": "Email não localizado no sistema"}), 404  
    
            return jsonify({"message": "Popup de redefinição liberado"}), 200

    except Exception as e:
        print(f"Erro em forgot-password: {traceback.format_exc()}")
        return jsonify({"error": "Erro interno no servidor"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# Modifique a rota /api/reset-password (remova a validação do código)
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        email = data.get('email', '').lower().strip()
        new_password = data.get('newPassword', '')

        if not all([email, new_password]):
            return jsonify({"error": "Todos os campos são obrigatórios"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            # Busca a senha atual
            cur.execute("SELECT senha FROM usuarios WHERE email = %s", (email,))
            result = cur.fetchone()
            
            if not result:
                return jsonify({"error": "E-mail não encontrado"}), 404
                
            senha_atual = result[0]
            
            # Verificação de senha anterior
            if check_password(new_password, senha_atual):
                return jsonify({"error": "A nova senha não pode ser igual à anterior"}), 400

            # Validações de força da senha
            erros = []
            if len(new_password) < 8:
                erros.append("Mínimo 8 caracteres")
            if not re.search(r"[A-Z]", new_password):
                erros.append("Ao menos 1 letra maiúscula")
            if not re.search(r"[a-z]", new_password):
                erros.append("Ao menos 1 letra minúscula")
            if not re.search(r"[0-9]", new_password):
                erros.append("Ao menos 1 número")
            if not re.search(r'[!@#$%^&*(),.?":{}|<>]', new_password):
                erros.append("Ao menos 1 caractere especial")

            if erros:
                return jsonify({"error": ". ".join(erros)}), 400

            # Atualiza a senha
            hashed_password = hash_password(new_password)
            cur.execute("""
                UPDATE usuarios
                SET senha = %s
                WHERE email = %s
            """, (hashed_password, email))
            conn.commit()

        return jsonify({"message": "Senha redefinida com sucesso!"}), 200

    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        print(f"[reset-password] Erro: {str(e)}")
        return jsonify({"error": "Erro interno no servidor"}), 500

    finally:
        if 'conn' in locals():
            conn.close()


# ======================================
# INICIALIZAÇÃO
# ======================================

if __name__ == '__main__':
    app.run(
        host=os.getenv("FLASK_HOST", "0.0.0.0"),
        port=int(os.getenv("FLASK_PORT", 5000)),
        debug=os.getenv("FLASK_DEBUG", "False") == "True"
    )