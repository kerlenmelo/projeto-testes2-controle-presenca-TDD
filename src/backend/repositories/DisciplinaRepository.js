const DisciplinaModel = require('../models/mongoose/DisciplinaSchema');

class DisciplinaRepository {
  async findAll() {
    return DisciplinaModel.find().populate('professorId');
  }

  async findById(id) {
    return DisciplinaModel.findById(id).populate('professorId');
  }

  async findByProfessor(professorId) {
    return DisciplinaModel.find({ professorId }).populate('professorId');
  }

  async create(data) {
    return DisciplinaModel.create(data);
  }

  async update(id, data) {
    return DisciplinaModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return DisciplinaModel.findByIdAndDelete(id);
  }
}

module.exports = new DisciplinaRepository();
