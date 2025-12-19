class ProfessorService {
  constructor() {
    this.professores = [];
  }

  async criar(dados) {
    if (this.professores.some(p => p.cpf === dados.cpf)) {
      throw new Error('CPF duplicado');
    }

    const professor = { ...dados, role: 'Professor' };
    this.professores.push(professor);
    return professor;
  }
}

module.exports = ProfessorService;
