const ChamadaService = require('../../services/ChamadaService');

jest.mock('../../repositories/ChamadaRepository', () => ({
  findByDisciplinaAndData: jest.fn()
}));

jest.mock('../../repositories/AlunoDisciplinaRepository', () => ({
  findByDisciplina: jest.fn()
}));

const ChamadaRepository = require('../../repositories/ChamadaRepository');
const AlunoDisciplinaRepository = require('../../repositories/AlunoDisciplinaRepository');

jest.setTimeout(10000);

describe('ChamadaService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = ChamadaService;
  });

  it('deve listar chamada completa com presentes e ausentes', async () => {
    AlunoDisciplinaRepository.findByDisciplina.mockResolvedValue([
      { alunoId: { _id: 'aluno-1', nome: 'Aluno 1' } },
      { alunoId: { _id: 'aluno-2', nome: 'Aluno 2' } }
    ]);

    ChamadaRepository.findByDisciplinaAndData.mockResolvedValue([
      { alunoId: { _id: 'aluno-1' }, status: 'Presente' }
    ]);

    const resultado = await service.listarChamadaCompleta(
      'disc-1',
      '2025-01-01'
    );

    expect(resultado).toHaveLength(2);
    expect(resultado[0].status).toBe('Presente');
    expect(resultado[1].status).toBe('Ausente');
  });
});
