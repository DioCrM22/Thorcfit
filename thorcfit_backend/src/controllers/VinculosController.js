const { body, validationResult } = require('express-validator');
const { VinculoNutricional, VinculoTreino, Usuario, Nutricionista, PersonalTrainer } = require('../models');

class VinculosController {
  // Validações para novo vínculo nutricional
  static validateVinculoNutricional = [
    body('id_nutricionista')
      .isInt()
      .withMessage('ID do nutricionista deve ser um número inteiro'),
    body('observacoes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Observações devem ter no máximo 500 caracteres')
  ];

  // Validações para novo vínculo de treino
  static validateVinculoTreino = [
    body('id_personal')
      .isInt()
      .withMessage('ID do personal trainer deve ser um número inteiro'),
    body('observacoes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Observações devem ter no máximo 500 caracteres')
  ];

  // Obter vínculos nutricionais do usuário
  static async getVinculosNutricionais(req, res) {
    try {
      const { status } = req.query;
      
      const whereClause = { id_usuario: req.userId };
      if (status) {
        whereClause.status = status;
      }

      const vinculos = await VinculoNutricional.findAll({
        where: whereClause,
        include: [
          {
            model: Nutricionista,
            as: 'nutricionista',
            include: [
              {
                model: Usuario,
                as: 'usuario',
                attributes: ['id_usuario', 'nome', 'email', 'telefone', 'foto_perfil']
              }
            ]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        vinculos
      });

    } catch (error) {
      console.error('Erro ao buscar vínculos nutricionais:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Obter vínculos de treino do usuário
  static async getVinculosTreino(req, res) {
    try {
      const { status } = req.query;
      
      const whereClause = { id_usuario: req.userId };
      if (status) {
        whereClause.status = status;
      }

      const vinculos = await VinculoTreino.findAll({
        where: whereClause,
        include: [
          {
            model: PersonalTrainer,
            as: 'personalTrainer',
            include: [
              {
                model: Usuario,
                as: 'usuario',
                attributes: ['id_usuario', 'nome', 'email', 'telefone', 'foto_perfil']
              }
            ]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        vinculos
      });

    } catch (error) {
      console.error('Erro ao buscar vínculos de treino:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Criar novo vínculo nutricional
  static async createVinculoNutricional(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { id_nutricionista, observacoes } = req.body;

      // Verificar se já existe vínculo ativo com este nutricionista
      const vinculoExistente = await VinculoNutricional.findOne({
        where: {
          id_usuario: req.userId,
          id_nutricionista,
          status: ['ativo', 'pendente']
        }
      });

      if (vinculoExistente) {
        return res.status(409).json({
          error: 'Já existe um vínculo ativo ou pendente com este nutricionista'
        });
      }

      // Verificar se o usuário já tem um vínculo nutricional ativo
      const vinculoAtivoExistente = await VinculoNutricional.findOne({
        where: {
          id_usuario: req.userId,
          status: 'ativo'
        }
      });

      if (vinculoAtivoExistente) {
        return res.status(409).json({
          error: 'Você já possui um vínculo nutricional ativo. Cancele o vínculo atual antes de solicitar um novo.'
        });
      }

      // Verificar se o nutricionista existe
      const nutricionista = await Nutricionista.findByPk(id_nutricionista);
      if (!nutricionista) {
        return res.status(404).json({
          error: 'Nutricionista não encontrado'
        });
      }

      // Criar novo vínculo
      const novoVinculo = await VinculoNutricional.create({
        id_usuario: req.userId,
        id_nutricionista,
        data_inicio: new Date(),
        status: 'pendente',
        observacoes: observacoes || null
      });

      res.status(201).json({
        success: true,
        message: 'Solicitação de vínculo nutricional enviada com sucesso',
        vinculo: novoVinculo
      });

    } catch (error) {
      console.error('Erro ao criar vínculo nutricional:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Criar novo vínculo de treino
  static async createVinculoTreino(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const { id_personal, observacoes } = req.body;

      // Verificar se já existe vínculo ativo com este personal trainer
      const vinculoExistente = await VinculoTreino.findOne({
        where: {
          id_usuario: req.userId,
          id_personal,
          status: ['ativo', 'pendente']
        }
      });

      if (vinculoExistente) {
        return res.status(409).json({
          error: 'Já existe um vínculo ativo ou pendente com este personal trainer'
        });
      }

      // Verificar se o usuário já tem um vínculo de treino ativo
      const vinculoAtivoExistente = await VinculoTreino.findOne({
        where: {
          id_usuario: req.userId,
          status: 'ativo'
        }
      });

      if (vinculoAtivoExistente) {
        return res.status(409).json({
          error: 'Você já possui um vínculo de treino ativo. Cancele o vínculo atual antes de solicitar um novo.'
        });
      }

      // Verificar se o personal trainer existe
      const personalTrainer = await PersonalTrainer.findByPk(id_personal);
      if (!personalTrainer) {
        return res.status(404).json({
          error: 'Personal trainer não encontrado'
        });
      }

      // Criar novo vínculo
      const novoVinculo = await VinculoTreino.create({
        id_usuario: req.userId,
        id_personal,
        data_inicio: new Date(),
        status: 'pendente',
        observacoes: observacoes || null
      });

      res.status(201).json({
        success: true,
        message: 'Solicitação de vínculo de treino enviada com sucesso',
        vinculo: novoVinculo
      });

    } catch (error) {
      console.error('Erro ao criar vínculo de treino:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Aceitar vínculo nutricional
  static async aceitarVinculoNutricional(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoNutricional.findOne({
        where: {
          id_vinculo: id,
          status: 'pendente'
        },
        include: [
          {
            model: Nutricionista,
            as: 'nutricionista',
            where: { id_usuario: req.userId }
          }
        ]
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado ou você não tem permissão para aceitar'
        });
      }

      await vinculo.update({ status: 'ativo' });

      res.json({
        success: true,
        message: 'Vínculo aceito com sucesso',
        vinculo
      });

    } catch (error) {
      console.error('Erro ao aceitar vínculo nutricional:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Aceitar vínculo de treino
  static async aceitarVinculoTreino(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoTreino.findOne({
        where: {
          id_vinculo: id,
          status: 'pendente'
        },
        include: [
          {
            model: PersonalTrainer,
            as: 'personalTrainer',
            where: { id_usuario: req.userId }
          }
        ]
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado ou você não tem permissão para aceitar'
        });
      }

      await vinculo.update({ status: 'ativo' });

      res.json({
        success: true,
        message: 'Vínculo aceito com sucesso',
        vinculo
      });

    } catch (error) {
      console.error('Erro ao aceitar vínculo de treino:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Rejeitar vínculo nutricional
  static async rejeitarVinculoNutricional(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoNutricional.findOne({
        where: {
          id_vinculo: id,
          status: 'pendente'
        },
        include: [
          {
            model: Nutricionista,
            as: 'nutricionista',
            where: { id_usuario: req.userId }
          }
        ]
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado ou você não tem permissão para rejeitar'
        });
      }

      await vinculo.update({ status: 'cancelado' });

      res.json({
        success: true,
        message: 'Vínculo rejeitado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao rejeitar vínculo nutricional:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Rejeitar vínculo de treino
  static async rejeitarVinculoTreino(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoTreino.findOne({
        where: {
          id_vinculo: id,
          status: 'pendente'
        },
        include: [
          {
            model: PersonalTrainer,
            as: 'personalTrainer',
            where: { id_usuario: req.userId }
          }
        ]
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado ou você não tem permissão para rejeitar'
        });
      }

      await vinculo.update({ status: 'cancelado' });

      res.json({
        success: true,
        message: 'Vínculo rejeitado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao rejeitar vínculo de treino:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Cancelar vínculo nutricional
  static async cancelarVinculoNutricional(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoNutricional.findOne({
        where: {
          id_vinculo: id,
          id_usuario: req.userId,
          status: ['ativo', 'pendente']
        }
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado'
        });
      }

      await vinculo.update({ status: 'cancelado' });

      res.json({
        success: true,
        message: 'Vínculo cancelado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao cancelar vínculo nutricional:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Cancelar vínculo de treino
  static async cancelarVinculoTreino(req, res) {
    try {
      const { id } = req.params;

      const vinculo = await VinculoTreino.findOne({
        where: {
          id_vinculo: id,
          id_usuario: req.userId,
          status: ['ativo', 'pendente']
        }
      });

      if (!vinculo) {
        return res.status(404).json({
          error: 'Vínculo não encontrado'
        });
      }

      await vinculo.update({ status: 'cancelado' });

      res.json({
        success: true,
        message: 'Vínculo cancelado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao cancelar vínculo de treino:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = VinculosController;