describe('AlunoController (RED)', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      aluno: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ---------- GET /api/alunos ----------
  describe('getAlunos', () => {

    it('deve retornar lista de alunos com paginação', async () => {
      Aluno.find.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([
          { nome: 'João' },
          { nome: 'Maria' }
        ])
      });

      Aluno.countDocuments.mockResolvedValue(2);

      await getAlunos(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          alunos: expect.any(Array),
          total: 2
        })
      );
    });

  });

  // ---------- GET /api/alunos/:id ----------
  describe('getAlunoById', () => {

    it('deve retornar 404 se aluno não existir', async () => {
      req.params.id = 'id-invalido';

      Aluno.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await getAlunoById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno não encontrado'
      });
    });

  });

  // ---------- POST /api/alunos ----------
  describe('createAluno', () => {

    it('deve retornar 400 se validação falhar', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await createAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Dados inválidos'
        })
      );
    });

    it('deve retornar 400 se aluno já existir', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });

      Aluno.findOne.mockResolvedValue({ _id: 'existe' });

      req.body = {
        email: 'teste@email.com',
        cpf: '12345678901',
        matricula: '20230001'
      };

      await createAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Aluno já cadastrado')
        })
      );
    });

  });

  // ---------- PUT /api/alunos/:id ----------
  describe('updateAluno', () => {

    it('deve retornar 404 se aluno não existir', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });

      Aluno.findById.mockResolvedValue(null);

      await updateAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno não encontrado'
      });
    });

  });

  // ---------- DELETE /api/alunos/:id ----------
  describe('deleteAluno', () => {

    it('deve retornar 404 se aluno não existir', async () => {
      Aluno.findById.mockResolvedValue(null);

      await deleteAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno não encontrado'
      });
    });

  });

  // ---------- PUT /api/alunos/:id/senha ----------
  describe('alterarSenha', () => {

    it('deve retornar 400 se senha for inválida', async () => {
      req.body.senha = '123';

      await alterarSenha(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Senha deve ter')
        })
      );
    });

  });

});
