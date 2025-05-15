const jwt = require('jsonwebtoken');
const db = require('../models');
const Profissional = db.Profissional;
const VinculoProfissional = db.VinculoProfissional;

module.exports = {
  // Middleware base de autenticação
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar informações atualizadas do usuário
      const user = await db.Usuario.findByPk(decoded.id, {
        include: [{
          model: db.Profissional,
          as: 'profissional'
        }]
      });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.profissional ? user.profissional.tipo : 'usuario',
        profissionalId: user.profissional?.id_profissional
      };

      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  },

  // Middleware para profissionais específicos
  authorizeProfessional: (requiredType) => {
    return async (req, res, next) => {
      if (req.user.role !== requiredType) {
        return res.status(403).json({ 
          error: `Acesso restrito a ${requiredType}s` 
        });
      }
      next();
    };
  },

  // Verifica se o profissional está vinculado ao usuário alvo
  checkVinculo: async (req, res, next) => {
    try {
      const targetUserId = req.params.userId || req.body.userId;
      
      const vinculo = await VinculoProfissional.findOne({
        where: {
          id_usuario: targetUserId,
          id_profissional: req.user.profissionalId,
          status: 'ativo'
        }
      });

      if (!vinculo) {
        return res.status(403).json({ 
          error: 'Profissional não vinculado a este usuário' 
        });
      }

      next();
    } catch (error) {
      console.error('Erro na verificação de vínculo:', error);
      res.status(500).json({ error: 'Erro na autorização' });
    }
  },

  // Middleware combinado para ações de profissional vinculado
  professionalAccess: (requiredType) => [
    this.authenticate,
    this.authorizeProfessional(requiredType),
    this.checkVinculo
  ]
};