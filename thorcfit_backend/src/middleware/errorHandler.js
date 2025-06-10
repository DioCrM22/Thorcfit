const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado pelo middleware:', err);

  // Erro de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors
    });
  }

  // Erro de constraint única do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'campo';
    return res.status(409).json({
      error: `${field} já está em uso`
    });
  }

  // Erro de chave estrangeira do Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Referência inválida nos dados fornecidos'
    });
  }

  // Erro de conexão com banco de dados
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      error: 'Serviço temporariamente indisponível'
    });
  }

  // Erro de sintaxe JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Formato JSON inválido'
    });
  }

  // Erro de payload muito grande
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Payload muito grande'
    });
  }

  // Erro personalizado com status
  if (err.status) {
    return res.status(err.status).json({
      error: err.message || 'Erro na requisição'
    });
  }

  // Erro interno do servidor
  return res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message
  });
};

module.exports = errorHandler;

