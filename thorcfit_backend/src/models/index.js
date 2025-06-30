const { sequelize } = require("../config/database");

// Importar as funções de definição de modelo
const defineUsuario = require("./Usuario");
const defineProfissionais = require("./Profissionais");
const defineNutricao = require("./Nutricao");
const defineTreino = require("./Treino");
const defineMetricasVinculos = require("./MetricasVinculos");
const defineTipoConta = require("./TipoConta");


// Definir os modelos passando a instância do Sequelize
const Usuario = defineUsuario(sequelize);
const { Nutricionista, PersonalTrainer } = defineProfissionais(sequelize);
const { Alimento, PlanoNutricional, DiarioAlimentar, Refeicao, AlimentoRefeicao } = defineNutricao(sequelize);
const { Exercicio, PlanoTreino, ExerciciosDoTreino, HistoricoTreino } = defineTreino(sequelize);
const { MetasUsuario, MetricasUsuario, VinculoNutricional, VinculoTreino } = defineMetricasVinculos(sequelize);
const TipoConta = defineTipoConta(sequelize);

// Definir associações
// Associações de Usuario
Usuario.hasOne(Nutricionista, { foreignKey: 'id_usuario', as: 'nutricionista' });
Nutricionista.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasOne(PersonalTrainer, { foreignKey: 'id_usuario', as: 'personalTrainer' });
PersonalTrainer.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(DiarioAlimentar, { foreignKey: 'id_usuario', as: 'diariosAlimentares' });
DiarioAlimentar.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(PlanoNutricional, { foreignKey: 'id_usuario', as: 'planosNutricionais' });
PlanoNutricional.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(PlanoTreino, { foreignKey: 'id_criador_usuario', as: 'planosTreinoCriados' });
PlanoTreino.belongsTo(Usuario, { foreignKey: 'id_criador_usuario', as: 'criadorUsuario' });

Usuario.hasMany(MetricasUsuario, { foreignKey: 'id_usuario', as: 'metricas' });
MetricasUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(MetasUsuario, { foreignKey: 'id_usuario', as: 'metas' });
MetasUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(VinculoNutricional, { foreignKey: 'id_usuario', as: 'vinculosNutricionais' });
VinculoNutricional.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.hasMany(VinculoTreino, { foreignKey: 'id_usuario', as: 'vinculosTreino' });
VinculoTreino.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Usuario.belongsTo(TipoConta, { foreignKey: 'id_tipo_conta', as: 'tipo_conta' });
TipoConta.hasMany(Usuario, { foreignKey: 'id_tipo_conta', as: 'usuario' });

// Associações de Nutricionista
Nutricionista.hasMany(PlanoNutricional, { foreignKey: 'id_nutricionista', as: 'planosNutricionaisCriados' });
PlanoNutricional.belongsTo(Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });

Nutricionista.hasMany(VinculoNutricional, { foreignKey: 'id_nutricionista', as: 'vinculosNutricionaisRecebidos' });
VinculoNutricional.belongsTo(Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });

// Associações de PersonalTrainer
PersonalTrainer.hasMany(PlanoTreino, { foreignKey: 'id_criador_personal', as: 'planosTreinoCriados' });
PlanoTreino.belongsTo(PersonalTrainer, { foreignKey: 'id_criador_personal', as: 'criadorPersonal' });

PersonalTrainer.hasMany(VinculoTreino, { foreignKey: 'id_personal', as: 'vinculosTreinoRecebidos' });
VinculoTreino.belongsTo(PersonalTrainer, { foreignKey: 'id_personal', as: 'personalTrainer' });

// Associações de DiarioAlimentar
DiarioAlimentar.hasMany(Refeicao, { foreignKey: 'id_registro', as: 'refeicoes' });
Refeicao.belongsTo(DiarioAlimentar, { foreignKey: 'id_registro', as: 'diarioAlimentar' });

// Associações de Refeicao
Refeicao.hasMany(AlimentoRefeicao, { foreignKey: 'id_refeicao', as: 'alimentosRefeicao' });
AlimentoRefeicao.belongsTo(Refeicao, { foreignKey: 'id_refeicao', as: 'refeicao' });

// Associações de Alimento
Alimento.hasMany(AlimentoRefeicao, { foreignKey: 'id_alimento', as: 'refeicoesComAlimento' });
AlimentoRefeicao.belongsTo(Alimento, { foreignKey: 'id_alimento', as: 'alimento' });

// Associações de PlanoTreino
PlanoTreino.hasMany(ExerciciosDoTreino, { foreignKey: 'id_treino', as: 'exerciciosDoTreino' });
ExerciciosDoTreino.belongsTo(PlanoTreino, { foreignKey: 'id_treino', as: 'planoTreino' });

// Associações de Exercicio
Exercicio.hasMany(ExerciciosDoTreino, { foreignKey: 'id_exercicio', as: 'treinosComExercicio' });
ExerciciosDoTreino.belongsTo(Exercicio, { foreignKey: 'id_exercicio', as: 'exercicio' });

// Exportar todos os modelos
module.exports = {
  sequelize,
  Usuario,
  Nutricionista,
  PersonalTrainer,
  Alimento,
  PlanoNutricional,
  DiarioAlimentar,
  Refeicao,
  AlimentoRefeicao,
  Exercicio,
  PlanoTreino,
  ExerciciosDoTreino,
  HistoricoTreino,
  MetasUsuario,
  MetricasUsuario,
  VinculoNutricional,
  VinculoTreino,
  TipoConta
};
