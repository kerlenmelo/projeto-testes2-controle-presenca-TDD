const Chamada = require('../../models/Chamada');

describe('Entidade de Domínio: Chamada', () => {
  const dadosBase = {
    alunoId: 'aluno-1',
    disciplinaId: 'disc-1',
    professorId: 'prof-1',
    data: new Date('2025-01-01')
  };

  it('deve criar chamada com status Presente', () => {
    const chamada = new Chamada({
      ...dadosBase,
      status: 'Presente'
    });

    expect(chamada.status).toBe('Presente');
  });

  it('deve criar chamada com status Ausente', () => {
    const chamada = new Chamada({
      ...dadosBase,
      status: 'Ausente'
    });

    expect(chamada.status).toBe('Ausente');
  });

  it('não deve permitir status inválido', () => {
    expect(() => {
      new Chamada({
        ...dadosBase,
        status: 'Invalido'
      });
    }).toThrow();
  });
});
