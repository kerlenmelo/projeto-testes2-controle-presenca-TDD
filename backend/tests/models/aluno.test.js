const Aluno = require('../models/Aluno')
describe('Entidade de Domínio: Aluno', () => {

  const dadosValidos = {
    nome: 'João da Silva',
    endereco: 'Rua das Flores, 123',
    dataNascimento: new Date('2000-01-01'),
    cpf: '12345678901',
    matricula: '20230001',
    telefone: '81999999999',
    email: 'joao@email.com',
    curso: 'Sistemas de Informação',
    senha: '123456'
  };

  it('deve criar um aluno válido com os dados obrigatórios', () => {
    const aluno = new Aluno(dadosValidos);

    expect(aluno.nome).toBe('João da Silva');
    expect(aluno.cpf).toBe('12345678901');
    expect(aluno.role).toBe('Aluno'); 
  });

  it('não deve permitir criação sem nome', () => {
    expect(() => {
      new Aluno({ ...dadosValidos, nome: '' });
    }).toThrow();
  });

  it('não deve permitir senha com menos de 6 caracteres', () => {
    expect(() => {
      new Aluno({ ...dadosValidos, senha: '123' });
    }).toThrow();
  });

  it('não deve permitir CPF com tamanho diferente de 11 caracteres', () => {
    expect(() => {
      new Aluno({ ...dadosValidos, cpf: '123' });
    }).toThrow();
  });

  it('deve inicializar o role como Aluno por padrão', () => {
    const aluno = new Aluno(dadosValidos);
    expect(aluno.role).toBe('Aluno');
  });

  it('deve permitir validar a senha corretamente', async () => {
    const aluno = new Aluno(dadosValidos);

    const senhaCorreta = await aluno.matchPassword('123456');
    const senhaIncorreta = await aluno.matchPassword('senhaErrada');

    expect(senhaCorreta).toBe(true);
    expect(senhaIncorreta).toBe(false);
  });

});
