// src/app.js
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import { db } from './config/database.js'; // Importação adicionada para verificação

const app = express();

// Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers de segurança
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// Rotas
app.use('/api', authRouter);

// Rota de saúde para verificar o servidor e banco
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ 
      status: 'UP',
      database: 'CONNECTED'
    });
  } catch (err) {
    res.status(500).json({
      status: 'UP',
      database: 'DISCONNECTED',
      error: err.message
    });
  }
});

app._router.stack.forEach((r) => {
  if (r.route?.path) {
    console.log(`Rota registrada: ${r.route.path}`);
  }
});

export default app;