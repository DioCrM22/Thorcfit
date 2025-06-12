const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MetricasUsuario = sequelize.define("MetricasUsuario", {
    id_metrica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    altura: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Altura em cm",
    },
    peso: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Peso em kg",
    },
    imc: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "IMC calculado automaticamente",
    },
    percentual_gordura: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Percentual de gordura corporal",
    },
    circunferencia_abdominal: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Circunferência abdominal em cm",
    },
    massa_muscular: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Massa muscular em kg",
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "metricas_usuario",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["id_usuario", "data_registro"],
      },
    ],
  });

  const VinculoNutricional = sequelize.define("VinculoNutricional", {
    id_vinculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_nutricionista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pendente", "ativo", "inativo", "cancelado"),
      allowNull: false,
      defaultValue: "pendente",
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "vinculo_nutricional",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  const VinculoTreino = sequelize.define("VinculoTreino", {
    id_vinculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_personal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pendente", "ativo", "inativo", "cancelado"),
      allowNull: false,
      defaultValue: "pendente",
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "vinculo_treino",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  const MetasUsuario = sequelize.define("MetasUsuario", {
    id_meta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_meta: {
      type: DataTypes.ENUM("peso", "percentual_gordura", "circunferencia_abdominal", "massa_muscular"),
      allowNull: false,
    },
    valor_atual: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    valor_meta: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_prazo: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ativa", "concluida", "pausada", "cancelada"),
      allowNull: false,
      defaultValue: "ativa",
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "metas_usuario",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return {
    MetricasUsuario,
    VinculoNutricional,
    VinculoTreino,
    MetasUsuario
  };
};
