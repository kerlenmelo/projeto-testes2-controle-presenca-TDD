class Aluno {
  constructor({ nome, cpf, email, telefone, senha }) {
    if (!nome) throw new Error('Nome é obrigatório');
    if (!cpf || cpf.length !== 11) throw new Error('CPF inválido');
    if (!email) throw new Error('Email é obrigatório');
    if (!senha || senha.length < 6) throw new Error('Senha inválida');

    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone || null;
    this.senha = senha;
    this.role = 'Aluno';
  }
}

module.exports = Aluno;
