const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json()); // Para interpretar JSON no body das requisições

// Configurar a conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_thorcfit',
  password: 'SUA_SENHA',
  port: 5432,
});

// Rota de teste (opcional)
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rota para inserir dados do formulário
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    // Validação simples
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }

    const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const values = [nome, email];

    const result = await pool.query(query, values);
    const novoUsuario = result.rows[0];

    res.status(201).json({ message: 'Usuário inserido com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro no servidor ao inserir usuário.' });
  }
});

// Inicia o servidor
const PORT = 3001; // Porta diferente do create-react-app (3000)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


//Página Rota de Cadastro


app.post('/api/cadastro', async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      
      // Validação simples
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
      }
  
      // INSERIR no banco
      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
      const values = [nome, email, senha];
      const result = await pool.query(query, values);
  
      // Retorna o registro criado
      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        usuario: result.rows[0]
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  });
  

  //Página Rota de Login

  
  app.post('/api/login', async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      if (!email || !senha) {
        return res.status(400).json({ error: 'Preencha email e senha' });
      }
  
      // Verifica se existe no banco
      const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
      const values = [email, senha];
      const result = await pool.query(query, values);
  
      if (result.rows.length > 0) {
        // Usuário encontrado
        return res.json({
          success: true,
          message: 'Login realizado com sucesso!',
          usuario: result.rows[0] // ou retorne só ID, se preferir
        });
      } else {
        // Usuário não encontrado
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro no servidor ao fazer login' });
    }
  });
  

//Rota de Listagem


app.get('/api/usuarios', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      return res.json(result.rows);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro no servidor ao listar usuários' });
    }
  });
  