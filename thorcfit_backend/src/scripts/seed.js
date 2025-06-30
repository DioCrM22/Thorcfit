const { sequelize } = require('../src/config/database');
const {
  Usuario,
  Nutricionista,
  PersonalTrainer,
  Alimento,
  Exercicio,
  DiarioAlimentar,
  Refeicao,
  AlimentoRefeicao,
  PlanoTreino,
  ExerciciosDoTreino,
  MetricasUsuario,
  MetasUsuario,
  VinculoNutricao,
  VinculoTreino,
  HistoricoTreino,
  TipoConta
} = require('../src/models');

const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Sincronizar modelos
    await sequelize.sync();
    console.log('✅ Modelos sincronizados');

    // 1. Criar usuários de teste
    console.log('👥 Criando usuários...');
    const senhaHash = await bcrypt.hash('123456', 12);

    const tiposConta = await TipoConta.bulkCreate([
      { id_tipo_conta: 1, nome: 'usuario' },
      { id_tipo_conta: 2, nome: 'nutricionista' },
      { id_tipo_conta: 3, nome: 'personal' }
    ]);

    const usuarios = await Usuario.bulkCreate([
      {
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha_hash: senhaHash,
        data_nascimento: '1990-05-15',
        genero: 'masculino',
        telefone: '(11) 99999-1111',
        metodo_login: 'email',
        ativo: true,
        id_tipo_conta: 1
      },
      {
        nome: 'Maria Santos',
        email: 'maria@teste.com',
        senha_hash: senhaHash,
        data_nascimento: '1985-08-22',
        genero: 'feminino',
        telefone: '(11) 99999-2222',
        metodo_login: 'email',
        ativo: true,
        id_tipo_conta: 1
      },
      {
        nome: 'Dr. Carlos Nutricionista',
        email: 'carlos.nutri@teste.com',
        senha_hash: senhaHash,
        data_nascimento: '1980-03-10',
        genero: 'masculino',
        telefone: '(11) 99999-3333',
        metodo_login: 'email',
        ativo: true,
        id_tipo_conta: 2
      },
      {
        nome: 'Ana Personal Trainer',
        email: 'ana.personal@teste.com',
        senha_hash: senhaHash,
        data_nascimento: '1988-11-05',
        genero: 'feminino',
        telefone: '(11) 99999-4444',
        metodo_login: 'email',
        ativo: true,
        id_tipo_conta: 3
      },
      {
        nome: 'Pedro Oliveira',
        email: 'pedro@teste.com',
        senha_hash: senhaHash,
        data_nascimento: '1995-01-20',
        genero: 'masculino',
        telefone: '(11) 99999-5555',
        metodo_login: 'email',
        ativo: true,
        id_tipo_conta: 1
      }
    ]);

    // 2. Criar perfis profissionais
    console.log('👨‍⚕️ Criando perfis profissionais...');
    
    const nutricionista = await Nutricionista.create({
      id_usuario: usuarios[2].id_usuario,
      registro_nutricionista: 'CRN-123456',
      bio: 'Nutricionista especializado em nutrição esportiva e emagrecimento saudável.',
      especialidades: 'Nutrição Esportiva, Emagrecimento, Diabetes',
      preco_consulta: 150.00
    });

    const personalTrainer = await PersonalTrainer.create({
      id_usuario: usuarios[3].id_usuario,
      registro_personal: 'CREF-789012',
      bio: 'Personal Trainer com foco em treinamento funcional e musculação.',
      especialidades: 'Musculação, Treinamento Funcional, Reabilitação',
      preco_sessao: 80.00
    });

    // 3. Criar alimentos básicos
    console.log('🍎 Criando alimentos...');
    
    const alimentos = await Alimento.bulkCreate([
      // Proteínas
      { nome: 'Peito de Frango', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6, porcao_padrao: '100g' },
      { nome: 'Ovo Inteiro', calorias: 155, proteinas: 13, carboidratos: 1.1, gorduras: 11, porcao_padrao: '100g' },
      { nome: 'Salmão', calorias: 208, proteinas: 20, carboidratos: 0, gorduras: 13, porcao_padrao: '100g' },
      { nome: 'Carne Bovina Magra', calorias: 250, proteinas: 26, carboidratos: 0, gorduras: 15, porcao_padrao: '100g' },
      { nome: 'Whey Protein', calorias: 380, proteinas: 80, carboidratos: 5, gorduras: 5, porcao_padrao: '100g' },
      
      // Carboidratos
      { nome: 'Arroz Branco', calorias: 130, proteinas: 2.7, carboidratos: 28, gorduras: 0.3, porcao_padrao: '100g' },
      { nome: 'Batata Doce', calorias: 86, proteinas: 1.6, carboidratos: 20, gorduras: 0.1, porcao_padrao: '100g' },
      { nome: 'Aveia', calorias: 389, proteinas: 16.9, carboidratos: 66.3, gorduras: 6.9, porcao_padrao: '100g' },
      { nome: 'Pão Integral', calorias: 247, proteinas: 13, carboidratos: 41, gorduras: 4.2, porcao_padrao: '100g' },
      { nome: 'Macarrão Integral', calorias: 124, proteinas: 5, carboidratos: 23, gorduras: 1.1, porcao_padrao: '100g' },
      
      // Vegetais
      { nome: 'Brócolis', calorias: 34, proteinas: 2.8, carboidratos: 7, gorduras: 0.4, porcao_padrao: '100g' },
      { nome: 'Espinafre', calorias: 23, proteinas: 2.9, carboidratos: 3.6, gorduras: 0.4, porcao_padrao: '100g' },
      { nome: 'Tomate', calorias: 18, proteinas: 0.9, carboidratos: 3.9, gorduras: 0.2, porcao_padrao: '100g' },
      { nome: 'Alface', calorias: 15, proteinas: 1.4, carboidratos: 2.9, gorduras: 0.2, porcao_padrao: '100g' },
      { nome: 'Cenoura', calorias: 41, proteinas: 0.9, carboidratos: 9.6, gorduras: 0.2, porcao_padrao: '100g' },
      
      // Frutas
      { nome: 'Banana', calorias: 89, proteinas: 1.1, carboidratos: 23, gorduras: 0.3, porcao_padrao: '100g' },
      { nome: 'Maçã', calorias: 52, proteinas: 0.3, carboidratos: 14, gorduras: 0.2, porcao_padrao: '100g' },
      { nome: 'Laranja', calorias: 47, proteinas: 0.9, carboidratos: 12, gorduras: 0.1, porcao_padrao: '100g' },
      { nome: 'Morango', calorias: 32, proteinas: 0.7, carboidratos: 7.7, gorduras: 0.3, porcao_padrao: '100g' },
      { nome: 'Abacate', calorias: 160, proteinas: 2, carboidratos: 9, gorduras: 15, porcao_padrao: '100g' },
      
      // Gorduras saudáveis
      { nome: 'Azeite de Oliva', calorias: 884, proteinas: 0, carboidratos: 0, gorduras: 100, porcao_padrao: '100g' },
      { nome: 'Castanha do Pará', calorias: 656, proteinas: 14, carboidratos: 12, gorduras: 67, porcao_padrao: '100g' },
      { nome: 'Amendoim', calorias: 567, proteinas: 26, carboidratos: 16, gorduras: 49, porcao_padrao: '100g' },
      { nome: 'Abacate', calorias: 160, proteinas: 2, carboidratos: 9, gorduras: 15, porcao_padrao: '100g' },
      
      // Laticínios
      { nome: 'Leite Desnatado', calorias: 34, proteinas: 3.4, carboidratos: 5, gorduras: 0.1, porcao_padrao: '100ml' },
      { nome: 'Iogurte Natural', calorias: 61, proteinas: 3.5, carboidratos: 4.7, gorduras: 3.3, porcao_padrao: '100g' },
      { nome: 'Queijo Cottage', calorias: 98, proteinas: 11, carboidratos: 3.4, gorduras: 4.3, porcao_padrao: '100g' }
    ]);

    // 4. Criar exercícios
    console.log('💪 Criando exercícios...');
    
    const exercicios = await Exercicio.bulkCreate([
      // Peito
      { nome: 'Supino Reto', descricao: 'Exercício básico para peito', grupo_muscular: 'Peito', equipamento_necesario: 'Barra e banco', nivel_dificuldade: 'intermediario' },
      { nome: 'Supino Inclinado', descricao: 'Exercício para parte superior do peito', grupo_muscular: 'Peito', equipamento_necesario: 'Barra e banco inclinado', nivel_dificuldade: 'intermediario' },
      { nome: 'Flexão de Braço', descricao: 'Exercício com peso corporal', grupo_muscular: 'Peito', equipamento_necesario: 'Nenhum', nivel_dificuldade: 'iniciante' },
      { nome: 'Crucifixo', descricao: 'Exercício de isolamento para peito', grupo_muscular: 'Peito', equipamento_necesario: 'Halteres', nivel_dificuldade: 'intermediario' },
      
      // Costas
      { nome: 'Puxada na Polia', descricao: 'Exercício para latíssimo do dorso', grupo_muscular: 'Costas', equipamento_necesario: 'Polia alta', nivel_dificuldade: 'intermediario' },
      { nome: 'Remada Curvada', descricao: 'Exercício para meio das costas', grupo_muscular: 'Costas', equipamento_necesario: 'Barra', nivel_dificuldade: 'intermediario' },
      { nome: 'Barra Fixa', descricao: 'Exercício com peso corporal', grupo_muscular: 'Costas', equipamento_necesario: 'Barra fixa', nivel_dificuldade: 'avancado' },
      { nome: 'Remada Sentada', descricao: 'Exercício para meio das costas', grupo_muscular: 'Costas', equipamento_necesario: 'Polia baixa', nivel_dificuldade: 'intermediario' },
      
      // Pernas
      { nome: 'Agachamento', descricao: 'Exercício fundamental para pernas', grupo_muscular: 'Pernas', equipamento_necesario: 'Barra', nivel_dificuldade: 'intermediario' },
      { nome: 'Leg Press', descricao: 'Exercício para quadríceps', grupo_muscular: 'Pernas', equipamento_necesario: 'Leg press', nivel_dificuldade: 'iniciante' },
      { nome: 'Stiff', descricao: 'Exercício para posterior de coxa', grupo_muscular: 'Pernas', equipamento_necesario: 'Barra ou halteres', nivel_dificuldade: 'intermediario' },
      { nome: 'Extensão de Pernas', descricao: 'Exercício de isolamento para quadríceps', grupo_muscular: 'Pernas', equipamento_necesario: 'Cadeira extensora', nivel_dificuldade: 'iniciante' },
      { nome: 'Flexão de Pernas', descricao: 'Exercício para posterior de coxa', grupo_muscular: 'Pernas', equipamento_necesario: 'Mesa flexora', nivel_dificuldade: 'iniciante' },
      
      // Ombros
      { nome: 'Desenvolvimento', descricao: 'Exercício para ombros', grupo_muscular: 'Ombros', equipamento_necesario: 'Halteres ou barra', nivel_dificuldade: 'intermediario' },
      { nome: 'Elevação Lateral', descricao: 'Exercício para deltóide médio', grupo_muscular: 'Ombros', equipamento_necesario: 'Halteres', nivel_dificuldade: 'iniciante' },
      { nome: 'Elevação Frontal', descricao: 'Exercício para deltóide anterior', grupo_muscular: 'Ombros', equipamento_necesario: 'Halteres', nivel_dificuldade: 'iniciante' },
      
      // Braços
      { nome: 'Rosca Direta', descricao: 'Exercício para bíceps', grupo_muscular: 'Braços', equipamento_necesario: 'Barra ou halteres', nivel_dificuldade: 'iniciante' },
      { nome: 'Tríceps Testa', descricao: 'Exercício para tríceps', grupo_muscular: 'Braços', equipamento_necesario: 'Barra ou halteres', nivel_dificuldade: 'intermediario' },
      { nome: 'Rosca Martelo', descricao: 'Exercício para bíceps e antebraço', grupo_muscular: 'Braços', equipamento_necesario: 'Halteres', nivel_dificuldade: 'iniciante' },
      { nome: 'Tríceps Pulley', descricao: 'Exercício para tríceps', grupo_muscular: 'Braços', equipamento_necesario: 'Polia alta', nivel_dificuldade: 'iniciante' },
      
      // Abdômen
      { nome: 'Abdominal Tradicional', descricao: 'Exercício básico para abdômen', grupo_muscular: 'Abdômen', equipamento_necesario: 'Nenhum', nivel_dificuldade: 'iniciante' },
      { nome: 'Prancha', descricao: 'Exercício isométrico para core', grupo_muscular: 'Abdômen', equipamento_necesario: 'Nenhum', nivel_dificuldade: 'iniciante' },
      { nome: 'Abdominal Oblíquo', descricao: 'Exercício para músculos oblíquos', grupo_muscular: 'Abdômen', equipamento_necesario: 'Nenhum', nivel_dificuldade: 'iniciante' },
      
      // Cardio
      { nome: 'Corrida', descricao: 'Exercício cardiovascular', grupo_muscular: 'Cardio', equipamento_necesario: 'Esteira ou rua', nivel_dificuldade: 'iniciante' },
      { nome: 'Bicicleta', descricao: 'Exercício cardiovascular', grupo_muscular: 'Cardio', equipamento_necesario: 'Bicicleta ergométrica', nivel_dificuldade: 'iniciante' },
      { nome: 'Elíptico', descricao: 'Exercício cardiovascular de baixo impacto', grupo_muscular: 'Cardio', equipamento_necesario: 'Elíptico', nivel_dificuldade: 'iniciante' }
    ]);

    // 5. Criar métricas para usuários
    console.log('📊 Criando métricas...');
    
    const hoje = new Date();
    const metricasData = [];

    // Criar métricas para os primeiros 3 usuários ao longo dos últimos 30 dias
    for (let i = 0; i < 3; i++) {
      const usuario = usuarios[i];
      let pesoInicial = 70 + (i * 10); // 70, 80, 90 kg
      let alturaInicial = 170 + (i * 5); // 170, 175, 180 cm
      
      for (let dia = 30; dia >= 0; dia -= 3) {
        const dataRegistro = new Date(hoje);
        dataRegistro.setDate(dataRegistro.getDate() - dia);
        
        // Simular variação de peso (perda gradual)
        const pesoAtual = pesoInicial - (30 - dia) * 0.1;
        const imc = pesoAtual / Math.pow(alturaInicial / 100, 2);
        
        metricasData.push({
          id_usuario: usuario.id_usuario,
          data_registro: dataRegistro.toISOString().split('T')[0],
          altura: alturaInicial,
          peso: Math.round(pesoAtual * 10) / 10,
          imc: Math.round(imc * 100) / 100,
          percentual_gordura: 15 + Math.random() * 5,
          circunferencia_abdominal: 80 + Math.random() * 10
        });
      }
    }

    await MetricasUsuario.bulkCreate(metricasData);

    // 6. Criar metas para usuários
    console.log('🎯 Criando metas...');
    
    const metas = [];
    for (let i = 0; i < 3; i++) {
      const usuario = usuarios[i];
      
      metas.push(
        {
          id_usuario: usuario.id_usuario,
          tipo_meta: 'peso',
          valor_meta: 65 + (i * 5),
          descricao: 'Meta de peso ideal'
        },
        {
          id_usuario: usuario.id_usuario,
          tipo_meta: 'percentual_gordura',
          valor_meta: 12 + (i * 2),
          descricao: 'Meta de percentual de gordura'
        }
      );
    }

    await MetasUsuario.bulkCreate(metas);

    // 7. Criar planos de treino
    console.log('🏋️ Criando planos de treino...');
    
    const planosTreino = await PlanoTreino.bulkCreate([
      {
        tipo_criador: 'usuario',
        id_criador_usuario: usuarios[0].id_usuario,
        nome: 'Treino Push (Peito, Ombro, Tríceps)',
        descricao: 'Treino focado em músculos de empurrar',
        data_criacao: hoje.toISOString().split('T')[0],
        status: 'ativo',
        nivel_dificuldade: 'intermediario',
        duracao_estimada: 60
      },
      {
        tipo_criador: 'usuario',
        id_criador_usuario: usuarios[0].id_usuario,
        nome: 'Treino Pull (Costas, Bíceps)',
        descricao: 'Treino focado em músculos de puxar',
        data_criacao: hoje.toISOString().split('T')[0],
        status: 'ativo',
        nivel_dificuldade: 'intermediario',
        duracao_estimada: 50
      },
      {
        tipo_criador: 'usuario',
        id_criador_usuario: usuarios[1].id_usuario,
        nome: 'Treino de Pernas',
        descricao: 'Treino completo para membros inferiores',
        data_criacao: hoje.toISOString().split('T')[0],
        status: 'ativo',
        nivel_dificuldade: 'avancado',
        duracao_estimada: 70
      },
      {
        tipo_criador: 'personal',
        id_criador_personal: personalTrainer.id_personal,
        nome: 'Treino Funcional Iniciante',
        descricao: 'Treino funcional para iniciantes',
        data_criacao: hoje.toISOString().split('T')[0],
        status: 'ativo',
        nivel_dificuldade: 'iniciante',
        duracao_estimada: 45
      }
    ]);

    // 8. Adicionar exercícios aos planos
    console.log('🔗 Vinculando exercícios aos planos...');
    
    // Treino Push
    await ExerciciosDoTreino.bulkCreate([
      { id_treino: planosTreino[0].id_plano_treino, id_exercicio: exercicios[0].id_exercicio, series: 4, repeticoes: 12, carga: 60, ordem: 1 },
      { id_treino: planosTreino[0].id_plano_treino, id_exercicio: exercicios[1].id_exercicio, series: 3, repeticoes: 10, carga: 50, ordem: 2 },
      { id_treino: planosTreino[0].id_plano_treino, id_exercicio: exercicios[13].id_exercicio, series: 3, repeticoes: 12, carga: 15, ordem: 3 },
      { id_treino: planosTreino[0].id_plano_treino, id_exercicio: exercicios[17].id_exercicio, series: 3, repeticoes: 15, carga: 40, ordem: 4 }
    ]);

    // Treino Pull
    await ExerciciosDoTreino.bulkCreate([
      { id_treino: planosTreino[1].id_plano_treino, id_exercicio: exercicios[4].id_exercicio, series: 4, repeticoes: 10, carga: 50, ordem: 1 },
      { id_treino: planosTreino[1].id_plano_treino, id_exercicio: exercicios[5].id_exercicio, series: 3, repeticoes: 12, carga: 40, ordem: 2 },
      { id_treino: planosTreino[1].id_plano_treino, id_exercicio: exercicios[16].id_exercicio, series: 3, repeticoes: 15, carga: 12, ordem: 3 }
    ]);

    // Treino de Pernas
    await ExerciciosDoTreino.bulkCreate([
      { id_treino: planosTreino[2].id_plano_treino, id_exercicio: exercicios[8].id_exercicio, series: 4, repeticoes: 15, carga: 80, ordem: 1 },
      { id_treino: planosTreino[2].id_plano_treino, id_exercicio: exercicios[9].id_exercicio, series: 3, repeticoes: 20, carga: 120, ordem: 2 },
      { id_treino: planosTreino[2].id_plano_treino, id_exercicio: exercicios[10].id_exercicio, series: 3, repeticoes: 12, carga: 50, ordem: 3 },
      { id_treino: planosTreino[2].id_plano_treino, id_exercicio: exercicios[11].id_exercicio, series: 3, repeticoes: 15, carga: 30, ordem: 4 }
    ]);

    // 9. Criar diários alimentares de exemplo
    console.log('🍽️ Criando diários alimentares...');
    
    const diarios = [];
    const refeicoes = [];
    const alimentoRefeicoes = [];

    for (let i = 0; i < 3; i++) {
      const usuario = usuarios[i];
      
      // Criar diário para hoje
      const diarioHoje = {
        id_usuario: usuario.id_usuario,
        data: hoje.toISOString().split('T')[0],
        total_calorias: 0,
        total_proteinas: 0,
        total_carboidratos: 0,
        total_gorduras: 0,
        agua_ml: 1500 + Math.random() * 1000,
        observacoes: 'Dia de treino intenso!'
      };
      
      diarios.push(diarioHoje);
    }

    const diariosCreated = await DiarioAlimentar.bulkCreate(diarios);

    // Criar refeições para o primeiro usuário
    const refeicaoData = [
      {
        id_registro: diariosCreated[0].id_registro,
        tipo_refeicao: 'café_da_manhã',
        horario: '07:00',
        notas: 'Café da manhã pós-treino'
      },
      {
        id_registro: diariosCreated[0].id_registro,
        tipo_refeicao: 'almoço',
        horario: '12:30',
        notas: 'Almoço balanceado'
      },
      {
        id_registro: diariosCreated[0].id_registro,
        tipo_refeicao: 'jantar',
        horario: '19:00',
        notas: 'Jantar leve'
      }
    ];

    const refeicoesCriadas = await Refeicao.bulkCreate(refeicaoData);

    // Adicionar alimentos às refeições
    await AlimentoRefeicao.bulkCreate([
      // Café da manhã
      { id_refeicao: refeicoesCriadas[0].id_refeicao, id_alimento: alimentos[7].id_alimento, quantidade: 50, porcao: 'g' }, // Aveia
      { id_refeicao: refeicoesCriadas[0].id_refeicao, id_alimento: alimentos[15].id_alimento, quantidade: 100, porcao: 'g' }, // Banana
      { id_refeicao: refeicoesCriadas[0].id_refeicao, id_alimento: alimentos[24].id_alimento, quantidade: 200, porcao: 'ml' }, // Leite
      
      // Almoço
      { id_refeicao: refeicoesCriadas[1].id_refeicao, id_alimento: alimentos[0].id_alimento, quantidade: 150, porcao: 'g' }, // Frango
      { id_refeicao: refeicoesCriadas[1].id_refeicao, id_alimento: alimentos[5].id_alimento, quantidade: 100, porcao: 'g' }, // Arroz
      { id_refeicao: refeicoesCriadas[1].id_refeicao, id_alimento: alimentos[10].id_alimento, quantidade: 100, porcao: 'g' }, // Brócolis
      
      // Jantar
      { id_refeicao: refeicoesCriadas[2].id_refeicao, id_alimento: alimentos[2].id_alimento, quantidade: 120, porcao: 'g' }, // Salmão
      { id_refeicao: refeicoesCriadas[2].id_refeicao, id_alimento: alimentos[6].id_alimento, quantidade: 150, porcao: 'g' }, // Batata doce
      { id_refeicao: refeicoesCriadas[2].id_refeicao, id_alimento: alimentos[11].id_alimento, quantidade: 80, porcao: 'g' } // Espinafre
    ]);

    // 10. Criar vínculos profissionais
    console.log('🤝 Criando vínculos profissionais...');
    
    await VinculoNutricao.create({
      id_usuario: usuarios[0].id_usuario,
      id_nutricionista: nutricionista.id_nutricionista,
      data_inicio: hoje.toISOString().split('T')[0],
      status: 'ativo',
      observacoes: 'Acompanhamento nutricional para emagrecimento'
    });

    await VinculoTreino.create({
      id_usuario: usuarios[1].id_usuario,
      id_personal: personalTrainer.id_personal,
      data_inicio: hoje.toISOString().split('T')[0],
      status: 'ativo',
      observacoes: 'Treinamento para ganho de massa muscular'
    });

    // 11. Criar histórico de treinos
    console.log('📈 Criando histórico de treinos...');
    
    const historicoData = [];
    for (let i = 0; i < 10; i++) {
      const dataPassada = new Date(hoje);
      dataPassada.setDate(dataPassada.getDate() - i * 2);
      
      historicoData.push({
        id_usuario: usuarios[0].id_usuario,
        id_plano_treino: planosTreino[0].id_plano_treino,
        data_treino: dataPassada.toISOString().split('T')[0],
        hora_inicio: '08:00',
        hora_fim: '09:00',
        duracao_minutos: 60,
        calorias_queimadas: 300 + Math.random() * 200,
        concluido: true,
        observacoes: 'Treino concluído com sucesso'
      });
    }

    await HistoricoTreino.bulkCreate(historicoData);

    console.log('✅ Seed do banco de dados concluído com sucesso!');
    console.log('\n📊 Dados criados:');
    console.log(`👥 ${usuarios.length} usuários`);
    console.log(`🍎 ${alimentos.length} alimentos`);
    console.log(`💪 ${exercicios.length} exercícios`);
    console.log(`🏋️ ${planosTreino.length} planos de treino`);
    console.log(`📊 ${metricasData.length} registros de métricas`);
    console.log(`🍽️ ${diariosCreated.length} diários alimentares`);
    console.log(`🤝 2 vínculos profissionais`);
    console.log(`📈 ${historicoData.length} registros de histórico de treino`);
    
    console.log('\n🔑 Credenciais de teste:');
    console.log('📧 Email: joao@teste.com | Senha: 123456 (Usuário comum)');
    console.log('📧 Email: maria@teste.com | Senha: 123456 (Usuário comum)');
    console.log('📧 Email: carlos.nutri@teste.com | Senha: 123456 (Nutricionista)');
    console.log('📧 Email: ana.personal@teste.com | Senha: 123456 (Personal Trainer)');
    console.log('📧 Email: pedro@teste.com | Senha: 123456 (Usuário comum)');

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

// Executar seed se chamado diretamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seed concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro no seed:', error);
      process.exit(1);
    });
}



module.exports = seedDatabase;

