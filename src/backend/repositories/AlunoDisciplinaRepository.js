const AlunoDisciplinaModel = require('../models/mongoose/AlunoDisciplinaSchema');

class AlunoDisciplinaRepository {
  async findByAluno(alunoId) {
    return AlunoDisciplinaModel.find({ alunoId }).populate('disciplinaId');
  }

  async findByDisciplina(disciplinaId) {
    return AlunoDisciplinaModel.find({ disciplinaId }).populate('alunoId');
  }

  async create(data) {
    return AlunoDisciplinaModel.create(data);
  }

  async delete(alunoId, disciplinaId) {
    return AlunoDisciplinaModel.findOneAndDelete({ alunoId, disciplinaId });
  }
}

module.exports = new AlunoDisciplinaRepository();
