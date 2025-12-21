class Chamada {
  constructor({ alunoId, disciplinaId, professorId, data, status }) {
    if (!alunoId) throw new Error('Aluno é obrigatório');
    if (!disciplinaId) throw new Error('Disciplina é obrigatória');
    if (!professorId) throw new Error('Professor é obrigatório');
    if (!data) throw new Error('Data é obrigatória');

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.professorId = professorId;
    this.data = new Date(data);
    this.status = status || 'Ausente';
  }
}

module.exports = Chamada;
