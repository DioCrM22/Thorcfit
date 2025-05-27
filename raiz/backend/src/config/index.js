import dotenv from 'dotenv';
dotenv.config();

// Adicione verificação de variáveis essenciais
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Variável de ambiente obrigatória faltando: ${envVar}`);
    process.exit(1);
  }
}

export const PORT = process.env.PORT || 5000;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '', // Permite senha vazia para desenvolvimento
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Valor padrão para MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || '1h',
  algorithm: 'HS256'
};

export const EMAIL_CONFIG = process.env.SMTP_SERVER ? {
  host: process.env.SMTP_SERVER,
  port: +(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
} : null;

// Exporta configuração completa para testes
export default {
  PORT,
  FRONTEND_URL,
  DB_CONFIG,
  JWT_CONFIG,
  EMAIL_CONFIG
};