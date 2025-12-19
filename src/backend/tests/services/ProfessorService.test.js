const ProfessorService = require('../../services/ProfessorService');

describe('ProfessorService (RED)', () => {

  it('deve criar um professor válido', async () => {
    const service = new ProfessorService();

    const professor = await service.criar({
      nome: 'Maria',
      cpf: '12345678901',
      senha: '123456'
    });

    expect(professor.role).toBe('Professor');
  });

  it('não deve permitir CPF duplicado', async () => {
    const service = new ProfessorService();

    await service.criar({
      nome: 'Maria',
      cpf: '12345678901',
      senha: '123456'
    });

    await expect(
      service.criar({
        nome: 'Outra',
        cpf: '12345678901',
        senha: 'abcdef'
      })
    ).rejects.toThrow();
  });

});
