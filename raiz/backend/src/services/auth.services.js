const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const emailService = require('./email.service');

module.exports = {
  async register({ nome, email, senha }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('E-mail já cadastrado');

    const user = await User.create({
      nome,
      email,
      senha_hash: senha,
      confirmacao_token: uuidv4()
    });

    await emailService.sendConfirmationEmail(user);
    return user;
  },

  async login(email, senha) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
      throw new Error('Credenciais inválidas');
    }
    
    if (!user.email_confirmado) throw new Error('Confirme seu e-mail');
    
    return {
      token: jwt.sign({ sub: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      user
    };
  }
};