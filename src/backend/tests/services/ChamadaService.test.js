const ChamadaService = require('../../services/ChamadaService');

// Mocks dos repositories
jest.mock('../../repositories/ChamadaRepository');
jest.mock('../../repositories/AlunoDisciplinaRepository');

const ChamadaRepository = require('../../repositories/ChamadaRepository');
const AlunoDisciplinaRepository = require('../../repositories/AlunoDisciplinaRepository');

describe('ChamadaService', () => {
  let service;

  beforeEach(() => {
    ChamadaRepository.mockClear();
    AlunoDisciplinaRepository.mockClear();

    ChamadaRepository.mockImplementation(() => ({
      buscarPorDisciplinaEData: jest.fn(),
      criar: jest.fn()
    }));

    AlunoDisciplinaRepository.mockImplementation(() => ({
      listarPorDisciplina: jest.fn()
    }));

    service = new ChamadaService();
  });

  it('deve finalizar uma chamada com sucesso', async () => {
    service.chamadaRepository.buscarPorDisciplinaEData.mockResolvedValue(null);

    service.alunoDisciplinaRepository.listarPorDisciplina.mockResolvedValue([
      { alunoId: 'aluno-1' },
      { alunoId: 'aluno-2' }
    ]);

    service.chamadaRepository.criar.mockImplementation(dados => dados);

    const chamada = await service.finalizarChamada({
      disciplinaId: 'disc-1',
      professorId: 'prof-1',
      data: '2025-01-01',
      presencas: [{ alunoId: 'aluno-1', status: 'Presente' }]
    });

    expect(chamada.finalizada).toBe(true);
    expect(chamada.presencas).toHaveLength(2);

    const aluno1 = chamada.presencas.find(p => p.alunoId === 'aluno-1');
    const aluno2 = chamada.presencas.find(p => p.alunoId === 'aluno-2');

    expect(aluno1.status).toBe('Presente');
    expect(aluno2.status).toBe('Ausente');
  });

  it('não deve permitir finalizar chamada duplicada para mesma disciplina e data', async () => {
    service.chamadaRepository.buscarPorDisciplinaEData.mockResolvedValue({
      id: 'chamada-existente'
    });

    await expect(
      service.finalizarChamada({
        disciplinaId: 'disc-1',
        professorId: 'prof-1',
        data: '2025-01-01',
        presencas: []
      })
    ).rejects.toThrow('Chamada já finalizada');
  });
});
