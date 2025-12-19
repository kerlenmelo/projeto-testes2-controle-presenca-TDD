const Chamada = require('../../models/Chamada');
describe('Entidade de Domínio: Chamada (Registro de Presença)', () => {

  const dadosValidos = {
    disciplinaId: 'disciplina-id-123',
    alunoId: 'aluno-id-456',
    professorId: 'professor-id-789',
    data: new Date('2025-01-01')
  };

  it('deve criar uma chamada válida com status Ausente por padrão', () => {
    const chamada = new Chamada(dadosValidos);

    expect(chamada.disciplinaId).toBe('disciplina-id-123');
    expect(chamada.alunoId).toBe('aluno-id-456');
    expect(chamada.professorId).toBe('professor-id-789');
    expect(chamada.status).toBe('Ausente');
  });

  it('não deve permitir criação sem aluno', () => {
    expect(() => {
      new Chamada({ ...dadosValidos, alunoId: null });
    }).toThrow();
  });

  it('não deve permitir criação sem disciplina', () => {
    expect(() => {
      new Chamada({ ...dadosValidos, disciplinaId: null });
    }).toThrow();
  });

  it('não deve permitir criação sem professor', () => {
    expect(() => {
      new Chamada({ ...dadosValidos, professorId: null });
    }).toThrow();
  });

  it('não deve permitir criação sem data', () => {
    expect(() => {
      new Chamada({ ...dadosValidos, data: null });
    }).toThrow();
  });

  it('deve permitir marcar aluno como Presente', () => {
    const chamada = new Chamada(dadosValidos);
    chamada.marcarPresenca();

    expect(chamada.status).toBe('Presente');
  });

  it('deve permitir marcar aluno como Ausente', () => {
    const chamada = new Chamada(dadosValidos);
    chamada.marcarAusencia();

    expect(chamada.status).toBe('Ausente');
  });

  it('não deve permitir status inválido', () => {
    const chamada = new Chamada(dadosValidos);

    expect(() => {
      chamada.setStatus('Invalido');
    }).toThrow();
  });

});
