// src/backend/repositories/ProfessorRepository.js
const ProfessorModel = require('../models/mongoose/ProfessorModel');

class ProfessorRepository {
  async criar(dados) {
    return await ProfessorModel.create(dados);
  }

  async listar() {
    return await ProfessorModel.find();
  }

  async buscarPorId(id) {
    return await ProfessorModel.findById(id);
  }

  async buscarPorCPF(cpf) {
    return await ProfessorModel.findOne({ cpf });
  }

  async atualizar(id, dados) {
    return await ProfessorModel.findByIdAndUpdate(id, dados, { new: true });
  }

  async remover(id) {
    return await ProfessorModel.findByIdAndDelete(id);
  }
}

module.exports = ProfessorRepository;
