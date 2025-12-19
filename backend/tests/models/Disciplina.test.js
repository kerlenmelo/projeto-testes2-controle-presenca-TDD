const Disciplina = require('../models/Disciplina')

describe('Entidade de Domínio: Disciplina', () => {

  const dadosValidos = {
    nome: 'Engenharia de Software',
    cargaHoraria: 60,
    professorId: 'professor-id-123',
    descricao: 'Disciplina focada em boas práticas de desenvolvimento'
  };

  it('deve criar uma disciplina válida com os dados obrigatórios', () => {
    const disciplina = new Disciplina(dadosValidos);

    expect(disciplina.nome).toBe('Engenharia de Software');
    expect(disciplina.cargaHoraria).toBe(60);
    expect(disciplina.professorId).toBe('professor-id-123');
  });

  it('não deve permitir criação sem nome', () => {
    expect(() => {
      new Disciplina({ ...dadosValidos, nome: '' });
    }).toThrow();
  });

  it('não deve permitir carga horária menor ou igual a zero', () => {
    expect(() => {
      new Disciplina({ ...dadosValidos, cargaHoraria: 0 });
    }).toThrow();
  });

  it('não deve permitir carga horária maior que 500', () => {
    expect(() => {
      new Disciplina({ ...dadosValidos, cargaHoraria: 600 });
    }).toThrow();
  });

  it('não deve permitir carga horária não inteira', () => {
    expect(() => {
      new Disciplina({ ...dadosValidos, cargaHoraria: 40.5 });
    }).toThrow();
  });

  it('não deve permitir criação sem professor responsável', () => {
    expect(() => {
      new Disciplina({ ...dadosValidos, professorId: null });
    }).toThrow();
  });

  it('não deve permitir descrição com mais de 500 caracteres', () => {
    const descricaoLonga = 'a'.repeat(501);

    expect(() => {
      new Disciplina({ ...dadosValidos, descricao: descricaoLonga });
    }).toThrow();
  });

});
