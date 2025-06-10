const express = require('express');
const MetricasController = require('../controllers/MetricasController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Obter histórico de métricas
router.get('/historico',
  MetricasController.getHistorico
);

// Registrar nova métrica
router.post('/metrica',
  MetricasController.validateMetrica,
  MetricasController.addMetrica
);

// Atualizar métrica existente
router.put('/metrica/:id',
  MetricasController.updateMetrica
);

// Excluir métrica
router.delete('/metrica/:id',
  MetricasController.deleteMetrica
);

// Salvar metas do usuário
router.post('/metas',
  MetricasController.saveMetas
);

// Obter dados para gráficos
router.get('/dados-grafico',
  MetricasController.getDadosGrafico
);

module.exports = router;

