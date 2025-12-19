const ProfessorRepository = require('../repositories/ProfessorRepository');

class AuthController {
  async loginProfessor(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const repository = new ProfessorRepository();
    const professor = await repository.buscarPorEmail(email);

    if (!professor || professor.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.json({
      id: professor._id,
      nome: professor.nome,
      email: professor.email
    });
  }
}

module.exports = new AuthController();
