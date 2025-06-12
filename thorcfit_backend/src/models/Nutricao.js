const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Alimento = sequelize.define("Alimento", {
    id_alimento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    calorias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      comment: "Calorias por 100g",
    },
    proteinas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: "Proteínas em gramas por 100g",
    },
    carboidratos: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: "Carboidratos em gramas por 100g",
    },
    gorduras: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: "Gorduras em gramas por 100g",
    },
    fibras: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: "Fibras em gramas por 100g",
    },
    unidade_medida: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "g",
    },
  }, {
    tableName: "alimento",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  const DiarioAlimentar = sequelize.define("DiarioAlimentar", {
    id_registro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_calorias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      defaultValue: 0,
    },
    total_proteinas: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      defaultValue: 0,
    },
    total_carboidratos: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      defaultValue: 0,
    },
    total_gorduras: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      defaultValue: 0,
    },
    agua_ml: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "diario_alimentar",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updatedAt",
    indexes: [
      {
        unique: true,
        fields: ["id_usuario", "data"],
      },
    ],
  });

  const Refeicao = sequelize.define("Refeicao", {
    id_refeicao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_registro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_refeicao: {
      type: DataTypes.ENUM("Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Jantar", "Ceia"),
      allowNull: false,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "refeicao",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  const AlimentoRefeicao = sequelize.define("AlimentoRefeicao", {
    id_refeicao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_alimento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantidade: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    porcao: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "g",
    },
  }, {
    tableName: "alimento_refeicao",
    timestamps: false,
  });

  const PlanoNutricional = sequelize.define("PlanoNutricional", {
    id_plano: {
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
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    calorias_diarias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    proteinas_diarias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    carboidratos_diarias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    gorduras_diarias: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "concluido"),
      allowNull: false,
      defaultValue: "ativo",
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    tableName: "plano_nutricional",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return {
    Alimento,
    DiarioAlimentar,
    Refeicao,
    AlimentoRefeicao,
    PlanoNutricional
  };
};