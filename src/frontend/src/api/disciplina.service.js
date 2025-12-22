import request from './api';

export async function listarDisciplinasPorProfessor(professorId) {
  return request(`/disciplinas/professor/${professorId}`);
}

export async function buscarDisciplinaPorId(id) {
  return request(`/disciplinas/${id}`);
}

export async function criarDisciplina(disciplina) {
  return request('/disciplinas', {
    method: 'POST',
    body: JSON.stringify(disciplina)
  });
}
