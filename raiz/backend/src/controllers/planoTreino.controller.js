const criarPlano = async (req, res) => {
    try {
      const { nome, observacoes } = req.body;
      
      const novoPlano = await PlanoTreino.create({
        nome,
        tipo_criador: req.user.tipo, // 'usuario' ou 'profissional'
        id_criador: req.user.id,     // ID do usuário ou profissional
        observacoes
      });
  
      res.status(201).json(novoPlano);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const listarPlanosUsuario = async (req, res) => {
    try {
      const planos = await PlanoTreino.findAll({
        where: { 
          tipo_criador: 'usuario',
          id_criador: req.user.id 
        },
        include: ['treinos']
      });
      res.json(planos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar planos' });
    }
  };