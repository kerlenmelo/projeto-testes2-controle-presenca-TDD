const mongoose = require('mongoose');
const AlunoDisciplinaService = require('../../services/AlunoDisciplinaService');
const AlunoDisciplinaRepository = require('../../repositories/AlunoDisciplinaRepository');

jest.mock('../../repositories/AlunoDisciplinaRepository');

describe('AlunoDisciplinaService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = AlunoDisciplinaService;

    service._alunoId = new mongoose.Types.ObjectId().toString();
    service._disciplinaId = new mongoose.Types.ObjectId().toString();
  });

  it('deve matricular aluno em disciplina', async () => {
    AlunoDisciplinaRepository.create.mockResolvedValue({
      alunoId: service._alunoId,
      disciplinaId: service._disciplinaId,
      status: 'Ativo'
    });

    const matricula = await service.matricular({
      alunoId: service._alunoId,
      disciplinaId: service._disciplinaId
    });

    expect(matricula.status).toBe('Ativo');
  });
});
