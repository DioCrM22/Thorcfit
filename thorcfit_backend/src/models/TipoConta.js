const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TipoConta = sequelize.define("TipoConta", {
    id_tipo_conta: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [['usuario', 'nutricionista', 'personal']] // Validação explícita
      }
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: "tipo_conta",
    timestamps: false // Remove created_at/updated_at
  });

  TipoConta.associate = (models) => {
    TipoConta.hasMany(models.Usuario, {
      foreignKey: "id_tipo_conta",
      as: "usuario"
    });
  };

  return TipoConta;
};