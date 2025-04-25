const { Profissional, Usuario } = require('../models');

module.exports = {
  async vincularUsuario(req, res) {
    try {
      const { idUsuario, idProfissional, tipo } = req.body;
      
      // Validação de tipo
      if (!['personal_trainer', 'nutricionista'].includes(tipo)) {
        return res.status(400).json({ error: 'Tipo de profissional inválido' });
      }

      // Verifica se já existe vínculo ativo
      const vinculoExistente = await UsuarioProfissional.findOne({
        where: {
          id_usuario: idUsuario,
          tipo_vinculo: tipo,
          status: 'ativo'
        }
      });

      if (vinculoExistente) {
        return res.status(400).json({ error: 'Já existe um profissional deste tipo vinculado' });
      }

      const vinculo = await UsuarioProfissional.create({
        id_usuario: idUsuario,
        id_profissional: idProfissional,
        tipo_vinculo: tipo,
        status: 'ativo'
      });

      res.status(201).json(vinculo);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao vincular profissional' });
    }
  },

  async listarClientes(req, res) {
    try {
      const clientes = await Usuario.findAll({
        include: [{
          model: Profissional,
          where: { id_profissional: req.user.profissionalId },
          through: { where: { status: 'ativo' } }
        }]
      });
      
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  }
};