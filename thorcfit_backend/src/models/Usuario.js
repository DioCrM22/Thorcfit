const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuario = sequelize.define("Usuario", {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    senha_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255]
      }
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    genero: {
      type: DataTypes.ENUM("masculino", "feminino", "outro"),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: /^[0-9()+-]+$/ // Valida formato básico de telefone
      }
    },
    id_objetivo: {
      type: DataTypes.ENUM("manutencao", "ganho", "perda"),
      allowNull: true
    },
    id_tipo_conta: {
      field: 'id_tipo_conta',
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "tipo_conta",
        key: "id_tipo_conta"
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true // Se armazenar URLs
      }
    },
    metodo_login: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: "usuario",
    timestamps: true,
    updatedAt: "data_atualizacao",
    underscored: true // Padrão snake_case para campos
  });

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.TipoConta, {
      foreignKey: "id_tipo_conta",
      as: "tipoConta"
    });

    // Adicione outras associações conforme necessário
    Usuario.hasMany(models.HistoricoTreino, {
      foreignKey: "id_usuario",
      as: "historicosTreino"
    });
  };

  return Usuario;
};