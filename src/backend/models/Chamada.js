class Chamada {
  constructor(dados) {
    const { disciplinaId, alunoId, professorId, data } = dados;

    if (!disciplinaId) throw new Error('Disciplina inválida');
    if (!alunoId) throw new Error('Aluno inválido');
    if (!professorId) throw new Error('Professor inválido');
    if (!data) throw new Error('Data inválida');

    this.disciplinaId = disciplinaId;
    this.alunoId = alunoId;
    this.professorId = professorId;
    this.data = data;
    this.status = 'Ausente';
  }

  marcarPresenca() {
    this.status = 'Presente';
  }

  marcarAusencia() {
    this.status = 'Ausente';
  }

  setStatus(status) {
    if (!['Presente', 'Ausente'].includes(status)) {
      throw new Error('Status inválido');
    }
    this.status = status;
  }
}

module.exports = Chamada;
