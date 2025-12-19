const ChamadaService = require('../../services/ChamadaService');

describe('ChamadaService (RED)', () => {

  it('deve registrar presença para um aluno em uma data', async () => {
    const service = new ChamadaService();

    const chamada = await service.registrar({
      alunoId: 'aluno-1',
      disciplinaId: 'disc-1',
      professorId: 'prof-1',
      data: '2025-01-01',
      status: 'Presente'
    });

    expect(chamada.status).toBe('Presente');
  });

  it('não deve permitir registrar presença duas vezes no mesmo dia', async () => {
    const service = new ChamadaService();

    await service.registrar({
      alunoId: 'aluno-1',
      disciplinaId: 'disc-1',
      professorId: 'prof-1',
      data: '2025-01-01',
      status: 'Presente'
    });

    await expect(
      service.registrar({
        alunoId: 'aluno-1',
        disciplinaId: 'disc-1',
        professorId: 'prof-1',
        data: '2025-01-01',
        status: 'Ausente'
      })
    ).rejects.toThrow();
  });

});
