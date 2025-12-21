const AlunoDisciplina = require('../models/AlunoDisciplina');
const AlunoDisciplinaRepository = require('../repositories/AlunoDisciplinaRepository');

class AlunoDisciplinaService {
  async matricular(dados) {
    const matricula = new AlunoDisciplina(dados);
    return AlunoDisciplinaRepository.create(matricula);
  }

  async listarPorAluno(alunoId) {
    return AlunoDisciplinaRepository.findByAluno(alunoId);
  }

  async listarPorDisciplina(disciplinaId) {
    return AlunoDisciplinaRepository.findByDisciplina(disciplinaId);
  }

  async desmatricular(alunoId, disciplinaId) {
    return AlunoDisciplinaRepository.delete(alunoId, disciplinaId);
  }
}

module.exports = new AlunoDisciplinaService();
