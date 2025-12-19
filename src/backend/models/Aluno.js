class Aluno {
  constructor() {
    throw new Error('Aluno não implementado');
  }

  async matchPassword() {
    throw new Error('Aluno.matchPassword não implementado');
  }
}

module.exports = Aluno;
