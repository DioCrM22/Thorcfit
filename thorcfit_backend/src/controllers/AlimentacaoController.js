const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { DiarioAlimentar, Refeicao, Alimento, AlimentoRefeicao } = require('../models');

class AlimentacaoController {
  // Validações para nova refeição
  static validateRefeicao = [
    body('tipo_refeicao')
      .isIn(['café_da_manhã', 'lanche_manhã', 'almoço', 'lanche_tarde', 'jantar'])
      .withMessage('Tipo de refeição inválido'),
    body('horario')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Horário inválido (formato HH:MM)'),
    body('alimentos')
      .isArray({ min: 1 })
      .withMessage('Pelo menos um alimento deve ser adicionado'),
    body('alimentos.*.nome')
      .trim()
      .notEmpty()
      .withMessage('Nome do alimento é obrigatório'),
    body('alimentos.*.quantidade')
      .isFloat({ min: 0.1 })
      .withMessage('Quantidade deve ser maior que 0')
  ];

  // Obter diário alimentar do dia (sem criar automaticamente)
static async getDiario(req, res) {
  try {
    const userId = req.userId;
    const data = req.params.data || req.query.data;

    if (!data) {
      return res.status(400).json({ error: 'Data é obrigatória' });
    }

    // Buscar diário (sem criar)
    const diario = await DiarioAlimentar.findOne({
      where: { id_usuario: userId, data }
    });

    // Buscar alimentos disponíveis para autocomplete (até 100)
    const alimentosDisponiveis = await Alimento.findAll({
      attributes: ['id_alimento', 'nome', 'calorias', 'porcao_padrao'],
      order: [['nome', 'ASC']],
      limit: 100
    });

    const metaCalorias = 2000;
    const metaAgua = 2000;

    // Se não houver diário ainda
    if (!diario) {
      return res.json({
        diario: null,
        meta_calorias: metaCalorias,
        meta_agua: metaAgua,
        alimentos_disponiveis: alimentosDisponiveis
      });
    }

    // Buscar refeições com alimentos
    const refeicoes = await Refeicao.findAll({
      where: { id_registro: diario.id_registro },
      include: [{
        model: Alimento,
        as: 'alimentos',
        through: { attributes: ['quantidade', 'porcao'] }
      }],
      order: [['horario', 'ASC']]
    });

    return res.json({
      diario: {
        ...diario.toJSON(),
        refeicoes: refeicoes.map(refeicao => ({
          ...refeicao.toJSON(),
          alimentos: refeicao.alimentos.map(alimento => ({
            ...alimento.toJSON(),
            quantidade: alimento.AlimentoRefeicao.quantidade,
            porcao: alimento.AlimentoRefeicao.porcao,
            calorias_calculadas: (alimento.calorias * alimento.AlimentoRefeicao.quantidade) / 100,
            proteinas_calculadas: (alimento.proteinas * alimento.AlimentoRefeicao.quantidade) / 100,
            carboidratos_calculados: (alimento.carboidratos * alimento.AlimentoRefeicao.quantidade) / 100,
            gorduras_calculadas: (alimento.gorduras * alimento.AlimentoRefeicao.quantidade) / 100
          }))
        }))
      },
      meta_calorias: metaCalorias,
      meta_agua: metaAgua,
      alimentos_disponiveis: alimentosDisponiveis
    });

  } catch (error) {
    console.error('Erro no getDiario:', error);
    return res.status(500).json({ error: 'Erro ao buscar diário alimentar' });
  }
}

  // Atualizar diário (água, macros, observações)
  static async updateDiario(req, res) {
    try {
      const { id_registro } = req.params;
      const {
        agua_ml,
        total_calorias,
        total_proteinas,
        total_carboidratos,
        total_gorduras,
        observacoes
      } = req.body;

      const diario = await DiarioAlimentar.findOne({
        where: {
          id_registro,
          id_usuario: req.userId
        }
      });

      if (!diario) {
        return res.status(404).json({ error: 'Diário alimentar não encontrado' });
      }

      const dadosParaAtualizar = {};
      if (agua_ml !== undefined) dadosParaAtualizar.agua_ml = agua_ml;
      if (total_calorias !== undefined) dadosParaAtualizar.total_calorias = total_calorias;
      if (total_proteinas !== undefined) dadosParaAtualizar.total_proteinas = total_proteinas;
      if (total_carboidratos !== undefined) dadosParaAtualizar.total_carboidratos = total_carboidratos;
      if (total_gorduras !== undefined) dadosParaAtualizar.total_gorduras = total_gorduras;
      if (observacoes !== undefined) dadosParaAtualizar.observacoes = observacoes;

      await diario.update(dadosParaAtualizar);

      res.json({ success: true, message: 'Diário atualizado com sucesso', diario });
    } catch (error) {
      console.error('Erro ao atualizar diário alimentar:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = AlimentacaoController;