require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/database');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');


const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'connected'
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});