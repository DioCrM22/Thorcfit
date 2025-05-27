import app from './app.js';
import { db } from './config/database.js';

const port = process.env.PORT || 5000;

db.getConnection()
  .then(conn => {
    conn.release();
    app.listen(port, () => {
      console.log(`✅ Servidor rodando na porta ${port}`);
      console.log(`🛡️  CORS configurado para: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });
  })
  .catch(err => {
    console.error('❌ Falha na conexão com o banco:', err);
    process.exit(1);
  });