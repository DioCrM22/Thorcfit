// src/config/jwt.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from './index.js';

export const sign = payload =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

export const verify = token =>
  jwt.verify(token, JWT_SECRET);
