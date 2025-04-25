const { Profissional, Usuario } = require('../models');

module.exports = {
  vincularProfissional: async (req, res, next) => {
    try {
      const { idUsuario, idProfissional, tipo } = req.body;
      
      // Verifica existência das entidades
      const usuario = await Usuario.findByPk(idUsuario);
      const profissional = await Profissional.findByPk(idProfissional);

      if (!usuario || !profissional) {
        return res.status(404).json({ error: 'Usuário ou profissional não encontrado' });
      }

      // Valida tipo do profissional
      if (profissional.tipo !== tipo) {
        return res.status(400).json({ error: 'Tipo do profissional não corresponde' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Erro na validação' });
    }
  },

  validateTreino: (req, res, next) => {
    const requiredFields = ['id_usuario', 'exercicios', 'data'];
    const missing = requiredFields.filter(field => !req.body[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({ 
        error: `Campos obrigatórios faltando: ${missing.join(', ')}` 
      });
    }
    
    next();
  }
};