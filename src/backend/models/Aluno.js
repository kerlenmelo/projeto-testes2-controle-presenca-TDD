class Aluno {
  constructor({ nome, cpf, email, telefone, senha }) {
    if (!nome || nome.trim().length < 3) {
      throw new Error('Nome do aluno inválido');
    }

    if (typeof cpf !== 'string' || cpf.length !== 11) {
      throw new Error('CPF inválido');
    }

    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (!senha || senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone || null;
    this.senha = senha;
    this.role = 'Aluno';
  }
}

module.exports = Aluno;
