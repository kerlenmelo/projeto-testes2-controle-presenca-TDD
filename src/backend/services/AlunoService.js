class AlunoService {
  constructor() {
    this.alunos = [];
  }

  async criar(dados) {
    if (this.alunos.some(a => a.cpf === dados.cpf)) {
      throw new Error('CPF duplicado');
    }

    this.alunos.push(dados);
    return dados;
  }
}

module.exports = AlunoService;
