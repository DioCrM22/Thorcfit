module.exports = (sequelize, DataTypes) => {
    const ExercicioTreino = sequelize.define('ExercicioTreino', {
      series: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      repeticoes: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      carga: DataTypes.DECIMAL(5,2),
      descanso: DataTypes.INTEGER
    }, {
      tableName: 'exercicio_treino',
      associate: (models) => {
        ExercicioTreino.belongsTo(models.Treino, {
          foreignKey: 'id_treino'
        });
        ExercicioTreino.belongsTo(models.Exercicio, {
          foreignKey: 'id_exercicio'
        });
      }
    });
    return ExercicioTreino;
  };