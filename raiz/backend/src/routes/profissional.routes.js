const express = require('express');
const router = express.Router();
const controller = require('../controllers/profissional.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../utils/validators.util');

router.post('/vincular',
  auth.authorizeProfessional,
  validate.vincularProfissional,
  controller.vincularUsuario
);

router.get('/clientes',
  auth.authorizeProfessional,
  controller.listarClientes
);

module.exports = router;