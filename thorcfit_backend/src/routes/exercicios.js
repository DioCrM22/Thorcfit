const express = require('express');
const ExerciciosController = require('../controllers/ExerciciosController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Listar exercícios com filtros
router.get('/',
  ExerciciosController.getExercicios
);

// Buscar exercícios por nome (autocomplete)
router.get('/buscar',
  ExerciciosController.searchExercicios
);

// Obter exercício específico
router.get('/:id',
  ExerciciosController.getExercicio
);

// Obter exercícios por grupo muscular
router.get('/grupo/:grupo',
  ExerciciosController.getExerciciosPorGrupo
);

// Obter estatísticas de exercícios
router.get('/admin/estatisticas',
  ExerciciosController.getEstatisticas
);

// Criar novo exercício (para administradores/personal trainers)
router.post('/',
  ExerciciosController.createExercicio
);

// Atualizar exercício
router.put('/:id',
  ExerciciosController.updateExercicio
);

// Excluir exercício
router.delete('/:id',
  ExerciciosController.deleteExercicio
);

module.exports = router;

