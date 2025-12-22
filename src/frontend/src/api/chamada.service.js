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

export async function listarChamadaCompleta(disciplinaId) {
  const hoje = new Date().toISOString().slice(0, 10);
  return request(
    `/chamadas/disciplina/${disciplinaId}/completa?data=${hoje}`
  );
}


export async function listarHistoricoAluno(alunoId) {
  return request(`/chamadas/aluno/${alunoId}`);
}
