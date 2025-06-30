const { body, validationResult } = require('express-validator');
const { Usuario, Nutricionista, PersonalTrainer, TipoConta  } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  // Validações para atualização de perfil
  static validateUpdateProfile = [
    body('nome')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('telefone')
      .optional()
      .trim()
      .isLength({ max: 20 })
      .withMessage('Telefone deve ter no máximo 20 caracteres'),
    body('genero')
      .optional()
      .isIn(['masculino', 'feminino', 'outro'])
      .withMessage('Gênero inválido'),
    body('data_nascimento')
      .optional()
      .isISO8601()
      .withMessage('Data de nascimento inválida')
  ];
  //cadastro
  static validateSignup = [
  body('nome')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('E-mail inválido'),
  body('senha')
    .isLength({ min: 8 })
    .withMessage('Senha deve ter no mínimo 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)
    .withMessage('Senha deve conter maiúscula, minúscula, número e caractere especial'),
  body('tipo_conta')
    .isIn(['usuario', 'nutricionista', 'personal'])
    .withMessage('Tipo de conta inválido'),
  body('data_nascimento')
    .isISO8601()
    .withMessage('Data de nascimento inválida')
];

static async signup(req, res) {
  const tipoContaMap = {
    "usuario": 1,
    "nutricionista": 2,
    "personal": 3
  };

  let { nome, email, senha, tipo_conta, data_nascimento } = req.body;

  console.log('Recebido no signup:', { nome, email, senha: senha ? '***' : null, tipo_conta, data_nascimento });

  const tipo_conta_num = tipoContaMap[tipo_conta];
  if (!tipo_conta_num) {
    console.warn('Tipo de conta inválido:', tipo_conta);
    return res.status(400).json({
      error: 'Tipo de conta inválido',
      tipos_validos: Object.keys(tipoContaMap)
    });
  }
  tipo_conta = tipo_conta_num;

  try {
    const senha_hash = await bcrypt.hash(senha, 12);
    console.log('Senha hash gerada');

    console.log("Dados para criar usuário:", {
      nome,
      email,
      senha_hash,
      data_nascimento,
      id_tipo_conta: tipo_conta
    });

    const usuario = await Usuario.create({
      nome,
      email,
      senha_hash,
      data_nascimento,
      id_tipo_conta: "nutricionista"
    });
    
    console.log('Usuário criado no banco:', { id: usuario.id_usuario, nome: usuario.nome });

    const TIPOS_CONTA_NOMES = {
      1: 'usuario',
      2: 'nutricionista',
      3: 'personal'
    };

    const tipoContaNome = TIPOS_CONTA_NOMES[tipo_conta];
    console.log('Tipo conta nome mapeado:', tipoContaNome);

    // Gerar token JWT
    const token = jwt.sign({
      id: usuario.id_usuario,
      email: usuario.email,
      tipo_conta: tipoContaNome
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log('Token JWT gerado');

    return res.json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        id_tipo_conta: "nutricionista"
      },
      redirectTo: tipoContaNome === 'usuario' ? '/home' : `/${tipoContaNome}s/dashboard`
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({
      error: 'Erro no cadastro',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
}

  // Obter perfil de outro usuário (público)
  static async getPublicProfile(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id, {
        attributes: ['id_usuario', 'nome', 'foto_perfil'],
        include: [
          { 
            model: Nutricionista, 
            as: 'nutricionista',
            attributes: ['bio', 'especialidades', 'preco_consulta']
          },
          { 
            model: PersonalTrainer, 
            as: 'personalTrainer',
            attributes: ['bio', 'especialidades', 'preco_sessao']
          }
        ]
      });

      if (!usuario || !usuario.ativo) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      res.json({
        usuario: usuario.toJSON()
      });

    } catch (error) {
      console.error('Erro ao buscar perfil público:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Buscar profissionais (nutricionistas e personal trainers)
  static async searchProfessionals(req, res) {
    try {
      const { tipo, busca, limite = 20, pagina = 1 } = req.query;

      const offset = (pagina - 1) * limite;
      const whereClause = { ativo: true };
      
      if (busca) {
        whereClause.nome = { [require('sequelize').Op.iLike]: `%${busca}%` };
      }

      let include = [];
      
      if (tipo === 'nutricionista' || !tipo) {
        include.push({
          model: Nutricionista,
          as: 'nutricionista',
          required: tipo === 'nutricionista'
        });
      }
      
      if (tipo === 'personal' || !tipo) {
        include.push({
          model: PersonalTrainer,
          as: 'personalTrainer',
          required: tipo === 'personal'
        });
      }

      const { count, rows: profissionais } = await Usuario.findAndCountAll({
        where: whereClause,
        include,
        attributes: ['id_usuario', 'nome', 'foto_perfil'],
        limit: parseInt(limite),
        offset,
        order: [['nome', 'ASC']]
      });

      // Filtrar apenas usuários que são profissionais
      const profissionaisFiltrados = profissionais.filter(usuario => 
        usuario.nutricionista || usuario.personalTrainer
      );

      res.json({
        profissionais: profissionaisFiltrados,
        total: count,
        pagina: parseInt(pagina),
        totalPaginas: Math.ceil(count / limite)
      });

    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Desativar conta
  static async deactivateAccount(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId);

      if (!usuario) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      await usuario.update({ ativo: false });

      res.json({
        message: 'Conta desativada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao desativar conta:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Obter estatísticas do usuário
  static async getUserStats(req, res) {
    try {
      const { DiarioAlimentar, PlanoTreino, MetricasUsuario } = require('../models');

      // Buscar estatísticas básicas
      const [
        totalDiarios,
        totalPlanos,
        totalMetricas,
        ultimaMetrica
      ] = await Promise.all([
        DiarioAlimentar.count({ where: { id_usuario: req.userId } }),
        PlanoTreino.count({ where: { id_criador_usuario: req.userId } }),
        MetricasUsuario.count({ where: { id_usuario: req.userId } }),
        MetricasUsuario.findOne({
          where: { id_usuario: req.userId },
          order: [['data_registro', 'DESC']]
        })
      ]);

      res.json({
        estatisticas: {
          total_diarios_alimentares: totalDiarios,
          total_planos_treino: totalPlanos,
          total_metricas: totalMetricas,
          ultima_metrica: ultimaMetrica
        }
      });

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = UserController;

