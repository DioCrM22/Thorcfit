const express = require('express');
const VinculosController = require('../controllers/VinculosController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Rotas para vínculos nutricionais
router.get('/nutricionais',
  VinculosController.getVinculosNutricionais
);

router.post('/nutricional',
  VinculosController.validateVinculoNutricional,
  VinculosController.createVinculoNutricional
);

router.put('/nutricional/:id/aceitar',
  VinculosController.aceitarVinculoNutricional
);

router.put('/nutricional/:id/rejeitar',
  VinculosController.rejeitarVinculoNutricional
);

router.delete('/nutricional/:id',
  VinculosController.cancelarVinculoNutricional
);

// Rotas para vínculos de treino
router.get('/treino',
  VinculosController.getVinculosTreino
);

router.post('/treino',
  VinculosController.validateVinculoTreino,
  VinculosController.createVinculoTreino
);

router.put('/treino/:id/aceitar',
  VinculosController.aceitarVinculoTreino
);

router.put('/treino/:id/rejeitar',
  VinculosController.rejeitarVinculoTreino
);

router.delete('/treino/:id',
  VinculosController.cancelarVinculoTreino
);

module.exports = router;