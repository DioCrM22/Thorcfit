const express = require('express');
const AlimentacaoController = require('../controllers/AlimentacaoController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Obter diário alimentar do dia
router.get('/diario',
  AlimentacaoController.getDiario
);

router.get('/diario/:data', 
  AlimentacaoController.getDiario
);

router.put('/diario/:id_registro', 
  AlimentacaoController.updateDiario
);

// Adicionar nova refeição
router.post('/refeicao',
  AlimentacaoController.validateRefeicao,
  AlimentacaoController.addRefeicao
);

// Excluir refeição
router.delete('/refeicao/:id',
  AlimentacaoController.deleteRefeicao
);

// Adicionar consumo de água
router.post('/agua',
  AlimentacaoController.addAgua
);

// Salvar observações do diário
router.post('/observacoes',
  AlimentacaoController.saveObservacoes
);

// Obter relatório nutricional
router.get('/relatorio',
  AlimentacaoController.getRelatorio
);

module.exports = router;

