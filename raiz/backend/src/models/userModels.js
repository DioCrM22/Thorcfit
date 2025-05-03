// src/models/userModels.js
import { db } from '../config/database.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT id_usuario, nome, email, senha_hash FROM usuario WHERE email = ?', 
    [email]
  );
  return rows[0];
};

export const createUser = async (userData) => {
  const { nome, email, senha, metodo_login } = userData;
  const [result] = await db.query(
    `INSERT INTO usuario 
     (nome, email, senha_hash, metodo_login, data_cadastro) 
     VALUES (?, ?, ?, ?, NOW())`,
    [nome, email, senha, metodo_login || 'email']
  );
  
  const [newUser] = await db.query(
    'SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ?',
    [result.insertId]
  );
  
  return newUser[0];
};