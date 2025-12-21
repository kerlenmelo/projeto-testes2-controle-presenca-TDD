const ProfessorModel = require('../models/mongoose/Professor');

class ProfessorRepository {
  async findAll() {
    return ProfessorModel.find();
  }

  async findById(id) {
    return ProfessorModel.findById(id);
  }

  async findByCpf(cpf) {
    return ProfessorModel.findOne({ cpf });
  }

  async create(data) {
    return ProfessorModel.create(data);
  }

  async update(id, data) {
    return ProfessorModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return ProfessorModel.findByIdAndDelete(id);
  }
}

module.exports = new ProfessorRepository();
