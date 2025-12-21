const Disciplina = require('../models/Disciplina');
const DisciplinaRepository = require('../repositories/DisciplinaRepository');

class DisciplinaService {
  async criar(dados) {
    const disciplina = new Disciplina(dados);
    return DisciplinaRepository.create(disciplina);
  }

  async listarTodas() {
    return DisciplinaRepository.findAll();
  }

  async buscarPorId(id) {
    return DisciplinaRepository.findById(id);
  }

  async listarPorProfessor(professorId) {
    return DisciplinaRepository.findByProfessor(professorId);
  }

  async atualizar(id, dados) {
    return DisciplinaRepository.update(id, dados);
  }

  async remover(id) {
    return DisciplinaRepository.delete(id);
  }
}

module.exports = new DisciplinaService();
