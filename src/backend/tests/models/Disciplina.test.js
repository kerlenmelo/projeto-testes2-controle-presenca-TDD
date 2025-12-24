const Disciplina = require('../../models/Disciplina');

describe('Entidade de Domínio: Disciplina', () => {
  const dadosValidos = {
    nome: 'Engenharia de Software',
    cargaHoraria: 60,
    professorId: 'prof-1',
    descricao: 'Disciplina teste'
  };

  it('deve criar disciplina válida', () => {
    const disciplina = new Disciplina(dadosValidos);

    expect(disciplina.nome).toBe('Engenharia de Software');
    expect(disciplina.cargaHoraria).toBe(60);
    expect(disciplina.professorId).toBe('prof-1');
  });
});
