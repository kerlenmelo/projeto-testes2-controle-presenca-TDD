describe('AuthController (RED)', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      aluno: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ---------- POST /api/auth/login ----------
  describe('login', () => {

    it('deve retornar 400 se validação falhar', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Dados inválidos' })
      );
    });

    it('deve retornar 401 se matrícula ou senha forem inválidas', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      Aluno.findOne.mockResolvedValue(null);

      req.body = {
        matricula: '20230001',
        senha: '123456'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Matrícula ou senha inválidos' })
      );
    });

  });

  // ---------- POST /api/auth/register ----------
  describe('register', () => {

    it('deve retornar 400 se validação falhar', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Dados inválidos' })
      );
    });

    it('deve retornar 400 se aluno já existir', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      Aluno.findOne.mockResolvedValue({ _id: 'existe' });

      req.body = {
        email: 'teste@email.com',
        cpf: '12345678901',
        matricula: '20230001'
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Aluno já cadastrado')
        })
      );
    });

  });

  // ---------- GET /api/auth/profile ----------
  describe('getProfile', () => {

    it('deve retornar perfil do aluno autenticado', async () => {
      req.aluno._id = 'aluno-id';

      Aluno.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          nome: 'João',
          matricula: '20230001'
        })
      });

      await getProfile(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'João',
          matricula: '20230001'
        })
      );
    });

  });

});
