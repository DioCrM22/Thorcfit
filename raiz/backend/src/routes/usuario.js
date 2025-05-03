// em src/routes/usuario.js
router.get('/:id', authMiddleware, async (req, res) => {
    try {
      const [rows] = await db.query(
        'SELECT id_usuario, nome, email, foto_perfil FROM usuario WHERE id_usuario = ?',
        [req.params.id]
      );
  
      if (!rows.length) return res.status(404).json({ error: 'Usuário não encontrado' });
  
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
  });
  