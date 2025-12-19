class AlunoDisciplinaService {
  constructor() {
    this.matriculas = [];
  }

  async matricular({ alunoId, disciplinaId }) {
    const existe = this.matriculas.some(
      m => m.alunoId === alunoId && m.disciplinaId === disciplinaId
    );

    if (existe) {
      throw new Error('Matrícula duplicada');
    }

    const matricula = {
      alunoId,
      disciplinaId,
      status: 'ativo'
    };

    this.matriculas.push(matricula);
    return matricula;
  }
}

module.exports = AlunoDisciplinaService;
