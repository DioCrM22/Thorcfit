const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../utils/middleware.util');

// Rotas protegidas por autenticação
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/update', authMiddleware, userController.updateUser);
router.delete('/delete', authMiddleware, userController.deleteUser);

// Rota pública para buscar usuário (exemplo)
router.get('/:id', userController.getUserById);

module.exports = router;