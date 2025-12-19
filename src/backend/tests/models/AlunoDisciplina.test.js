const AlunoDisciplina = require('../../models/AlunoDisciplina');

describe('Entidade de Domínio: AlunoDisciplina', () => {

  const dadosValidos = {
    alunoId: 'aluno-id-123',
    disciplinaId: 'disciplina-id-456'
  };

  it('deve criar uma matrícula válida entre aluno e disciplina', () => {
    const matricula = new AlunoDisciplina(dadosValidos);

    expect(matricula.alunoId).toBe('aluno-id-123');
    expect(matricula.disciplinaId).toBe('disciplina-id-456');
    expect(matricula.status).toBe('ativo');
    expect(matricula.dataMatricula).toBeInstanceOf(Date);
  });

  it('não deve permitir criação sem aluno', () => {
    expect(() => {
      new AlunoDisciplina({ ...dadosValidos, alunoId: null });
    }).toThrow();
  });

  it('não deve permitir criação sem disciplina', () => {
    expect(() => {
      new AlunoDisciplina({ ...dadosValidos, disciplinaId: null });
    }).toThrow();
  });

  it('deve permitir alterar o status para concluido', () => {
    const matricula = new AlunoDisciplina(dadosValidos);
    matricula.setStatus('concluido');

    expect(matricula.status).toBe('concluido');
  });

  it('não deve permitir status inválido', () => {
    const matricula = new AlunoDisciplina(dadosValidos);

    expect(() => {
      matricula.setStatus('invalido');
    }).toThrow();
  });

  it('deve permitir definir nota entre 0 e 10', () => {
    const matricula = new AlunoDisciplina(dadosValidos);
    matricula.setNota(8.5);

    expect(matricula.nota).toBe(8.5);
  });

  it('não deve permitir nota menor que 0', () => {
    const matricula = new AlunoDisciplina(dadosValidos);

    expect(() => {
      matricula.setNota(-1);
    }).toThrow();
  });

  it('não deve permitir nota maior que 10', () => {
    const matricula = new AlunoDisciplina(dadosValidos);

    expect(() => {
      matricula.setNota(11);
    }).toThrow();
  });

});
