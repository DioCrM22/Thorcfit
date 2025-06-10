const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Atualizar perfil do usuário
router.put('/usuario-perfil',
  UserController.validateUpdateProfile,
  UserController.updateProfile
);

// Obter perfil público de outro usuário
router.get('/usuario/:id/perfil',
  UserController.getPublicProfile
);

// Buscar profissionais (nutricionistas e personal trainers)
router.get('/profissionais',
  UserController.searchProfessionals
);

// Obter estatísticas do usuário
router.get('/usuario/estatisticas',
  UserController.getUserStats
);

// Desativar conta
router.delete('/usuario/desativar',
  UserController.deactivateAccount
);

module.exports = router;

