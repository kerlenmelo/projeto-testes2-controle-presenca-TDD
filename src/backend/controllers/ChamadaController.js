const ChamadaService = require('../services/ChamadaService');

class ChamadaController {
  async registrar(req, res) {
    try {
      const chamada = await ChamadaService.registrar(req.body);
      return res.status(201).json(chamada);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listarPorDisciplinaEData(req, res) {
    const { disciplinaId } = req.params;
    const { data } = req.query;

    try {
      const chamadas = await ChamadaService.listarPorDisciplinaEData(
        disciplinaId,
        data
      );
      return res.json(chamadas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listarPorAluno(req, res) {
    const { alunoId } = req.params;

    try {
      const chamadas = await ChamadaService.listarPorAluno(alunoId);
      return res.json(chamadas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listarChamadaCompleta(req, res) {
    const { disciplinaId } = req.params;
    const { data } = req.query;

    try {
      const lista = await ChamadaService.listarChamadaCompleta(
        disciplinaId,
        data
      );

      return res.json(lista);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ChamadaController();
