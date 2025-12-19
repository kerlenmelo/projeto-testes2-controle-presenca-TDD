// src/backend/repositories/DisciplinaRepository.js
const DisciplinaModel = require('../models/mongoose/DisciplinaModel');

class DisciplinaRepository {
  async criar(dados) {
    return await DisciplinaModel.create(dados);
  }

  async listar() {
    return await DisciplinaModel.find().populate('professorId');
  }

  async buscarPorId(id) {
    return await DisciplinaModel.findById(id).populate('professorId');
  }

  async buscarPorNome(nome) {
    return await DisciplinaModel.findOne({ nome });
  }

  async atualizar(id, dados) {
    return await DisciplinaModel.findByIdAndUpdate(id, dados, { new: true });
  }

  async remover(id) {
    return await DisciplinaModel.findByIdAndDelete(id);
  }
}

module.exports = DisciplinaRepository;
