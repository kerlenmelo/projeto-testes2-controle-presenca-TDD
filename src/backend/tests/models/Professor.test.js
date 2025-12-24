const Professor = require('../../models/Professor');

describe('Entidade de Domínio: Professor', () => {
  const dadosValidos = {
    nome: 'Maria',
    cpf: '12345678901',
    email: 'maria@teste.com',
    telefone: '81999999999',
    senha: '123456'
  };

  it('deve criar professor válido', () => {
    const professor = new Professor(dadosValidos);

    expect(professor.nome).toBe('Maria');
    expect(professor.cpf).toBe('12345678901');
    expect(professor.role).toBe('Professor');
  });
});
