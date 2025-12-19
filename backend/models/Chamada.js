class Chamada {
  constructor(dados) {
    const { disciplinaId, alunoId, professorId, data } = dados;

    // Validações mínimas exigidas pelos testes
    if (!disciplinaId) {
      throw new Error('Disciplina inválida');
    }

    if (!alunoId) {
      throw new Error('Aluno inválido');
    }

    if (!professorId) {
      throw new Error('Professor inválido');
    }

    if (!data) {
      throw new Error('Data inválida');
    }

    this.disciplinaId = disciplinaId;
    this.alunoId = alunoId;
    this.professorId = professorId;
    this.data = data;

    // Valor padrão exigido pelos testes
    this.status = 'Ausente';
  }

  marcarPresenca() {
    this.status = 'Presente';
  }

  marcarAusencia() {
    this.status = 'Ausente';
  }

  setStatus(status) {
    const statusValidos = ['Presente', 'Ausente'];

    if (!statusValidos.includes(status)) {
      throw new Error('Status inválido');
    }

    this.status = status;
  }
}

module.exports = Chamada;