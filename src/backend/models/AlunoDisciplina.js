class AlunoDisciplina {
  constructor({ alunoId, disciplinaId }) {
    if (!alunoId) {
      throw new Error('Aluno é obrigatório');
    }

    if (!disciplinaId) {
      throw new Error('Disciplina é obrigatória');
    }

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.status = 'Ativo';
    this.dataMatricula = new Date();
  }
}

module.exports = AlunoDisciplina;
