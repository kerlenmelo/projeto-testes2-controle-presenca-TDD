const ProfessorRepository = require('../repositories/ProfessorRepository');

class AuthService {
  async loginProfessor(email, senha) {
    const professor = await ProfessorRepository.findByEmail(email);

    if (!professor || professor.senha !== senha) {
      throw new Error('Credenciais inválidas');
    }

    return {
      id: professor._id,
      nome: professor.nome,
      email: professor.email,
    };
  }
}

module.exports = new AuthService();
