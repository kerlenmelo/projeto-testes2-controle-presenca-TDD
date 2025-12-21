const Professor = require('../models/Professor');
const ProfessorRepository = require('../repositories/ProfessorRepository');

class ProfessorService {
  async criar(dados) {
    const professorExistente = await ProfessorRepository.findByCpf(dados.cpf);
    if (professorExistente) {
      throw new Error('CPF já cadastrado');
    }

    const professor = new Professor(dados);
    return ProfessorRepository.create(professor);
  }

  async listarTodos() {
    return ProfessorRepository.findAll();
  }

  async buscarPorId(id) {
    return ProfessorRepository.findById(id);
  }

  async atualizar(id, dados) {
    return ProfessorRepository.update(id, dados);
  }

  async remover(id) {
    return ProfessorRepository.delete(id);
  }
}

module.exports = new ProfessorService();
