class Disciplina {
  constructor({ nome, cargaHoraria, professorId, descricao }) {
    if (!nome) throw new Error('Nome da disciplina é obrigatório');
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
      throw new Error('Carga horária inválida');
    }
    if (!professorId) throw new Error('Professor é obrigatório');

    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.professorId = professorId;
    this.descricao = descricao || null;
  }
}

module.exports = Disciplina;
