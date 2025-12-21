const DisciplinaService = require('../services/DisciplinaService');

class DisciplinaController {
  async criar(req, res) {
    try {
      const disciplina = await DisciplinaService.criar(req.body);
      return res.status(201).json(disciplina);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listar(req, res) {
    const disciplinas = await DisciplinaService.listarTodas();
    return res.json(disciplinas);
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    const disciplina = await DisciplinaService.buscarPorId(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    return res.json(disciplina);
  }

  async listarPorProfessor(req, res) {
    const { professorId } = req.params;
    const disciplinas = await DisciplinaService.listarPorProfessor(professorId);

    return res.json(disciplinas);
  }

  async atualizar(req, res) {
    const { id } = req.params;

    try {
      const disciplina = await DisciplinaService.atualizar(id, req.body);
      return res.json(disciplina);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async remover(req, res) {
    const { id } = req.params;
    await DisciplinaService.remover(id);
    return res.status(204).send();
  }
}

module.exports = new DisciplinaController();
