const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./Usuario');

const Alimento = sequelize.define('Alimento', {
  id_alimento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  calorias: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    comment: 'Calorias por 100g'
  },
  proteinas: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Proteínas em gramas por 100g'
  },
  carboidratos: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Carboidratos em gramas por 100g'
  },
  gorduras: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Gorduras em gramas por 100g'
  },
  fibras: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Fibras em gramas por 100g'
  },
  porcao_padrao: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '100g'
  }
}, {
  tableName: 'alimento',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const DiarioAlimentar = sequelize.define('DiarioAlimentar', {
  id_registro: {
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
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total_calorias: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    defaultValue: 0
  },
  total_proteinas: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    defaultValue: 0
  },
  total_carboidratos: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    defaultValue: 0
  },
  total_gorduras: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    defaultValue: 0
  },
  agua_ml: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'diario_alimentar',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['id_usuario', 'data']
    }
  ]
});

const Refeicao = sequelize.define('Refeicao', {
  id_refeicao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_registro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DiarioAlimentar,
      key: 'id_registro'
    }
  },
  tipo_refeicao: {
    type: DataTypes.ENUM('café_da_manhã', 'lanche_manhã', 'almoço', 'lanche_tarde', 'jantar'),
    allowNull: false
  },
  horario: {
    type: DataTypes.TIME,
    allowNull: false
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'refeicao',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const AlimentoRefeicao = sequelize.define('AlimentoRefeicao', {
  id_refeicao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Refeicao,
      key: 'id_refeicao'
    }
  },
  id_alimento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Alimento,
      key: 'id_alimento'
    }
  },
  quantidade: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  porcao: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'g'
  }
}, {
  tableName: 'alimento_refeicao',
  timestamps: false
});

const PlanoNutricional = sequelize.define('PlanoNutricional', {
  id_plano: {
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
  id_nutricionista: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  calorias_diarias: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  proteinas_diarias: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  carboidratos_diarias: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  gorduras_diarias: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo', 'concluido'),
    allowNull: false,
    defaultValue: 'ativo'
  },
  data_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  data_fim: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'plano_nutricional',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Definir associações
Usuario.hasMany(DiarioAlimentar, { foreignKey: 'id_usuario', as: 'diariosAlimentares' });
DiarioAlimentar.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

DiarioAlimentar.hasMany(Refeicao, { foreignKey: 'id_registro', as: 'refeicoes' });
Refeicao.belongsTo(DiarioAlimentar, { foreignKey: 'id_registro', as: 'diarioAlimentar' });

Refeicao.belongsToMany(Alimento, { 
  through: AlimentoRefeicao, 
  foreignKey: 'id_refeicao',
  otherKey: 'id_alimento',
  as: 'alimentos'
});

Alimento.belongsToMany(Refeicao, { 
  through: AlimentoRefeicao, 
  foreignKey: 'id_alimento',
  otherKey: 'id_refeicao',
  as: 'refeicoes'
});

Usuario.hasMany(PlanoNutricional, { foreignKey: 'id_usuario', as: 'planosNutricionais' });
PlanoNutricional.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

module.exports = {
  Alimento,
  DiarioAlimentar,
  Refeicao,
  AlimentoRefeicao,
  PlanoNutricional
};

