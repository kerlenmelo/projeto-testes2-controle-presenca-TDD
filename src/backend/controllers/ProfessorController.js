const ProfessorService = require('../services/ProfessorService');

class ProfessorController {
  async criar(req, res) {
    try {
      const professor = await ProfessorService.criar(req.body);
      return res.status(201).json(professor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listar(req, res) {
    const professores = await ProfessorService.listarTodos();
    return res.json(professores);
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    const professor = await ProfessorService.buscarPorId(id);

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    return res.json(professor);
  }

  async atualizar(req, res) {
    const { id } = req.params;

    try {
      const professor = await ProfessorService.atualizar(id, req.body);
      return res.json(professor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async remover(req, res) {
    const { id } = req.params;
    await ProfessorService.remover(id);
    return res.status(204).send();
  }
}

module.exports = new ProfessorController();
