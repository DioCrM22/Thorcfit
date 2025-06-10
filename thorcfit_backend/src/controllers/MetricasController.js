const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { MetricasUsuario, MetasUsuario } = require('../models');

class MetricasController {
  // Validações para nova métrica
  static validateMetrica = [
    body('data_registro')
      .isISO8601()
      .withMessage('Data de registro inválida'),
    body('peso')
      .optional()
      .isFloat({ min: 20, max: 300 })
      .withMessage('Peso deve estar entre 20 e 300 kg'),
    body('altura')
      .optional()
      .isFloat({ min: 100, max: 250 })
      .withMessage('Altura deve estar entre 100 e 250 cm'),
    body('percentual_gordura')
      .optional()
      .isFloat({ min: 0, max: 50 })
      .withMessage('Percentual de gordura deve estar entre 0 e 50%'),
    body('circunferencia_abdominal')
      .optional()
      .isFloat({ min: 50, max: 200 })
      .withMessage('Circunferência abdominal deve estar entre 50 e 200 cm')
  ];

  // Obter histórico de métricas
  static async getHistorico(req, res) {
    try {
      // Métrica mais recente
      const metricaAtual = await MetricasUsuario.findOne({
        where: { id_usuario: req.userId },
        order: [['data_registro', 'DESC']]
      });

      // Calcular variação de peso
      let variacaoPeso = null;
      if (metricaAtual && metricaAtual.peso) {
        const metricaAnterior = await MetricasUsuario.findOne({
          where: {
            id_usuario: req.userId,
            peso: { [Op.not]: null },
            data_registro: { [Op.lt]: metricaAtual.data_registro }
          },
          order: [['data_registro', 'DESC']]
        });

        if (metricaAnterior && metricaAnterior.peso) {
          variacaoPeso = parseFloat((metricaAtual.peso - metricaAnterior.peso).toFixed(1));
        }
      }

      // Classificação do IMC
      const classificacaoIMC = this.classificarIMC(metricaAtual?.imc);

      // Dias desde última medição
      let diasDesdeUltimaMedicao = null;
      if (metricaAtual) {
        const hoje = new Date();
        const dataRegistro = new Date(metricaAtual.data_registro);
        diasDesdeUltimaMedicao = Math.floor((hoje - dataRegistro) / (1000 * 60 * 60 * 24));
      }

      // Histórico de métricas (últimas 20)
      const historicoMetricas = await MetricasUsuario.findAll({
        where: { id_usuario: req.userId },
        order: [['data_registro', 'DESC']],
        limit: 20
      });

      // Dados para gráficos
      const [pesoData, pesoLabels] = await this.obterDadosGraficoPeso(req.userId, 30);
      const [imcData, imcLabels] = await this.obterDadosGraficoIMC(req.userId, 30);

      // Metas do usuário
      const metas = await this.obterMetasUsuario(req.userId);

      // Progresso das metas
      const progressoMetas = this.calcularProgressoMetas(metricaAtual, metas);

      res.json({
        metricas_atuais: metricaAtual || {
          peso: null,
          altura: null,
          imc: null,
          percentual_gordura: null,
          circunferencia_abdominal: null
        },
        variacao_peso: variacaoPeso,
        classificacao_imc: classificacaoIMC,
        dias_desde_ultima_medicao: diasDesdeUltimaMedicao,
        historico_metricas: historicoMetricas,
        peso_data: pesoData,
        peso_labels: pesoLabels,
        imc_data: imcData,
        imc_labels: imcLabels,
        metas,
        progresso_metas: progressoMetas
      });

    } catch (error) {
      console.error('Erro ao buscar histórico de métricas:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Registrar nova métrica
  static async addMetrica(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors.array()
        });
      }

      const {
        data_registro,
        peso,
        altura,
        percentual_gordura,
        circunferencia_abdominal,
        massa_muscular,
        observacoes
      } = req.body;

      // Verificar se já existe métrica para esta data
      const metricaExistente = await MetricasUsuario.findOne({
        where: {
          id_usuario: req.userId,
          data_registro
        }
      });

      if (metricaExistente) {
        return res.status(409).json({
          error: 'Já existe uma métrica registrada para esta data. Edite a existente.'
        });
      }

      // Calcular IMC se peso e altura estiverem disponíveis
      let imc = null;
      if (peso && altura) {
        imc = parseFloat((peso / Math.pow(altura / 100, 2)).toFixed(2));
      }

      // Criar nova métrica
      const novaMetrica = await MetricasUsuario.create({
        id_usuario: req.userId,
        data_registro,
        altura: altura || null,
        peso: peso || null,
        imc,
        percentual_gordura: percentual_gordura || null,
        circunferencia_abdominal: circunferencia_abdominal || null,
        massa_muscular: massa_muscular || null,
        observacoes: observacoes || null
      });

      res.status(201).json({
        success: true,
        message: 'Métrica registrada com sucesso',
        metrica: novaMetrica
      });

    } catch (error) {
      console.error('Erro ao registrar métrica:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Atualizar métrica existente
  static async updateMetrica(req, res) {
    try {
      const { id } = req.params;
      const {
        peso,
        altura,
        percentual_gordura,
        circunferencia_abdominal,
        massa_muscular,
        observacoes
      } = req.body;

      const metrica = await MetricasUsuario.findOne({
        where: {
          id_metrica: id,
          id_usuario: req.userId
        }
      });

      if (!metrica) {
        return res.status(404).json({
          error: 'Métrica não encontrada'
        });
      }

      // Calcular IMC se peso e altura estiverem disponíveis
      let imc = metrica.imc;
      const novoPeso = peso !== undefined ? peso : metrica.peso;
      const novaAltura = altura !== undefined ? altura : metrica.altura;

      if (novoPeso && novaAltura) {
        imc = parseFloat((novoPeso / Math.pow(novaAltura / 100, 2)).toFixed(2));
      }

      // Atualizar métrica
      await metrica.update({
        altura: altura !== undefined ? altura : metrica.altura,
        peso: peso !== undefined ? peso : metrica.peso,
        imc,
        percentual_gordura: percentual_gordura !== undefined ? percentual_gordura : metrica.percentual_gordura,
        circunferencia_abdominal: circunferencia_abdominal !== undefined ? circunferencia_abdominal : metrica.circunferencia_abdominal,
        massa_muscular: massa_muscular !== undefined ? massa_muscular : metrica.massa_muscular,
        observacoes: observacoes !== undefined ? observacoes : metrica.observacoes
      });

      res.json({
        success: true,
        message: 'Métrica atualizada com sucesso',
        metrica
      });

    } catch (error) {
      console.error('Erro ao atualizar métrica:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Excluir métrica
  static async deleteMetrica(req, res) {
    try {
      const { id } = req.params;

      const metrica = await MetricasUsuario.findOne({
        where: {
          id_metrica: id,
          id_usuario: req.userId
        }
      });

      if (!metrica) {
        return res.status(404).json({
          error: 'Métrica não encontrada'
        });
      }

      await metrica.destroy();

      res.json({
        success: true,
        message: 'Métrica excluída com sucesso'
      });

    } catch (error) {
      console.error('Erro ao excluir métrica:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Salvar metas do usuário
  static async saveMetas(req, res) {
    try {
      const {
        meta_peso,
        meta_gordura,
        meta_cintura,
        meta_massa_muscular,
        objetivo_descricao
      } = req.body;

      const metas = [];

      // Criar ou atualizar metas
      if (meta_peso) {
        const [meta] = await MetasUsuario.findOrCreate({
          where: {
            id_usuario: req.userId,
            tipo_meta: 'peso'
          },
          defaults: {
            id_usuario: req.userId,
            tipo_meta: 'peso',
            valor_meta: meta_peso,
            descricao: objetivo_descricao
          }
        });

        if (!meta.isNewRecord) {
          await meta.update({
            valor_meta: meta_peso,
            descricao: objetivo_descricao
          });
        }

        metas.push(meta);
      }

      if (meta_gordura) {
        const [meta] = await MetasUsuario.findOrCreate({
          where: {
            id_usuario: req.userId,
            tipo_meta: 'percentual_gordura'
          },
          defaults: {
            id_usuario: req.userId,
            tipo_meta: 'percentual_gordura',
            valor_meta: meta_gordura,
            descricao: objetivo_descricao
          }
        });

        if (!meta.isNewRecord) {
          await meta.update({
            valor_meta: meta_gordura,
            descricao: objetivo_descricao
          });
        }

        metas.push(meta);
      }

      if (meta_cintura) {
        const [meta] = await MetasUsuario.findOrCreate({
          where: {
            id_usuario: req.userId,
            tipo_meta: 'circunferencia_abdominal'
          },
          defaults: {
            id_usuario: req.userId,
            tipo_meta: 'circunferencia_abdominal',
            valor_meta: meta_cintura,
            descricao: objetivo_descricao
          }
        });

        if (!meta.isNewRecord) {
          await meta.update({
            valor_meta: meta_cintura,
            descricao: objetivo_descricao
          });
        }

        metas.push(meta);
      }

      if (meta_massa_muscular) {
        const [meta] = await MetasUsuario.findOrCreate({
          where: {
            id_usuario: req.userId,
            tipo_meta: 'massa_muscular'
          },
          defaults: {
            id_usuario: req.userId,
            tipo_meta: 'massa_muscular',
            valor_meta: meta_massa_muscular,
            descricao: objetivo_descricao
          }
        });

        if (!meta.isNewRecord) {
          await meta.update({
            valor_meta: meta_massa_muscular,
            descricao: objetivo_descricao
          });
        }

        metas.push(meta);
      }

      res.json({
        success: true,
        message: 'Metas salvas com sucesso',
        metas
      });

    } catch (error) {
      console.error('Erro ao salvar metas:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Obter dados para gráficos
  static async getDadosGrafico(req, res) {
    try {
      const { tipo = 'peso', periodo = 30 } = req.query;

      let data, labels;

      if (tipo === 'peso') {
        [data, labels] = await this.obterDadosGraficoPeso(req.userId, parseInt(periodo));
      } else if (tipo === 'imc') {
        [data, labels] = await this.obterDadosGraficoIMC(req.userId, parseInt(periodo));
      } else if (tipo === 'gordura') {
        [data, labels] = await this.obterDadosGraficoGordura(req.userId, parseInt(periodo));
      } else {
        return res.status(400).json({
          error: 'Tipo de gráfico inválido'
        });
      }

      res.json({ data, labels });

    } catch (error) {
      console.error('Erro ao obter dados do gráfico:', error);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }

  // Métodos auxiliares
  static classificarIMC(imc) {
    if (!imc) {
      return { categoria: 'N/A', cor: 'secondary' };
    }

    const imcFloat = parseFloat(imc);

    if (imcFloat < 18.5) {
      return { categoria: 'Abaixo do peso', cor: 'info' };
    } else if (imcFloat < 25) {
      return { categoria: 'Peso normal', cor: 'success' };
    } else if (imcFloat < 30) {
      return { categoria: 'Sobrepeso', cor: 'warning' };
    } else if (imcFloat < 35) {
      return { categoria: 'Obesidade I', cor: 'danger' };
    } else if (imcFloat < 40) {
      return { categoria: 'Obesidade II', cor: 'danger' };
    } else {
      return { categoria: 'Obesidade III', cor: 'danger' };
    }
  }

  static async obterDadosGraficoPeso(userId, dias) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const metricas = await MetricasUsuario.findAll({
      where: {
        id_usuario: userId,
        peso: { [Op.not]: null },
        data_registro: { [Op.gte]: dataLimite.toISOString().split('T')[0] }
      },
      order: [['data_registro', 'ASC']]
    });

    const data = metricas.map(m => parseFloat(m.peso));
    const labels = metricas.map(m => new Date(m.data_registro).toLocaleDateString('pt-BR'));

    return [data, labels];
  }

  static async obterDadosGraficoIMC(userId, dias) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const metricas = await MetricasUsuario.findAll({
      where: {
        id_usuario: userId,
        imc: { [Op.not]: null },
        data_registro: { [Op.gte]: dataLimite.toISOString().split('T')[0] }
      },
      order: [['data_registro', 'ASC']]
    });

    const data = metricas.map(m => parseFloat(m.imc));
    const labels = metricas.map(m => new Date(m.data_registro).toLocaleDateString('pt-BR'));

    return [data, labels];
  }

  static async obterDadosGraficoGordura(userId, dias) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const metricas = await MetricasUsuario.findAll({
      where: {
        id_usuario: userId,
        percentual_gordura: { [Op.not]: null },
        data_registro: { [Op.gte]: dataLimite.toISOString().split('T')[0] }
      },
      order: [['data_registro', 'ASC']]
    });

    const data = metricas.map(m => parseFloat(m.percentual_gordura));
    const labels = metricas.map(m => new Date(m.data_registro).toLocaleDateString('pt-BR'));

    return [data, labels];
  }

  static async obterMetasUsuario(userId) {
    const metas = await MetasUsuario.findAll({
      where: {
        id_usuario: userId,
        status: 'ativa'
      }
    });

    const metasObj = {
      peso: null,
      percentual_gordura: null,
      circunferencia_abdominal: null,
      massa_muscular: null,
      descricao: null
    };

    metas.forEach(meta => {
      metasObj[meta.tipo_meta] = parseFloat(meta.valor_meta);
      if (!metasObj.descricao && meta.descricao) {
        metasObj.descricao = meta.descricao;
      }
    });

    return metasObj;
  }

  static calcularProgressoMetas(metricaAtual, metas) {
    const progresso = {
      peso: 0,
      gordura: 0,
      cintura: 0,
      massa_muscular: 0
    };

    if (!metricaAtual) return progresso;

    if (metas.peso && metricaAtual.peso) {
      const diferenca = Math.abs(parseFloat(metricaAtual.peso) - metas.peso);
      progresso.peso = Math.max(0, Math.min(100, 100 - (diferenca * 10)));
    }

    if (metas.percentual_gordura && metricaAtual.percentual_gordura) {
      const diferenca = Math.abs(parseFloat(metricaAtual.percentual_gordura) - metas.percentual_gordura);
      progresso.gordura = Math.max(0, Math.min(100, 100 - (diferenca * 5)));
    }

    if (metas.circunferencia_abdominal && metricaAtual.circunferencia_abdominal) {
      const diferenca = Math.abs(parseFloat(metricaAtual.circunferencia_abdominal) - metas.circunferencia_abdominal);
      progresso.cintura = Math.max(0, Math.min(100, 100 - (diferenca * 2)));
    }

    if (metas.massa_muscular && metricaAtual.massa_muscular) {
      const diferenca = Math.abs(parseFloat(metricaAtual.massa_muscular) - metas.massa_muscular);
      progresso.massa_muscular = Math.max(0, Math.min(100, 100 - (diferenca * 5)));
    }

    return progresso;
  }
}

module.exports = MetricasController;

