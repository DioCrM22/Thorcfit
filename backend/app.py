import os
import uuid
import bcrypt
import jwt
import secrets
import string
import smtplib
from datetime import datetime, timedelta
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
import psycopg2
import traceback

# Carregar variáveis de ambiente
load_dotenv()

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

# Configuração do Banco de Dados
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "db_thorcfit"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASS"),
    "port": int(os.getenv("DB_PORT", 5432))
}

# Configurações JWT
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", 3600))  # 1 hora

# Configurações de E-mail
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
    """Gera token JWT para autenticação"""
    return jwt.encode({
        'sub': user_id,
        'exp': datetime.utcnow() + timedelta(seconds=JWT_EXPIRATION)
    }, JWT_SECRET, algorithm="HS256")

def send_email(destinatario, assunto, corpo):
    """Envia e-mail usando SMTP"""
    msg = MIMEMultipart()
    msg["From"] = EMAIL_CONFIG["sender"]
    msg["To"] = destinatario
    msg["Subject"] = assunto
    msg.attach(MIMEText(corpo, "plain"))

    try:
        with smtplib.SMTP(EMAIL_CONFIG["server"], EMAIL_CONFIG["port"]) as server:
            server.starttls()
            server.login(EMAIL_CONFIG["sender"], EMAIL_CONFIG["password"])
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")
        return False

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", os.getenv("FRONTEND_URL", "http://localhost:3000"))
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Max-Age", "86400")
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
            "reset_password": "/api/reset-password (POST)"
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

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
            if cur.fetchone():
                return jsonify({"error": "E-mail já cadastrado"}), 409

            token_confirmacao = str(uuid.uuid4())
            cur.execute("""
                INSERT INTO usuarios 
                (nome, email, senha, confirmacao_token, email_confirmado)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, nome, email
            """, (nome, email, hash_password(senha), token_confirmacao, False))

            usuario = cur.fetchone()
            conn.commit()

            link_confirmacao = f"{FRONTEND_URL}/confirmar-email/{token_confirmacao}"
            corpo_email = f"""Olá {nome},\n\nClique para confirmar seu e-mail:\n{link_confirmacao}"""
            
            if not send_email(email, "Confirme seu e-mail", corpo_email):
                return jsonify({"error": "Erro ao enviar e-mail de confirmação"}), 500

            return jsonify({
                "message": "Cadastro realizado! Verifique seu e-mail.",
                "usuario": {
                    "id": usuario[0],
                    "nome": usuario[1],
                    "email": usuario[2]
                }
            }), 201

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

            if not email_confirmado:
                return jsonify({"error": "Confirme seu e-mail antes de fazer login"}), 403

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

@app.route('/api/confirmar-email/<uuid:token>', methods=['GET'])
def confirmar_email(token):
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE usuarios 
                SET email_confirmado = TRUE,
                    confirmacao_token = NULL
                WHERE confirmacao_token = %s 
                RETURNING id, email
            """, (str(token),))
            
            resultado = cur.fetchone()
            if not resultado:
                return jsonify({"error": "Token inválido ou expirado"}), 400
            
            conn.commit()
            return jsonify({
                "message": "E-mail confirmado com sucesso!",
                "usuario": {
                    "id": resultado[0],
                    "email": resultado[1]
                }
            }), 200
            
    except Exception as e:
        conn.rollback()
        print(f"Erro na confirmação de e-mail: {str(e)}")
        return jsonify({"error": "Erro ao confirmar e-mail"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/forgot-password', methods=['POST', 'OPTIONS'])
def forgot_password():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type deve ser application/json"}), 415

        email = request.json.get('email', '').lower().strip()
        if not email:
            return jsonify({"error": "E-mail é obrigatório"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            reset_token = str(uuid.uuid4())
            reset_token_expira = datetime.utcnow() + timedelta(hours=1)

            cur.execute("""
                UPDATE usuarios
                SET reset_token = %s,
                    reset_token_expira = %s
                WHERE email = %s
                RETURNING id, nome
            """, (reset_token, reset_token_expira, email))
            
            usuario = cur.fetchone()
            conn.commit()

            if usuario:  # Só envia e-mail se usuário existir
                link_reset = f"{FRONTEND_URL}/resetar-senha?token={reset_token}"
                corpo_email = f"""Clique para redefinir sua senha (válido por 1 hora):\n{link_reset}"""
                
                if not send_email(email, "Redefinição de Senha", corpo_email):
                    return jsonify({"error": "Erro ao enviar e-mail"}), 500

            return jsonify({"message": "Se o e-mail existir, um link de recuperação será enviado"}), 200

    except Exception as e:
        conn.rollback()
        print(f"Erro na recuperação de senha: {str(e)}")
        return jsonify({"error": "Erro interno no servidor"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/reset-password', methods=['POST', 'OPTIONS'])
def reset_password():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type deve ser application/json"}), 415

        data = request.get_json()
        required_fields = ["token", "nova_senha", "confirmacao_senha"]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Campos obrigatórios faltando"}), 400

        if data['nova_senha'] != data['confirmacao_senha']:
            return jsonify({"error": "As senhas não coincidem"}), 400

        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id 
                FROM usuarios 
                WHERE reset_token = %s
                AND reset_token_expira > NOW()
            """, (data['token'],))
            
            usuario = cur.fetchone()
            if not usuario:
                return jsonify({"error": "Token inválido ou expirado"}), 400

            nova_senha_hash = hash_password(data['nova_senha'])
            cur.execute("""
                UPDATE usuarios
                SET senha = %s,
                    reset_token = NULL,
                    reset_token_expira = NULL
                WHERE id = %s
            """, (nova_senha_hash, usuario[0]))
            
            conn.commit()
            return jsonify({"message": "Senha redefinida com sucesso!"}), 200

    except Exception as e:
        conn.rollback()
        print(f"Erro na redefinição de senha: {str(e)}")
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