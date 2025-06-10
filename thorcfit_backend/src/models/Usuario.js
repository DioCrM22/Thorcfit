const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  genero: {
    type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  id_objetivo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  metodo_login: {
    type: DataTypes.ENUM('email', 'google', 'facebook'),
    allowNull: false,
    defaultValue: 'email'
  },
  foto_perfil: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'usuario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Métodos de instância
Usuario.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.senha_hash;
  return values;
};

module.exports = Usuario;