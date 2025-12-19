class AlunoDisciplina {
  constructor(dados) {
    const { alunoId, disciplinaId } = dados;

    if (!alunoId) throw new Error('Aluno inválido');
    if (!disciplinaId) throw new Error('Disciplina inválida');

    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.status = 'ativo';
    this.dataMatricula = new Date();
    this.nota = undefined;
  }

  setStatus(status) {
    const validos = ['ativo', 'concluido', 'cancelado'];
    if (!validos.includes(status)) throw new Error('Status inválido');
    this.status = status;
  }

  setNota(nota) {
    if (nota < 0 || nota > 10) throw new Error('Nota inválida');
    this.nota = nota;
  }
}

module.exports = AlunoDisciplina;
