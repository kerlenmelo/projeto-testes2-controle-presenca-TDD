const ChamadaService = require('../services/ChamadaService');

const chamadaService = new ChamadaService();

exports.registrar = async (req, res) => {
  try {
    const chamada = await chamadaService.registrar(req.body);
    res.status(201).json(chamada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
