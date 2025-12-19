const ChamadaRepository = require('../repositories/ChamadaRepository');
const AlunoDisciplinaRepository = require('../repositories/AlunoDisciplinaRepository');

class ChamadaService {
  constructor() {
    this.chamadaRepository = new ChamadaRepository();
    this.alunoDisciplinaRepository = new AlunoDisciplinaRepository();
  }

  async finalizarChamada({ disciplinaId, professorId, data, presencas }) {

    const chamadaExistente =
      await this.chamadaRepository.buscarPorDisciplinaEData(disciplinaId, data);

    if (chamadaExistente) {
      throw new Error('Chamada já finalizada para esta disciplina nesta data');
    }

    const matriculas =
      await this.alunoDisciplinaRepository.listarPorDisciplina(disciplinaId);


    const presencasFinal = matriculas.map(m => {
      const encontrada = presencas.find(p => p.alunoId === String(m.alunoId));

      return {
        alunoId: m.alunoId,
        status: encontrada ? encontrada.status : 'Ausente'
      };
    });

    return await this.chamadaRepository.criar({
      disciplinaId,
      professorId,
      data,
      presencas: presencasFinal,
      finalizada: true
    });
  }


  async buscarChamada(chamadaId) {
    return await this.chamadaRepository.buscarPorId(chamadaId);
  }
}

module.exports = ChamadaService;
