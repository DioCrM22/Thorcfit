const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Nutricionista = sequelize.define("Nutricionista", {
    id_nutricionista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    crn: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    especialidade: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco_consulta: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
  }, {
    tableName: "nutricionista",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  const PersonalTrainer = sequelize.define("PersonalTrainer", {
    id_personal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cref: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    especialidade: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco_sessao: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
  }, {
    tableName: "personal_trainer",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return {
    Nutricionista,
    PersonalTrainer
  };
};
