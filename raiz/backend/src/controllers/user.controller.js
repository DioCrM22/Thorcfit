const pool = require('../config/database');
const security = require('../utils/security.util');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const result = await pool.query(
        'SELECT id, nome, email, created_at FROM usuarios WHERE id = $1',
        [userId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const { nome, senha } = req.body;

      const updateFields = [];
      const values = [userId];
      let query = 'UPDATE usuarios SET ';

      if (nome) {
        updateFields.push(`nome = $${values.push(nome)}`);
      }

      if (senha) {
        const hashedPassword = await security.hashPassword(senha);
        updateFields.push(`senha = $${values.push(hashedPassword)}`);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo para atualizar' });
      }

      query += updateFields.join(', ') + ' WHERE id = $1 RETURNING *';

      const result = await pool.query(query, values);
      
      res.json({
        message: 'Usuário atualizado com sucesso',
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.user.id;
      
      await pool.query('DELETE FROM usuarios WHERE id = $1', [userId]);
      
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const result = await pool.query(
        'SELECT id, nome, email, created_at FROM usuarios WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
};