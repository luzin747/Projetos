const express = require('express');

const router = express.Router();

const Usuario = require('../controller/usuarioController')

router.post('/usuarios', Usuario.create)
router.get('/usuarios', Usuario.read)
router.post('/usuarios/login', Usuario.login)
router.delete('/delete/:id', Usuario.remover)

module.exports = router;