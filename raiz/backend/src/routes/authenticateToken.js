// src/routes/authenticateToken.js
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/index.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Uso de optional chaining

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Token de acesso não fornecido',
      code: 'MISSING_TOKEN'
    });
  }

  jwt.verify(token, JWT_CONFIG.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        error: 'Token inválido ou expirado',
        code: err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN'
      });
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role || 'user'
    };
    next();
  });
};

export default authenticateToken;