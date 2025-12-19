// src/backend/repositories/AlunoRepository.js
const AlunoModel = require('../models/mongoose/AlunoModel');

class AlunoRepository {
  async criar(dados) {
    return await AlunoModel.create(dados);
  }

  async listar() {
    return await AlunoModel.find();
  }

  async buscarPorId(id) {
    return await AlunoModel.findById(id);
  }

  async buscarPorCPF(cpf) {
    return await AlunoModel.findOne({ cpf });
  }

  async atualizar(id, dados) {
    return await AlunoModel.findByIdAndUpdate(id, dados, { new: true });
  }

  async remover(id) {
    return await AlunoModel.findByIdAndDelete(id);
  }
}

module.exports = AlunoRepository;
