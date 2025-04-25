const express = require('express');
const router = express.Router();
const controller = require('../controllers/planoTreino.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Criar plano (usuário ou profissional)
router.post('/', authMiddleware, controller.criarPlano);

// Listar planos do usuário
router.get('/meus-planos', authMiddleware, controller.listarPlanosUsuario);

// Outras rotas...
module.exports = router;