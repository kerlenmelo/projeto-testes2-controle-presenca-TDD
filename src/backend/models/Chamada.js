class Chamada {
  constructor({ alunoId, disciplinaId, professorId, data, status }) {
    if (!alunoId) {
      throw new Error('Aluno é obrigatório');
    }

    if (!disciplinaId) {
      throw new Error('Disciplina é obrigatória');
    }

    if (!professorId) {
      throw new Error('Professor é obrigatório');
    }

    const dataConvertida = new Date(data);
    if (isNaN(dataConvertida.getTime())) {
      throw new Error('Data da chamada inválida');
    }
    dataConvertida.setHours(0, 0, 0, 0);
    this.data = dataConvertida;

    if (!['Presente', 'Ausente'].includes(status)) {
      throw new Error('Status inválido');
    }

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.professorId = professorId;
    this.data = new Date(data);
    this.status = status;
  }
}

module.exports = Chamada;
