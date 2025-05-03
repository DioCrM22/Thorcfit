// src/services/authService.js
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { db } from '../config/database.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(
      'SELECT id_usuario, nome, email, senha_hash as senha, google_id, metodo_login, foto_perfil FROM usuario WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    throw new Error('Erro ao buscar usuário');
  }
};

// Login com Google
export const findOrCreateGoogleUser = async (googleData) => {
  try {
    const { sub, name, email, picture } = googleData;

    const [existingUser] = await db.query(
      'SELECT * FROM usuario WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      if (!existingUser[0].google_id) {
        await db.query(
          'UPDATE usuario SET google_id = ?, metodo_login = "google", foto_perfil = ? WHERE id_usuario = ?',
          [sub, picture, existingUser[0].id_usuario]
        );
      }
      return existingUser[0];
    }

    const [result] = await db.query(
      `INSERT INTO usuario 
       (nome, email, google_id, metodo_login, foto_perfil, data_cadastro) 
       VALUES (?, ?, ?, 'google', ?, NOW())`,
      [name, email, sub, picture]
    );

    const [newUser] = await db.query(
      'SELECT * FROM usuario WHERE id_usuario = ?',
      [result.insertId]
    );

    return newUser[0];

  } catch (error) {
    console.error('Erro ao processar usuário do Google:', {
      message: error.message,
      stack: error.stack,
      googleData
    });
    throw new Error('Erro ao processar usuário do Google');
  }
};

// Login Tradicional
export const login = async (email, senha) => {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.metodo_login && user.metodo_login !== 'email') {
      throw new Error(`Faça login usando ${user.metodo_login}`);
    }

    if (!user.senha) {
      throw new Error('Cadastro inválido - sem senha definida');
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    
    if (!isMatch) {
      throw new Error('Senha incorreta');
    }

    return {
      id_usuario: user.id_usuario,
      nome: user.nome,
      email: user.email,
      metodo_login: user.metodo_login
    };
  } catch (error) {
    console.error('Erro no serviço de login:', {
      email,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Cadastro Tradicional
export const signup = async (nome, email, senha) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado');
    }

    if (!senha || senha.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const [result] = await db.query(
      `INSERT INTO usuario 
       (nome, email, senha_hash, metodo_login, data_cadastro) 
       VALUES (?, ?, ?, 'email', NOW())`,
      [nome, email, hashedPassword]
    );

    const [newUser] = await db.query(
      'SELECT id_usuario, nome, email, metodo_login FROM usuario WHERE id_usuario = ?',
      [result.insertId]
    );

    return newUser[0];
    
  } catch (error) {
    console.error('Erro no serviço de cadastro:', {
      nome,
      email,
      error: error.message,
      stack: error.stack,
      sql: error.sql
    });
    throw error;
  }
};