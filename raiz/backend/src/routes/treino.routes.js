const express = require('express');
const router = express.Router();
const controller = require('../controllers/treino.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apenas personais podem criar/editar planos
router.post('/plano', authMiddleware, controller.criarPlano);
router.put('/plano/:id', authMiddleware, controller.atualizarPlano);

// Usuários podem registrar sessões
router.post('/sessao', authMiddleware, controller.registrarSessao);

module.exports = router;