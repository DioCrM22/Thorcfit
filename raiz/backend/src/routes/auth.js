import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { authenticateToken } from '../routes/authenticateToken.js';
import { db } from '../config/database.js';
import { JWT_CONFIG } from '../config/index.js';
import { 
  findOrCreateGoogleUser, 
  login, 
  signup,
} from '../services/authService.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Adicione este middleware de autenticação
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        error: 'Token não fornecido ou formato inválido' 
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_CONFIG.secret);

    const [user] = await db.query(
      'SELECT id_usuario FROM usuario WHERE id_usuario = ?',
      [decoded.userId]
    );
    
    if (!user.length) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (err) {
    console.error('Erro na autenticação:', err.message);
    
    let errorMessage = 'Token inválido';
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expirado';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Token malformado';
    }

    res.status(403).json({
      success: false,
      error: errorMessage
    });
  }
};

const validateSignupData = (req, res, next) => {
  const { nome, email, senha } = req.body;
  
  const errors = {};
  if (!nome) errors.nome = 'Campo obrigatório';
  if (!email) errors.email = 'Campo obrigatório';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Formato inválido';
  if (!senha) errors.senha = 'Campo obrigatório';
  else if (senha.length < 8) errors.senha = 'Mínimo 8 caracteres';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      success: false,
      error: 'Dados inválidos',
      details: errors
    });
  }

  next();
};

// Cadastro Tradicional (atualizado)
router.post('/signup', validateSignupData, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = await signup(nome, email, senha);
    
    const token = jwt.sign(
      { userId: user.id_usuario, email: user.email },
      JWT_CONFIG.secret,
    );

    res.status(201).json({
      success: true,
      message: 'Cadastro realizado!',
      token,
      usuario: { 
        id: user.id_usuario,
        nome: user.nome, 
        email: user.email
      }
    });
    
  } catch (err) {
    console.error('Erro no cadastro:', err.stack);
    const status = err.message.includes('já está cadastrado') ? 409 : 400;
    res.status(status).json({ 
      success: false,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
});

// Login Tradicional
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Buscar usuário no banco
    const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Email não encontrado'
      });
    }

    const usuario = rows[0];

    // 2. Verificar método de login
    if (usuario.metodo_login === 'google') {
      return res.status(400).json({
        success: false,
        error: 'Este usuário deve fazer login com o Google'
      });
    }

    // 3. Validar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({
        success: false,
        error: 'Senha incorreta'
      });
    }

    // 4. Gerar token JWT
    const token = jwt.sign(
      {
        userId: usuario.id_usuario,
        email: usuario.email
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    // 5. Retornar resposta
    res.json({
      success: true,
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        metodo_login: usuario.metodo_login || 'email'
      }
    });

  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(500).json({
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});


router.get('/check-user/:email', async (req, res) => {
  try {
    const [user] = await db.query(
      'SELECT id_usuario, email, metodo_login, senha IS NOT NULL as has_password FROM usuario WHERE email = ?',
      [req.params.email]
    );
    
    if (!user.length) {
      return res.status(404).json({ exists: false });
    }
    
    res.json({
      exists: true,
      login_method: user[0].metodo_login,
      has_password: Boolean(user[0].has_password)
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/foto-perfil-base64/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT foto_perfil FROM usuario WHERE id_usuario = ?',
      [req.params.id]
    );

    if (!rows.length || !rows[0].foto_perfil) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }

    const imageBuffer = rows[0].foto_perfil;
    const base64Image = imageBuffer.toString('base64');
    const dataURI = `data:image/png;base64,${base64Image}`;

    res.json({ image: dataURI });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter foto' });
  }
});

router.post('/upload-foto', authenticate, upload.single('foto_perfil'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'Nenhuma imagem enviada' 
      });
    }

    // Processamento simplificado da imagem
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('png')
      .toBuffer();

    await db.query(
      'UPDATE usuario SET foto_perfil = ? WHERE id_usuario = ?',
      [processedImage, req.user.userId]
    );

    res.json({ 
      success: true,
      message: 'Foto atualizada com sucesso!'
    });

  } catch (err) {
    console.error('Erro no upload da foto:', {
      message: err.message,
      stack: err.stack,
      file: req.file ? {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : null
    });

    let errorMessage = 'Erro ao processar a imagem';
    if (err.message.includes('Input buffer contains unsupported image format')) {
      errorMessage = 'Formato de imagem não suportado';
    } else if (err.message.includes('parameters out of range')) {
      errorMessage = 'Imagem muito grande ou inválida';
    }

    res.status(500).json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});


// Login com Google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        error: 'Token do Google não fornecido' 
      });
    }

    // 1. Verificar token com Google
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 5000
    });

    const { sub: googleId, name, email, picture } = response.data;

    // 2. Buscar ou criar usuário
    const [user] = await db.query(
      `SELECT * FROM usuario WHERE email = ? OR google_id = ? LIMIT 1`,
      [email, googleId]
    );

    let usuario;
    if (user.length > 0) {
      // Atualizar usuário existente
      await db.query(
        `UPDATE usuario SET 
         google_id = ?, 
         foto_perfil = ?,
         metodo_login = 'google'
         WHERE id_usuario = ?`,
        [googleId, picture, user[0].id_usuario]
      );
      usuario = user[0];
    } else {
      // Criar novo usuário
      const [result] = await db.query(
        `INSERT INTO usuario 
         (nome, email, google_id, foto_perfil, metodo_login, data_cadastro)
         VALUES (?, ?, ?, ?, 'google', NOW())`,
        [name, email, googleId, picture]
      );
      
      const [newUser] = await db.query(
        `SELECT * FROM usuario WHERE id_usuario = ?`,
        [result.insertId]
      );
      usuario = newUser[0];
    }

    // 3. Gerar token JWT
    const jwtToken = jwt.sign(
      {
        userId: usuario.id_usuario,
        email: usuario.email
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    res.json({
      success: true,
      token: jwtToken,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        foto_perfil: usuario.foto_perfil,
        metodo_login: 'google'
      }
    });

  } catch (err) {
    console.error('Erro no login com Google:', err);
    
    let errorMessage = 'Falha na autenticação do Google';
    if (err.response?.status === 400) {
      errorMessage = 'Token do Google inválido';
    }

    res.status(401).json({ 
      success: false,
      error: errorMessage
    });
  }
});


router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Verifica se o e-mail existe e não é do Google
    const [user] = await db.query(
      `SELECT id_usuario FROM usuario 
       WHERE email = ? AND (metodo_login IS NULL OR metodo_login = 'email')`,
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'E-mail não encontrado ou cadastrado via Google'
      });
    }

    // 2. Se existe, prossegue com o fluxo
    res.json({
      success: true,
      message: 'Instruções enviadas para seu e-mail'
    });

  } catch (err) {
    console.error('Erro em forgot-password:', err);
    res.status(500).json({
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});

router.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validações básicas
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'E-mail e nova senha são obrigatórios'
      });
    }

    // Verifica se o usuário existe e não é do Google
    const [user] = await db.query(
      `SELECT id_usuario, senha_hash FROM usuario 
       WHERE email = ? AND (metodo_login IS NULL OR metodo_login = 'email')`,
      [email]
    );

    if (!user.length) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado ou cadastrado via Google'
      });
    }

    // Verifica se a nova senha é diferente da atual
    const isSamePassword = await bcrypt.compare(newPassword, user[0].senha_hash);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        error: 'A nova senha não pode ser igual à senha anterior'
      });
    }

    // Validação de força da senha
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'A senha deve ter pelo menos 8 caracteres'
      });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualiza no banco de dados
    await db.query(
      `UPDATE usuario SET senha_hash = ? 
       WHERE email = ? AND (metodo_login IS NULL OR metodo_login = 'email')`,
      [hashedPassword, email]
    );

    res.json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });

  } catch (err) {
    console.error('Erro no reset-password:', err);
    res.status(500).json({
      success: false,
      error: 'Erro ao redefinir senha'
    });
  }
});

// Obter perfil (GET)
router.get('/usuario-perfil', authenticate, async (req, res) => {
  try {
    const [user] = await db.query(`
      SELECT id_usuario, nome, email, data_nascimento, genero, 
             telefone, foto_perfil, altura, peso, objetivo 
      FROM usuario WHERE id_usuario = ?`,
      [req.user.userId]
    );

    if (!user.length) {
      return res.status(404).json({ success: false, error: 'Perfil não encontrado' });
    }

    res.json({ success: true, usuario: user[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro ao buscar perfil' });
  }
});

// Atualizar perfil (PUT)
router.put('/usuario-perfil', authenticate, upload.single('foto_perfil'), async (req, res) => {
  try {
    const { nome, email, data_nascimento, genero, telefone, altura, peso, objetivo } = req.body;
    const userId = req.user.userId;

    // Processar foto se foi enviada
    let fotoPerfilUpdate = '';
    if (req.file) {
      const processedImage = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('png')
        .toBuffer();
      fotoPerfilUpdate = ', foto_perfil = ?';
    }

    await db.query(
      `UPDATE usuario SET 
       nome = ?, email = ?, data_nascimento = ?, genero = ?,
       telefone = ?, altura = ?, peso = ?, objetivo = ?
       ${fotoPerfilUpdate}
       WHERE id_usuario = ?`,
      [
        nome, email, data_nascimento, genero,
        telefone, altura, peso, objetivo,
        ...(req.file ? [processedImage, userId] : [userId])
      ]
    );

    res.json({ success: true, message: 'Perfil atualizado' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar perfil' });
  }
});

router.put('/atualizar-perfil', authenticate, upload.single('foto_perfil'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateFields = {};
    
    // Campos que podem ser atualizados
    const allowedFields = [
      'nome_completo', 
      'telefone', 
      'altura_cm', 
      'peso_kg', 
      'genero', 
      'data_nascimento', 
      'objetivo'
    ];
    
    // Adicionar campos do body
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });
    
    // Processar imagem se foi enviada
    if (req.file) {
      const processedImage = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('png')
        .toBuffer();
      updateFields.foto_perfil = processedImage;
    }
    
    // Atualizar no banco de dados
    await db.query(
      `UPDATE usuario SET 
       ${Object.keys(updateFields).map(field => `${field} = ?`).join(', ')}
       WHERE id_usuario = ?`,
      [...Object.values(updateFields), userId]
    );
    
    // Buscar usuário atualizado
    const [updatedUser] = await db.query(
      `SELECT * FROM usuario WHERE id_usuario = ?`,
      [userId]
    );
    
    res.json({ 
      success: true,
      message: 'Perfil atualizado com sucesso!',
      usuarioAtualizado: {
        ...updatedUser[0],
        dataNascimento: updatedUser[0].data_nascimento,
        altura: updatedUser[0].altura_cm,
        peso: updatedUser[0].peso_kg
      }
    });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao atualizar o perfil' 
    });
  }
});



export default router;