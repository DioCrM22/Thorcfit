module.exports = (sequelize, DataTypes) => {
  const Treino = sequelize.define('Treino', {
    nome: DataTypes.STRING,
    ordem: DataTypes.INTEGER
  }, {
    tableName: 'treino',
    hooks: {
      beforeCreate: async (treino) => {
        const count = await Treino.count({
          where: { id_plano: treino.id_plano }
        });
        
        if (count >= 5) {
          throw new Error('Máximo 5 treinos por plano');
        }
      }
    }
  });

  Treino.associate = (models) => {
    Treino.hasMany(models.ExercicioTreino, {
      foreignKey: 'id_treino',
      as: 'exercicios'
    });
    
    Treino.hasMany(models.SessaoTreino, {
      foreignKey: 'id_treino',
      as: 'sessoes'
    });
  };

  return Treino;
};