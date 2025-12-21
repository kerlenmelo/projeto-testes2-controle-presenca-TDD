class Disciplina {
  constructor({ nome, cargaHoraria, professorId, descricao }) {
    if (!nome || nome.trim().length < 3) {
      throw new Error('Nome da disciplina inválido');
    }

    if (!cargaHoraria || cargaHoraria <= 0) {
      throw new Error('Carga horária inválida');
    }

    if (!professorId) {
      throw new Error('Professor responsável é obrigatório');
    }

    this.nome = nome;
    this.cargaHoraria = cargaHoraria;
    this.professorId = professorId;
    this.descricao = descricao || null;
  }
}

module.exports = Disciplina;
