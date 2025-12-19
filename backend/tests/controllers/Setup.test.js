const {
  getSetupStatus,
  createFirstUser
} = require('../../../controllers/SetupController');

const Aluno = require('../../../models/Aluno');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

jest.mock('../../../models/Aluno');
jest.mock('express-validator');
jest.mock('jsonwebtoken');

describe('SetupController (RED)', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ---------- GET /api/setup/status ----------
  describe('getSetupStatus', () => {

    it('deve indicar que o sistema precisa de setup quando não há usuários', async () => {
      Aluno.countDocuments.mockResolvedValue(0);

      await getSetupStatus(req, res);

      expect(res.json).toHaveBeenCalledWith({
        needsSetup: true,
        message: 'Sistema precisa de configuração inicial'
      });
    });

    it('deve indicar que o sistema já foi configurado quando há usuários', async () => {
      Aluno.countDocuments.mockResolvedValue(1);

      await getSetupStatus(req, res);

      expect(res.json).toHaveBeenCalledWith({
        needsSetup: false,
        message: 'Sistema já foi configurado'
      });
    });

  });

  // ---------- POST /api/setup/first-user ----------
  describe('createFirstUser', () => {

    it('deve retornar 403 se o sistema já estiver configurado', async () => {
      Aluno.countDocuments.mockResolvedValue(1);

      await createFirstUser(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Sistema já foi configurado. Use o registro normal.'
        })
      );
    });

    it('deve retornar 400 se validação falhar', async () => {
      Aluno.countDocuments.mockResolvedValue(0);

      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Erro de validação' }]
      });

      await createFirstUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Dados inválidos'
        })
      );
    });

  });

});
