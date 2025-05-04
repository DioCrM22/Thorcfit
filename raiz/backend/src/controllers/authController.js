import * as authService from '../services/authService.js';
import jwt from 'jsonwebtoken';

// Helper para gerar token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export const signup = async (req, res, next) => {
  try {
    const { nome, email, senha_hash, data_nascimento, genero } = req.body;
    
    const user = await authService.signup({
      nome,
      email,
      senha_hash,
      data_nascimento,
      genero,
      metodo_login: 'email' // Padrão para cadastro manual
    });

    const token = generateToken(user.id_usuario);
    
    res.status(201).json({ 
      message: 'Cadastrado com sucesso!',
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        data_nascimento: user.data_nascimento,
        genero: user.genero,
        foto_perfil: user.foto_perfil
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, senha_hash } = req.body;
    const user = await authService.login(email, senha_hash);

    const token = generateToken(user.id_usuario);

    res.json({
      message: 'Login bem-sucedido',
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        data_nascimento: user.data_nascimento,
        genero: user.genero,
        foto_perfil: user.foto_perfil,
        altura: user.altura,
        peso: user.peso,
        telefone: user.telefone
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { token: googleToken } = req.body;
    const user = await authService.googleLogin(googleToken);

    const token = generateToken(user.id_usuario);

    res.json({
      message: 'Login com Google bem-sucedido',
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        foto_perfil: user.foto_perfil,
        metodo_login: user.metodo_login
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id_usuario);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { id_usuario } = req.user;
    const updatedData = req.body;

    const user = await authService.updateProfile(id_usuario, updatedData);
    res.json({ 
      message: 'Perfil atualizado!',
      user: {
        nome: user.nome,
        email: user.email,
        data_nascimento: user.data_nascimento,
        genero: user.genero,
        altura: user.altura,
        peso: user.peso,
        telefone: user.telefone,
        foto_perfil: user.foto_perfil
      }
    });
  } catch (err) {
    next(err);
  }
};