const AlunoDisciplina = require('../../models/AlunoDisciplina');

describe('Entidade de Domínio: AlunoDisciplina', () => {
  const dadosValidos = {
    alunoId: 'aluno-1',
    disciplinaId: 'disc-1'
  };

  it('deve criar matrícula válida com status padrão', () => {
    const matricula = new AlunoDisciplina(dadosValidos);

    expect(matricula.alunoId).toBe('aluno-1');
    expect(matricula.disciplinaId).toBe('disc-1');
    expect(matricula.status).toBe('Ativo');
    expect(matricula.dataMatricula).toBeInstanceOf(Date);
  });
});
