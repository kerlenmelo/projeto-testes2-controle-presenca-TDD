// src/backend/repositories/AlunoDisciplinaRepository.js
const AlunoDisciplinaModel = require('../models/mongoose/AlunoDisciplinaModel');

class AlunoDisciplinaRepository {
  async matricular(dados) {
    return await AlunoDisciplinaModel.create(dados);
  }

  async listar() {
    return await AlunoDisciplinaModel
      .find()
      .populate('alunoId')
      .populate('disciplinaId');
  }

  async buscar(alunoId, disciplinaId) {
    return await AlunoDisciplinaModel.findOne({ alunoId, disciplinaId });
  }

  async atualizar(id, dados) {
    return await AlunoDisciplinaModel.findByIdAndUpdate(id, dados, { new: true });
  }

  async remover(id) {
    return await AlunoDisciplinaModel.findByIdAndDelete(id);
  }
}

module.exports = AlunoDisciplinaRepository;
