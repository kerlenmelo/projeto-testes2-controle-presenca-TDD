const express = require('express');
const DisciplinaController = require('../controllers/DisciplinaController');

const router = express.Router();

router.post('/', (req, res) => DisciplinaController.criar(req, res));
router.get('/', (req, res) => DisciplinaController.listar(req, res));
router.get('/:id', (req, res) => DisciplinaController.buscarPorId(req, res));
router.get('/professor/:professorId', (req, res) =>
  DisciplinaController.listarPorProfessor(req, res)
);
router.put('/:id', (req, res) => DisciplinaController.atualizar(req, res));
router.delete('/:id', (req, res) => DisciplinaController.remover(req, res));

module.exports = router;
