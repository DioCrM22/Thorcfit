<<<<<<< HEAD
const mysql = require('mysql2/promise');
require('dotenv').config();


module.exports = {
  database: process.env.DB_NAME || 'thorcfit',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  define: {
    timestamps: false,
    underscored: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
=======
// src/config/database.js
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'thorc_fit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const db = mysql.createPool(config);

async function initializeDatabase() {
  let conn;
  try {
    conn = await db.getConnection();
    await conn.ping();
    console.log('✅ Conectado ao MySQL com sucesso');
    
    const [tables] = await conn.query(
      "SHOW TABLES LIKE 'usuario'"
    );
    
    if (tables.length === 0) {
      console.error('❌ Tabela de usuários não encontrada');
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Erro na conexão com o MySQL:', {
      message: err.message,
      code: err.code,
      errno: err.errno
    });
    process.exit(1);
  } finally {
    if (conn) conn.release();
  }
}

initializeDatabase();

export { db };
>>>>>>> diogo
