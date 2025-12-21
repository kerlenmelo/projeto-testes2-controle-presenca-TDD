const ChamadaModel = require('../models/mongoose/ChamadaSchema');

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

  async findByDisciplinaAndData(disciplinaId, data) {
    const dataNormalizada = new Date(data);
    dataNormalizada.setHours(0, 0, 0, 0);

    return ChamadaModel.find({
      disciplinaId,
      data: dataNormalizada,
    }).populate('alunoId');
  }

  async findOne(filter) {
    return ChamadaModel.findOne(filter);
  }

  async create(data) {
    return ChamadaModel.create(data);
  }
}

module.exports = new ChamadaRepository();
