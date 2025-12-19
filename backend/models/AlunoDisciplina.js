class AlunoDisciplina {
  constructor(dados) {
    const { alunoId, disciplinaId } = dados;

    // Validações mínimas exigidas pelos testes
    if (!alunoId) {
      throw new Error('Aluno inválido');
    }

    if (!disciplinaId) {
      throw new Error('Disciplina inválida');
    }

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;

    // Valores padrão exigidos pelos testes
    this.status = 'ativo';
    this.dataMatricula = new Date();
    this.nota = undefined;
  }

  setStatus(status) {
    const statusValidos = ['ativo', 'concluido', 'cancelado'];

    if (!statusValidos.includes(status)) {
      throw new Error('Status inválido');
    }

    this.status = status;
  }

  setNota(nota) {
    if (nota < 0 || nota > 10) {
      throw new Error('Nota inválida');
    }

    this.nota = nota;
  }
}

module.exports = AlunoDisciplina;