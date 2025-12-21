const express = require('express');
const AlunoController = require('../controllers/AlunoController');

const router = express.Router();

router.post('/', (req, res) => AlunoController.criar(req, res));
router.get('/', (req, res) => AlunoController.listar(req, res));
router.get('/:id', (req, res) => AlunoController.buscarPorId(req, res));
router.get('/:alunoId/disciplinas', (req, res) =>
  AlunoController.listarDisciplinas(req, res)
);
router.put('/:id', (req, res) => AlunoController.atualizar(req, res));
router.delete('/:id', (req, res) => AlunoController.remover(req, res));

module.exports = router;
