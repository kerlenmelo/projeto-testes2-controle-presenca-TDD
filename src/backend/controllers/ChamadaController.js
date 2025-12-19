const ChamadaService = require('../services/ChamadaService');

class ChamadaController {
  async finalizar(req, res) {
    try {
      const service = new ChamadaService();

      const chamada = await service.finalizarChamada(req.body);

      return res.status(201).json(chamada);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const service = new ChamadaService();
      const chamada = await service.buscarChamada(req.params.id);

      if (!chamada) {
        return res.status(404).json({ message: 'Chamada não encontrada' });
      }

      return res.json(chamada);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ChamadaController();
