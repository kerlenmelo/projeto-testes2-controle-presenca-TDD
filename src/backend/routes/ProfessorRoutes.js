const express = require('express');
const ProfessorController = require('../controllers/ProfessorController');

const router = express.Router();

router.post('/', (req, res) => ProfessorController.criar(req, res));
router.get('/', (req, res) => ProfessorController.listar(req, res));
router.get('/:id', (req, res) => ProfessorController.buscarPorId(req, res));
router.put('/:id', (req, res) => ProfessorController.atualizar(req, res));
router.delete('/:id', (req, res) => ProfessorController.remover(req, res));

module.exports = router;
