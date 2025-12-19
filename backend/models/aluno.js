class Aluno {
  constructor(dados) {
    const {
      nome,
      endereco,
      dataNascimento,
      cpf,
      matricula,
      telefone,
      email,
      curso,
      senha
    } = dados;

    // Validações mínimas exigidas pelos testes
    if (!nome || nome.trim() === '') {
      throw new Error('Nome inválido');
    }

    if (!senha || senha.length < 6) {
      throw new Error('Senha inválida');
    }

    if (!cpf || cpf.length !== 11) {
      throw new Error('CPF inválido');
    }

    // Atribuições
    this.nome = nome;
    this.endereco = endereco;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.matricula = matricula;
    this.telefone = telefone;
    this.email = email;
    this.curso = curso;

    //GREEN: senha em texto puro 
    this.senha = senha;

    // Valor padrão exigido pelos testes
    this.role = 'Aluno';
  }

  // Método exigido pelos testes
  async matchPassword(enteredPassword) {
    return enteredPassword === this.senha;
  }
}

module.exports = Aluno;