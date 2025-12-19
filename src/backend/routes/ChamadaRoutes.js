const express = require('express');
const ChamadaController = require('../controllers/ChamadaController');

const router = express.Router();

// Finalizar chamada (criação)
router.post('/', (req, res) =>
  ChamadaController.finalizar(req, res)
);

// Buscar chamada (somente leitura)
router.get('/:id', (req, res) =>
  ChamadaController.buscarPorId(req, res)
);

module.exports = router;
