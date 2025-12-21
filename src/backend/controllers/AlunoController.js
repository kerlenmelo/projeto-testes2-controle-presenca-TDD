const AlunoService = require('../services/AlunoService');

class AlunoController {
  async criar(req, res) {
    try {
      const aluno = await AlunoService.criar(req.body);
      return res.status(201).json(aluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listar(req, res) {
    const alunos = await AlunoService.listarTodos();
    return res.json(alunos);
  }

  async listarDisciplinas(req, res) {
    const { alunoId } = req.params;

    try {
      const disciplinas = await AlunoService.listarDisciplinas(alunoId);

      return res.json(disciplinas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    const aluno = await AlunoService.buscarPorId(id);

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    return res.json(aluno);
  }

  async atualizar(req, res) {
    const { id } = req.params;

    try {
      const aluno = await AlunoService.atualizar(id, req.body);
      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async remover(req, res) {
    const { id } = req.params;
    await AlunoService.remover(id);
    return res.status(204).send();
  }
}

module.exports = new AlunoController();
