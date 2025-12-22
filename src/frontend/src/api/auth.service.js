import request from './api';

export async function loginProfessor(email, senha) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}
