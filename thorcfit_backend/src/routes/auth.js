const express = require('express');
const AuthController = require("../controllers/AuthController");

const router = express.Router();

// Rota de registro
router.post('/signup', 
  AuthController.validateSignup,
  AuthController.signup
);

// Rota de login
router.post('/login', 
  AuthController.validateLogin,
  AuthController.login
);

// Rota de recuperação de senha
router.post('/forgot-password',
  AuthController.validateForgotPassword,
  AuthController.forgotPassword
);

// Rota de redefinição de senha
router.post('/reset-password',
  AuthController.validateResetPassword,
  AuthController.resetPassword
);

// Rota para obter perfil do usuário logado (requer autenticação)
router.get('/usuario-perfil',
  require('../middleware/auth'),
  AuthController.getProfile
);

// Rota para verificar token
router.get('/verify-token',
  require('../middleware/auth'),
  AuthController.verifyToken
);

module.exports = router;