const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Token de acesso requerido'
      });
    }

    const token = authHeader.split(' ')[1]; // Remove "Bearer " do início
    
    if (!token) {
      return res.status(401).json({
        error: 'Token de acesso inválido'
      });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar o usuário no banco de dados
    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ['senha_hash'] }
    });
    
    if (!usuario || !usuario.ativo) {
      return res.status(401).json({
        error: 'Usuário não encontrado ou inativo'
      });
    }

    // Adicionar o usuário ao objeto request
    req.user = usuario;
    req.userId = usuario.id_usuario;
    
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    
    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

module.exports = authMiddleware;

