const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Nome é obrigatório'
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'Este e-mail já está cadastrado'
    },
    validate: {
      isEmail: {
        msg: 'Formato de e-mail inválido'
      }
    }
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'Senha deve ter entre 6 e 255 caracteres'
      }
    }
  },
  id_objetivo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'objetivo',
      key: 'id_objetivo'
    }
  },
  email_confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmacao_token: DataTypes.STRING,
  reset_token: DataTypes.STRING,
  reset_token_expira: DataTypes.DATE
}, {
  tableName: 'usuario',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('senha_hash')) {
        const salt = await bcrypt.genSalt(10);
        user.senha_hash = await bcrypt.hash(user.senha_hash, salt);
      }
    }
  },
  defaultScope: {
    attributes: {
      exclude: ['senha_hash', 'reset_token', 'reset_token_expira', 'confirmacao_token']
    }
  },
  scopes: {
    comSenha: {
      attributes: {}
    }
  },
  classMethods: {
    associate: (models) => {
      // Relacionamento com objetivo
      this.belongsTo(models.Objetivo, {
        foreignKey: 'id_objetivo',
        as: 'objetivo'
      });

      // Relacionamento com profissionais (personal/nutricionista)
      this.belongsToMany(models.Profissional, {
        through: 'usuario_profissional',
        foreignKey: 'id_usuario',
        as: {
          personal: {
            where: { tipo_vinculo: 'personal_trainer' }
          },
          nutricionista: {
            where: { tipo_vinculo: 'nutricionista' }
          }
        }
      });

      // Relacionamento com diários alimentares
      this.hasMany(models.DiarioAlimentar, {
        foreignKey: 'id_usuario',
        as: 'diarios'
      });

      // Relacionamento com treinos
      this.hasMany(models.Treino, {
        foreignKey: 'id_usuario',
        as: 'treinos'
      });
    }
  }
});