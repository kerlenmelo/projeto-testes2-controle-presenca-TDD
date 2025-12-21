const Aluno = require('../models/Aluno');
const AlunoRepository = require('../repositories/AlunoRepository');
const AlunoDisciplinaRepository = require('../repositories/AlunoDisciplinaRepository');

class AlunoService {
  async criar(dados) {
    const alunoExistente = await AlunoRepository.findByCpf(dados.cpf);
    if (alunoExistente) {
      throw new Error('CPF já cadastrado');
    }

    const aluno = new Aluno({ ...dados, cpf: dados.cpf ?? alunoAtual.cpf });
    return AlunoRepository.create(aluno);
  }

  async listarTodos() {
    return AlunoRepository.findAll();
  }

  async listarDisciplinas(alunoId) {
    const matriculas = await AlunoDisciplinaRepository.findByAluno(alunoId);

    return matriculas.map((m) => m.disciplinaId);
  }

  async buscarPorId(id) {
    return AlunoRepository.findById(id);
  }

  async atualizar(id, dados) {
    return AlunoRepository.update(id, dados);
  }

  async remover(id) {
    return AlunoRepository.delete(id);
  }
}

module.exports = new AlunoService();
