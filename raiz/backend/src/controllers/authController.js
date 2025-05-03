import * as authService from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message:'Cadastrado com sucesso!', user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ message:'Login bem-sucedido', user, token });
  } catch (err) {
    next(err);
  }
};
