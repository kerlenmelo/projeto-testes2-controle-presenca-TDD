class Disciplina {
  constructor(dados) {
    const { nome, cargaHoraria, professorId, descricao } = dados;

    // Validações mínimas exigidas pelos testes
    if (!nome || nome.trim() === '') {
      throw new Error('Nome inválido');
    }

    if (!Number.isInteger(cargaHoraria)) {
      throw new Error('Carga horária inválida');
    }

    if (cargaHoraria <= 0) {
      throw new Error('Carga horária inválida');
    }

    if (cargaHoraria > 500) {
      throw new Error('Carga horária inválida');
    }

    if (!professorId) {
      throw new Error('Professor inválido');
    }

    if (descricao && descricao.length > 500) {
      throw new Error('Descrição inválida');
    }

    // Atribuições
    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.professorId = professorId;
    this.descricao = descricao;
  }
}

module.exports = Disciplina;