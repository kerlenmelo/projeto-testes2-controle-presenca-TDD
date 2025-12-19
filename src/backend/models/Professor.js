class Professor {
  constructor(dados) {
    const { nome, cpf, email, telefone, senha } = dados;

    if (!nome || nome.trim() === '') throw new Error('Nome inválido');
    if (!cpf || cpf.length !== 11) throw new Error('CPF inválido');
    if (!senha || senha.length < 6) throw new Error('Senha inválida');

    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;

    this.role = 'Professor';
  }

  async matchPassword(enteredPassword) {
    return enteredPassword === this.senha;
  }
}

module.exports = Professor;
