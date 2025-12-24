const DisciplinaService = require('../../services/DisciplinaService');
const DisciplinaRepository = require('../../repositories/DisciplinaRepository');

jest.mock('../../repositories/DisciplinaRepository');

jest.setTimeout(10000);

describe('DisciplinaService (RED)', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = DisciplinaService;
  });

  it('deve criar uma disciplina válida', async () => {
    DisciplinaRepository.create.mockImplementation(async data => data);

    const disciplina = await service.criar({
      nome: 'Engenharia de Software',
      cargaHoraria: 60,
      professorId: 'prof-1'
    });

    expect(disciplina.nome).toBe('Engenharia de Software');
  });

  it('não deve permitir duas disciplinas com o mesmo nome', async () => {
    DisciplinaRepository.create.mockRejectedValue(
      new Error('Disciplina duplicada')
    );

    await expect(
      service.criar({
        nome: 'Engenharia de Software',
        cargaHoraria: 80,
        professorId: 'prof-2'
      })
    ).rejects.toThrow();
  });
});
