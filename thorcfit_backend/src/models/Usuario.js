const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuario = sequelize.define("Usuario", {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("masculino", "feminino", "outro"),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_objetivo: {
      type: DataTypes.ENUM("manutenção", "ganho", "perca"),
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metodo_login: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    tableName: "usuario",
    timestamps: false,
  });

  return Usuario;
};