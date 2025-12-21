const ChamadaModel = require('../models/mongoose/Chamada');

class ChamadaRepository {
  async findAll() {
    return ChamadaModel.find()
      .populate('alunoId')
      .populate('disciplinaId')
      .populate('professorId');
  }

  async findByAluno(alunoId) {
    return ChamadaModel.find({ alunoId })
      .populate('disciplinaId')
      .populate('professorId');
  }

  async findByDisciplina(disciplinaId) {
    return ChamadaModel.find({ disciplinaId })
      .populate('alunoId')
      .populate('professorId');
  }

  async findByProfessor(professorId) {
    return ChamadaModel.find({ professorId })
      .populate('alunoId')
      .populate('disciplinaId');
  }

  async create(data) {
    return ChamadaModel.create(data);
  }
}

module.exports = new ChamadaRepository();
