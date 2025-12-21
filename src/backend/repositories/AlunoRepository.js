const AlunoModel = require('../models/mongoose/AlunoSchema');

class AlunoRepository {
  async findAll() {
    return AlunoModel.find().select('-senha');
  }

  async findById(id) {
    return AlunoModel.findById(id).select('-senha');
  }

  async findByCpf(cpf) {
    return AlunoModel.findOne({ cpf }).select('-senha');
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
