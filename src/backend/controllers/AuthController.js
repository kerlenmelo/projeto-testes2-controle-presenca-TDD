const AuthService = require('../services/AuthService');

class AuthController {
  async loginProfessor(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: 'Email e senha são obrigatórios' });
    }

    try {
      const professor = await AuthService.loginProfessor(email, senha);
      return res.json(professor);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
