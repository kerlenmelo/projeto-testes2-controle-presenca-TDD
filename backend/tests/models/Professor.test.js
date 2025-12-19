describe('Entidade de Domínio: Professor', () => {

  const dadosValidos = {
    nome: 'Maria Oliveira',
    cpf: '12345678901',
    email: 'maria@instituicao.edu.br',
    telefone: '81999999999',
    senha: '123456'
  };

  it('deve criar um professor válido com os dados obrigatórios', () => {
    const professor = new Professor(dadosValidos);

    expect(professor.nome).toBe('Maria Oliveira');
    expect(professor.cpf).toBe('12345678901');
    expect(professor.email).toBe('maria@instituicao.edu.br');
    expect(professor.role).toBe('Professor');
  });

  it('não deve permitir criação sem nome', () => {
    expect(() => {
      new Professor({ ...dadosValidos, nome: '' });
    }).toThrow();
  });

  it('não deve permitir CPF com menos de 11 caracteres', () => {
    expect(() => {
      new Professor({ ...dadosValidos, cpf: '123' });
    }).toThrow();
  });

  it('não deve permitir senha com menos de 6 caracteres', () => {
    expect(() => {
      new Professor({ ...dadosValidos, senha: '123' });
    }).toThrow();
  });

  it('deve inicializar o role como Professor por padrão', () => {
    const professor = new Professor(dadosValidos);
    expect(professor.role).toBe('Professor');
  });

  it('deve validar corretamente a senha com matchPassword', async () => {
    const professor = new Professor(dadosValidos);

    const senhaCorreta = await professor.matchPassword('123456');
    const senhaIncorreta = await professor.matchPassword('senhaErrada');

    expect(senhaCorreta).toBe(true);
    expect(senhaIncorreta).toBe(false);
  });

});
