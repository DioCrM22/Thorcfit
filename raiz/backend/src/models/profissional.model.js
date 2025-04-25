module.exports = (sequelize, DataTypes) => {
  const Profissional = sequelize.define('Profissional', {
    id_profissional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('nutricionista', 'personal_trainer'),
      allowNull: false
    },
    registro: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'crn_cref' // Nome real da coluna no banco
    },
    especialidade: DataTypes.STRING(100)
  }, {
    tableName: 'profissional',
    timestamps: false
  });

  Profissional.associate = (models) => {
    Profissional.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario'
    });
  };

  return Profissional;
};