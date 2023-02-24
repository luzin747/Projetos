const express = require('express');

const router = express.Router();

const Usuario = require('../controller/usuarioController')
const Motorista = require('../controller/motoristaController')
const Veiculo = require('../controller/veiculosController')
const Operacao = require('../controller/operacaoController')
const Manutencao = require('../controller/manutencoesController')

router.post('/usuarios', Usuario.create)
router.get('/usuarios', Usuario.read)
router.post('/usuarios/login', Usuario.login)
router.put('/usuarios/:id', Usuario.update);
router.delete('/usuarios/delete/:id', Usuario.remover)

router.post('/motorista', Motorista.create);
router.get('/motorista', Motorista.read);
router.put('/motorista/:id_motorista', Motorista.update);
router.delete('/motorista/:id_motorista', Motorista.deletar);

router.post('/veiculo', Veiculo.create);
router.get('/veiculo', Veiculo.read);
router.put('/veiculos/:id_veiculo', Veiculo.update);
router.delete('/veiculos/:id_veiculo', Veiculo.deletar);

router.post('/manutencao', Manutencao.create);
router.get('/manutencao', Manutencao.read);
router.put('/manutencao/:id_manutencao', Manutencao.update);
router.delete('/manutencao/:id_manutencao', Manutencao.deletar);

router.post('/operacao', Operacao.create);
router.get('/operacao', Operacao.read);
router.put('/operacao/:id_operacao', Operacao.update);
router.delete('/operacao/:id_operacao', Operacao.deletar);

module.exports = router;