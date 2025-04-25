module.exports = (sequelize, DataTypes) => {
  const PlanoTreino = sequelize.define('PlanoTreino', {
    nome: DataTypes.STRING,
    tipo_criador: DataTypes.ENUM('usuario', 'profissional'),
    id_criador: DataTypes.INTEGER
  }, {
    tableName: 'plano_treino',
    hooks: {
      beforeCreate: async (plano) => {
        const count = await PlanoTreino.count({
          where: { 
            id_criador: plano.id_criador,
            tipo_criador: plano.tipo_criador
          }
        });
        
        const limite = plano.tipo_criador === 'usuario' ? 3 : 5;
        if (count >= limite) {
          throw new Error(`Limite de ${limite} planos atingido`);
        }
      }
    }
  });

  PlanoTreino.associate = (models) => {
    PlanoTreino.hasMany(models.Treino, {
      foreignKey: 'id_plano',
      as: 'treinos'
    });
  };

  return PlanoTreino;
};