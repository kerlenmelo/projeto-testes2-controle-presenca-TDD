const AlunoModel = require('../models/mongoose/Aluno');

class AlunoRepository {
  async findAll() {
    return AlunoModel.find();
  }

  async findById(id) {
    return AlunoModel.findById(id);
  }

  async findByCpf(cpf) {
    return AlunoModel.findOne({ cpf });
  }

  async create(data) {
    return AlunoModel.create(data);
  }

  async update(id, data) {
    return AlunoModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return AlunoModel.findByIdAndDelete(id);
  }
}

module.exports = new AlunoRepository();
