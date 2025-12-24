const AlunoService = require('../../services/AlunoService');
const AlunoRepository = require('../../repositories/AlunoRepository');

jest.mock('../../repositories/AlunoRepository');

jest.setTimeout(10000);

describe('AlunoService (RED)', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = AlunoService;
  });

  it('deve criar um aluno válido', async () => {
    AlunoRepository.findByCpf.mockResolvedValue(null);
    AlunoRepository.create.mockImplementation(async data => data);

    const aluno = await service.criar({
      nome: 'João',
      cpf: '12345678901',
      email: 'teste@aluno.com.br',
      senha: '123456'
    });

    expect(aluno.nome).toBe('João');
  });

  it('não deve permitir dois alunos com o mesmo CPF', async () => {
    AlunoRepository.findByCpf.mockResolvedValue({ cpf: '12345678901' });

    await expect(
      service.criar({
        nome: 'Maria',
        cpf: '12345678901',
        email: 'teste@aluno.com.br',
        senha: '654321'
      })
    ).rejects.toThrow();
  });
});
