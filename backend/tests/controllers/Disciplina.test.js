describe('DisciplinaController (RED)', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      aluno: {
        _id: 'aluno-id'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ---------- GET /api/disciplinas ----------
  describe('getDisciplinas', () => {

    it('deve retornar lista paginada de disciplinas', async () => {
      Disciplina.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Disciplina.countDocuments.mockResolvedValue(0);

      await getDisciplinas(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          disciplinas: expect.any(Array),
          total: 0
        })
      );
    });

  });

  // ---------- GET /api/disciplinas/disponiveis ----------
  describe('getDisciplinasDisponiveis', () => {

    it('deve retornar disciplinas não matriculadas pelo aluno', async () => {
      AlunoDisciplina.find.mockReturnValue({
        select: jest.fn().mockResolvedValue([])
      });

      Disciplina.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([])
      });

      Disciplina.countDocuments.mockResolvedValue(0);

      await getDisciplinasDisponiveis(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          disciplinas: expect.any(Array),
          total: 0
        })
      );
    });

  });

  // ---------- GET /api/disciplinas/:id ----------
  describe('getDisciplinaById', () => {

    it('deve retornar 404 se disciplina não existir', async () => {
      Disciplina.findById.mockResolvedValue(null);
      req.params.id = 'disciplina-id';

      await getDisciplinaById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Disciplina não encontrada'
      });
    });

  });

  // ---------- POST /api/disciplinas ----------
  describe('createDisciplina', () => {

    it('deve retornar 400 se validação falhar', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await createDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Dados inválidos' })
      );
    });

    it('deve retornar 400 se disciplina já existir', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      Disciplina.findOne.mockResolvedValue({ _id: 'existe' });

      req.body = { nome: 'Engenharia de Software' };

      await createDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Disciplina já cadastrada com este nome'
        })
      );
    });

  });

  // ---------- PUT /api/disciplinas/:id ----------
  describe('updateDisciplina', () => {

    it('deve retornar 404 se disciplina não existir', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      Disciplina.findById.mockResolvedValue(null);
      req.params.id = 'disciplina-id';

      await updateDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Disciplina não encontrada'
      });
    });

  });

  // ---------- DELETE /api/disciplinas/:id ----------
  describe('deleteDisciplina', () => {

    it('deve retornar 400 se houver alunos matriculados', async () => {
      Disciplina.findById.mockResolvedValue({ _id: 'disciplina-id' });

      AlunoDisciplina.countDocuments.mockResolvedValue(2);
      req.params.id = 'disciplina-id';

      await deleteDisciplina(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Não é possível excluir')
        })
      );
    });

  });

});
