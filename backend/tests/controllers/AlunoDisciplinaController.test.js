describe('AlunoDisciplinaController (RED)', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      aluno: {
        _id: 'aluno-logado',
        role: 'Administrador',
        matricula: '20230001'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ---------- POST /alocar ----------
  describe('alocarDisciplina', () => {

    it('deve retornar 400 se validação falhar', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await alocarDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Dados inválidos' })
      );
    });

    it('deve retornar 403 se aluno tentar alocar para outro aluno', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      req.aluno.role = 'Aluno';
      req.aluno._id = '1';
      req.body.alunoId = '2';

      await alocarDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('deve retornar 404 se aluno não existir', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      Aluno.findById.mockResolvedValue(null);

      req.body = { alunoId: '1', disciplinaId: '2' };

      await alocarDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Aluno não encontrado' })
      );
    });

  });

  // ---------- DELETE /desalocar ----------
  describe('desalocarDisciplina', () => {

    it('deve retornar 404 se alocação não existir', async () => {
      AlunoDisciplina.findOne.mockResolvedValue(null);

      req.body = { alunoId: '1', disciplinaId: '2' };

      await desalocarDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Alocação não encontrada' })
      );
    });

  });

  // ---------- GET /aluno/:matricula ----------
  describe('getDisciplinasByMatricula', () => {

    it('deve retornar 403 se aluno tentar acessar matrícula diferente', async () => {
      req.aluno.role = 'Aluno';
      req.aluno.matricula = '20230001';
      req.params.matricula = '20239999';

      await getDisciplinasByMatricula(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('deve retornar 404 se aluno não existir', async () => {
      req.params.matricula = '20230001';

      Aluno.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await getDisciplinasByMatricula(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

  });

  // ---------- GET /disciplina/:id ----------
  describe('getAlunosByDisciplina', () => {

    it('deve retornar 404 se disciplina não existir', async () => {
      Disciplina.findById.mockResolvedValue(null);
      req.params.disciplinaId = 'disciplina-id';

      await getAlunosByDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

  });

  // ---------- GET /aluno-disciplina ----------
  describe('getAllAlocacoes', () => {

    it('deve retornar lista paginada de alocações', async () => {
      AlunoDisciplina.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      AlunoDisciplina.countDocuments.mockResolvedValue(0);

      await getAllAlocacoes(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          alocacoes: expect.any(Array),
          total: 0
        })
      );
    });

  });

  // ---------- PUT /:id ----------
  describe('updateAlocacao', () => {

    it('deve retornar 404 se alocação não existir', async () => {
      AlunoDisciplina.findById.mockResolvedValue(null);
      req.params.id = 'alocacao-id';

      await updateAlocacao(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

  });

});
