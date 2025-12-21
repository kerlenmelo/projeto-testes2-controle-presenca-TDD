const Chamada = require('../models/Chamada');
const ChamadaRepository = require('../repositories/ChamadaRepository');

class ChamadaService {
  /**
   * Registra a presença de UM aluno
   */
  async registrar(dados) {
    const dataNormalizada = new Date(dados.data);
    dataNormalizada.setHours(0, 0, 0, 0);

    const chamadaExistente = await ChamadaRepository.findOne({
      alunoId: dados.alunoId,
      disciplinaId: dados.disciplinaId,
      data: dataNormalizada,
    });

    if (chamadaExistente) {
      throw new Error('Chamada já registrada para este aluno nesta data');
    }

    const chamada = new Chamada({
      ...dados,
      data: dataNormalizada,
    });

    return ChamadaRepository.create(chamada);
  }

  async listarPorDisciplinaEData(disciplinaId, data) {
    return ChamadaRepository.findByDisciplinaAndData(disciplinaId, data);
  }

  async listarPorAluno(alunoId) {
    return ChamadaRepository.findByAluno(alunoId);
  }

  async listarChamadaCompleta(disciplinaId, data) {
    const dataNormalizada = new Date(data);
    dataNormalizada.setHours(0, 0, 0, 0);

    // 1. Buscar todos os alunos matriculados na disciplina
    const matriculas = await AlunoDisciplinaRepository.findByDisciplina(
      disciplinaId
    );

    // 2. Buscar chamadas já registradas nessa data
    const chamadas = await ChamadaRepository.findByDisciplinaAndData(
      disciplinaId,
      dataNormalizada
    );

    // 3. Mapear lista final
    return matriculas.map((matricula) => {
      const chamadaAluno = chamadas.find(
        (c) => String(c.alunoId._id) === String(matricula.alunoId._id)
      );

      return {
        aluno: matricula.alunoId,
        status: chamadaAluno ? chamadaAluno.status : 'Ausente',
      };
    });
  }
}

module.exports = new ChamadaService();
