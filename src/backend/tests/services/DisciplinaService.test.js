const DisciplinaService = require('../../services/DisciplinaService');

describe('DisciplinaService (RED)', () => {

  it('deve criar uma disciplina válida', async () => {
    const service = new DisciplinaService();

    const disciplina = await service.criar({
      nome: 'Engenharia de Software',
      cargaHoraria: 60,
      professorId: 'prof-1'
    });

    expect(disciplina.nome).toBe('Engenharia de Software');
  });

  it('não deve permitir duas disciplinas com o mesmo nome', async () => {
    const service = new DisciplinaService();

    await service.criar({
      nome: 'Engenharia de Software',
      cargaHoraria: 60,
      professorId: 'prof-1'
    });

    await expect(
      service.criar({
        nome: 'Engenharia de Software',
        cargaHoraria: 80,
        professorId: 'prof-2'
      })
    ).rejects.toThrow();
  });

});
