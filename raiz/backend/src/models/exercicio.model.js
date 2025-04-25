module.exports = (sequelize, DataTypes) => {
    const Exercicio = sequelize.define('Exercicio', {
      id_exercicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      descricao: DataTypes.TEXT,
      grupo_muscular: DataTypes.STRING(50),
      equipamento: DataTypes.STRING(100)
    }, {
      tableName: 'exercicio',
      timestamps: false
    });
  
    return Exercicio;
  };