const express = require('express');
const ChamadaController = require('../controllers/ChamadaController');

const router = express.Router();

/**
 * Registrar presença/ausência de um aluno
 */
router.post('/', (req, res) => ChamadaController.registrar(req, res));

/**
 * Abrir lista de chamada de uma disciplina por data
 * Ex: /disciplinas/:disciplinaId/chamadas?data=2025-01-10
 */
router.get('/disciplina/:disciplinaId', (req, res) =>
  ChamadaController.listarPorDisciplinaEData(req, res)
);

/**
 * Histórico de chamadas de um aluno
 */
router.get('/aluno/:alunoId', (req, res) =>
  ChamadaController.listarPorAluno(req, res)
);

/**
 * Lista completa da chamada (todos matriculados)
 */
router.get('/disciplina/:disciplinaId/completa', (req, res) =>
  ChamadaController.listarChamadaCompleta(req, res)
);

module.exports = router;
