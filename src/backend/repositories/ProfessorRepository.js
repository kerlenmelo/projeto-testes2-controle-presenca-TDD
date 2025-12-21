const ProfessorModel = require('../models/mongoose/ProfessorSchema');

class ProfessorRepository {
  async findAll() {
    return ProfessorModel.find().select('-senha');
  }

  async findById(id) {
    return ProfessorModel.findById(id).select('-senha');
  }

  async findByCpf(cpf) {
    return ProfessorModel.findOne({ cpf }).select('-senha');
  }

  async findByEmail(email) {
    return ProfessorModel.findOne({ email });
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
