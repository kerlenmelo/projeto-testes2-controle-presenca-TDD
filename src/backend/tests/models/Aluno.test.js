const Aluno = require('../../models/Aluno');

describe('Entidade de Domínio: Aluno', () => {
  const dadosValidos = {
    nome: 'João',
    cpf: '12345678901',
    email: 'joao@email.com',
    telefone: '81999999999',
    senha: '123456'
  };

  it('deve criar aluno válido', () => {
    const aluno = new Aluno(dadosValidos);

    expect(aluno.nome).toBe('João');
    expect(aluno.cpf).toBe('12345678901');
    expect(aluno.role).toBe('Aluno');
  });

  it('não deve permitir CPF inválido', () => {
    expect(() => {
      new Aluno({ ...dadosValidos, cpf: '123' });
    }).toThrow();
  });
});
