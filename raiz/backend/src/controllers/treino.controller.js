const { PlanoTreino, SessaoTreino, Exercicio } = require('../models');

module.exports = {
  criarPlano: async (req, res) => {
    try {
      const { id_usuario, exercicios, ...dadosPlano } = req.body;
      
      const plano = await PlanoTreino.create({
        ...dadosPlano,
        id_profissional: req.user.id // Assume que o usuário é um personal
      });

      // Associar exercícios ao plano
      await Promise.all(exercicios.map(ex => 
        ExercicioTreino.create({
          id_plano: plano.id_plano,
          ...ex
        })
      ));

      res.status(201).json(plano);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar plano' });
    }
  },

  registrarSessao: async (req, res) => {
    try {
      const sessao = await SessaoTreino.create({
        ...req.body,
        id_usuario: req.user.id
      });

      res.status(201).json(sessao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar sessão' });
    }
  }
};