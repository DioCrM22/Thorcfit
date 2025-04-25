const pool = require('../config/database');
const security = require('../utils/security.util');
const emailService = require('../services/email.service');

module.exports = {
  register: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
      }

      // Verificar se usuário existe
      const userExists = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1', 
        [email]
      );
      
      if (userExists.rows.length > 0) {
        return res.status(409).json({ error: 'E-mail já cadastrado' });
      }

      // Hash da senha
      const hashedPassword = await security.hashPassword(senha);
      const confirmationToken = security.generateToken();

      // Inserir no banco
      const newUser = await pool.query(
        `INSERT INTO usuarios 
        (nome, email, senha, confirmacao_token) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, nome, email, confirmacao_token`,
        [nome, email, hashedPassword, confirmationToken]
      );

      // Enviar e-mail de confirmação
      await emailService.sendConfirmationEmail(newUser.rows[0]);

      res.status(201).json({
        message: 'Cadastro realizado! Verifique seu e-mail.',
        usuario: newUser.rows[0]
      });

    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Buscar usuário
      const user = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verificar senha
      const isValid = await security.comparePassword(
        senha,
        user.rows[0].senha
      );

      if (!isValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = security.generateJWT(user.rows[0].id);

      res.json({
        token,
        user: {
          id: user.rows[0].id,
          nome: user.rows[0].nome,
          email: user.rows[0].email
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro no servidor' });
    }
  }
};