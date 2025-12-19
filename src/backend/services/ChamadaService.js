class ChamadaService {
  constructor() {
    this.chamadas = [];
  }

  async registrar(dados) {
    const existe = this.chamadas.some(
      c =>
        c.alunoId === dados.alunoId &&
        c.disciplinaId === dados.disciplinaId &&
        c.data === dados.data
    );

    if (existe) {
      throw new Error('Chamada duplicada');
    }

    this.chamadas.push(dados);
    return dados;
  }
}

module.exports = ChamadaService;
