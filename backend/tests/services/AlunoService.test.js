const AlunoService = require('../../services/AlunoService');

describe('AlunoService (RED)', () => {

  it('deve criar um aluno válido', async () => {
    const service = new AlunoService();

    const aluno = await service.criar({
      nome: 'João',
      cpf: '12345678901',
      senha: '123456'
    });

    expect(aluno.nome).toBe('João');
  });

  it('não deve permitir dois alunos com o mesmo CPF', async () => {
    const service = new AlunoService();

    await service.criar({
      nome: 'João',
      cpf: '12345678901',
      senha: '123456'
    });

    await expect(
      service.criar({
        nome: 'Maria',
        cpf: '12345678901',
        senha: '654321'
      })
    ).rejects.toThrow();
  });

});
