// src/backend/repositories/ChamadaRepository.js
const ChamadaModel = require('../models/mongoose/ChamadaModel');

class ChamadaRepository {
  async registrar(dados) {
    return await ChamadaModel.create(dados);
  }

  async listar() {
    return await ChamadaModel
      .find()
      .populate('alunoId')
      .populate('disciplinaId')
      .populate('professorId');
  }

  async buscarDuplicada(alunoId, disciplinaId, data) {
    return await ChamadaModel.findOne({ alunoId, disciplinaId, data });
  }

  async remover(id) {
    return await ChamadaModel.findByIdAndDelete(id);
  }
}

module.exports = ChamadaRepository;
