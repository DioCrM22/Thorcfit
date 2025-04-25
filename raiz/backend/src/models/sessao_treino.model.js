module.exports = (sequelize, DataTypes) => {
  const SessaoTreino = sequelize.define('SessaoTreino', {
    duracao: DataTypes.INTEGER
  }, {
    tableName: 'sessao_treino',
    hooks: {
      afterCreate: async (sessao) => {
        // Manter apenas 7 sessões recentes por usuário
        const sessions = await SessaoTreino.findAll({
          where: { id_usuario: sessao.id_usuario },
          order: [['data', 'DESC']],
          offset: 7
        });

        if (sessions.length > 0) {
          await SessaoTreino.destroy({
            where: { id_sessao: sessions.map(s => s.id_sessao) }
          });
        }
      }
    }
  });

  return SessaoTreino;
};