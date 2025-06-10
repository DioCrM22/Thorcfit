const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./Usuario');

const Nutricionista = sequelize.define('Nutricionista', {
  id_nutricionista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  registro_nutricionista: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  especialidades: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco_consulta: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  }
}, {
  tableName: 'nutricionista',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const PersonalTrainer = sequelize.define('PersonalTrainer', {
  id_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  registro_personal: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  especialidades: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco_sessao: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  }
}, {
  tableName: 'personal_trainer',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Definir associações
Usuario.hasOne(Nutricionista, { foreignKey: 'id_usuario', as: 'nutricionista' });
Nutricionista.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasOne(PersonalTrainer, { foreignKey: 'id_usuario', as: 'personalTrainer' });
PersonalTrainer.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

module.exports = {
  Nutricionista,
  PersonalTrainer
};

