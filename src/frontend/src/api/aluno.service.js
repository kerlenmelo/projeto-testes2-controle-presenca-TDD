import request from './api';

export async function listarAlunos() {
  return request('/alunos');
}

export async function buscarAlunoPorId(id) {
  return request(`/alunos/${id}`);
}

export async function listarDisciplinasDoAluno(alunoId) {
  return request(`/alunos/${alunoId}/disciplinas`);
}

export async function criarAluno(aluno) {
  return request('/alunos', {
    method: 'POST',
    body: JSON.stringify(aluno)
  });
}
