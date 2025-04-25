const criarTreino = async (idPlano, dadosTreino) => {
    const transaction = await sequelize.transaction();
    try {
      // Verifica limite de 5 treinos por plano
      const totalTreinos = await Treino.count({ 
        where: { id_plano: idPlano },
        transaction 
      });
      
      if (totalTreinos >= 5) {
        throw new Error('Máximo de 5 treinos por plano');
      }
  
      // Cria o treino
      const treino = await Treino.create({
        id_plano: idPlano,
        nome: dadosTreino.nome,
        ordem: dadosTreino.ordem
      }, { transaction });
  
      // Adiciona exercícios
      await ExercicioTreino.bulkCreate(
        dadosTreino.exercicios.map(ex => ({
          id_treino: treino.id_treino,
          id_exercicio: ex.id_exercicio,
          series: ex.series,
          repeticoes: ex.repeticoes,
          carga: ex.carga
        })),
        { transaction }
      );
  
      await transaction.commit();
      return treino;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };