class DisciplinaService {
  constructor() {
    this.disciplinas = [];
  }

  async criar(dados) {
    if (this.disciplinas.some(d => d.nome === dados.nome)) {
      throw new Error('Disciplina duplicada');
    }

    this.disciplinas.push(dados);
    return dados;
  }
}

module.exports = DisciplinaService;
