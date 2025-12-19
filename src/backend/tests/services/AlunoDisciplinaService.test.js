const AlunoDisciplinaService = require('../../services/AlunoDisciplinaService');

describe('AlunoDisciplinaService (RED)', () => {

  it('deve matricular aluno em disciplina', async () => {
    const service = new AlunoDisciplinaService();

    const matricula = await service.matricular({
      alunoId: 'aluno-1',
      disciplinaId: 'disc-1'
    });

    expect(matricula.status).toBe('ativo');
  });

  it('não deve permitir matrícula duplicada', async () => {
    const service = new AlunoDisciplinaService();

    await service.matricular({
      alunoId: 'aluno-1',
      disciplinaId: 'disc-1'
    });

    await expect(
      service.matricular({
        alunoId: 'aluno-1',
        disciplinaId: 'disc-1'
      })
    ).rejects.toThrow();
  });

});
