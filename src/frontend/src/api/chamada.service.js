import request from './api';

export async function registrarChamada(dados) {
  return request('/chamadas', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export async function listarChamadaPorDisciplinaEData(disciplinaId, data) {
  return request(`/chamadas/disciplina/${disciplinaId}?data=${data}`);
}

export async function listarChamadaCompleta(disciplinaId, data) {
  return request(
    `/chamadas/disciplina/${disciplinaId}/completa?data=${data}`
  );
}

export async function listarHistoricoAluno(alunoId) {
  return request(`/chamadas/aluno/${alunoId}`);
}
