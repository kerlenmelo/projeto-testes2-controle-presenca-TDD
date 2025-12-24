const ProfessorService = require('../../services/ProfessorService');
const ProfessorRepository = require('../../repositories/ProfessorRepository');

jest.mock('../../repositories/ProfessorRepository');

jest.setTimeout(10000);

describe('ProfessorService (RED)', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = ProfessorService;
  });

  it('deve criar um professor válido', async () => {
    ProfessorRepository.findByCpf.mockResolvedValue(null);
    ProfessorRepository.create.mockImplementation(async data => data);

    const professor = await service.criar({
      nome: 'Maria',
      cpf: '12345678901',
      email: 'teste@professor.com.br',
      senha: '123456'
    });

    expect(professor.role).toBe('Professor');
  });

  it('não deve permitir CPF duplicado', async () => {
    ProfessorRepository.findByCpf.mockResolvedValue({ cpf: '12345678901' });

    await expect(
      service.criar({
        nome: 'Outra',
        cpf: '12345678901',
        email: 'teste@professor.com.br',
        senha: 'abcdef'
      })
    ).rejects.toThrow();
  });
});
