import os
import uuid
import bcrypt
import jwt
import secrets
import string
import smtplib
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
import psycopg2
import traceback
import random
import re

load_dotenv(encoding='utf-8')

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
    }, JWT_SECRET, algorithm="HS256")

def send_email(destinatario, assunto, corpo_html):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_CONFIG["sender"]
    msg["To"] = destinatario
    msg["Subject"] = assunto
    msg.attach(MIMEText(corpo_html, "html"))  # Alterado para HTML

    try:
        with smtplib.SMTP(EMAIL_CONFIG["server"], EMAIL_CONFIG["port"]) as server:
            server.set_debuglevel(1)  # Ativa logs detalhados
            server.starttls()
            server.login(EMAIL_CONFIG["sender"], EMAIL_CONFIG["password"])
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Erro SMTP: {e}")  # Logará mensagens de erro completas
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
            # Gera código numérico de 6 dígitos
            reset_code = ''.join(random.choice('0123456789') for _ in range(6))
            # Expira em 1 hora, sempre em UTC
            reset_code_expira = datetime.now(timezone.utc) + timedelta(hours=1)

            # Atualiza o código no usuário
            cur.execute("""
                UPDATE usuarios
                SET reset_code = %s,
                    reset_code_expira = %s
                WHERE email = %s
                RETURNING id, nome
            """, (reset_code, reset_code_expira, email))
            usuario = cur.fetchone()
            conn.commit()

            if usuario:
                # Envia o e‑mail HTML com o código
                corpo_html = f"""
                <html>
                  <body>
                    <h3>Redefinição de Senha</h3>
                    <p>Seu código de verificação é: <strong>{reset_code}</strong></p>
                    <p>Ele é válido por 1 hora.</p>
                  </body>
                </html>
                """
                if not send_email(email, "ThorcFit — Código de Redefinição", corpo_html):
                    return jsonify({"error": "Erro ao enviar e-mail"}), 500

        # Por segurança, sempre devolve a mesma mensagem
        return jsonify({"message": "Se o e‑mail existir, um código foi enviado"}), 200

    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        print(f"[forgot-password] {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/reset-password', methods=['POST', 'OPTIONS'])
def reset_password():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    data = request.get_json() or {}
    email       = data.get('email', '').lower().strip()
    code        = data.get('code', '').strip()
    new_passwd  = data.get('newPassword', '')

    # Verifica campos obrigatórios
    if not email or not code or not new_passwd:
        return jsonify({"error": "Campos email, code e newPassword são obrigatórios"}), 400

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Busca o usuário que tenha o mesmo code válido e não expirado
            cur.execute("""
                SELECT id, reset_code_expira
                  FROM usuarios
                 WHERE email = %s
                   AND reset_code = %s
            """, (email, code))
            row = cur.fetchone()

            if not row:
                return jsonify({"error": "Código inválido"}), 400

            user_id, expira = row
            # Verifica expiração (em UTC)
            if expira < datetime.now(timezone.utc):
                return jsonify({"error": "Código expirado"}), 400

            # Tudo ok, atualiza a senha e limpa o código
            nova_hash = hash_password(new_passwd)
            cur.execute("""
                UPDATE usuarios
                   SET senha             = %s,
                       reset_code        = NULL,
                       reset_code_expira = NULL
                 WHERE id = %s
            """, (nova_hash, user_id))
            conn.commit()

        return jsonify({"message": "Senha redefinida com sucesso!"}), 200

    except Exception as e:
        conn.rollback()
        print(f"[reset-password] {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

    finally:
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