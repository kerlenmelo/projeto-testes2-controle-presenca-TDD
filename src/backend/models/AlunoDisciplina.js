class AlunoDisciplina {
  constructor({ alunoId, disciplinaId, status }) {
    if (!alunoId) throw new Error('Aluno é obrigatório');
    if (!disciplinaId) throw new Error('Disciplina é obrigatória');

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.status = status || 'Ativo';
    this.dataMatricula = new Date();
  }
}

module.exports = AlunoDisciplina;
