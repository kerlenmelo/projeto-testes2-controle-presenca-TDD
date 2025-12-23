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

  async upsert(alunoId, disciplinaId, data, payload) {
    const dataNormalizada = new Date(data);
    dataNormalizada.setHours(0, 0, 0, 0);

    return ChamadaModel.findOneAndUpdate(
      {
        alunoId,
        disciplinaId,
        data: dataNormalizada,
      },
      {
        alunoId,
        disciplinaId,
        data: dataNormalizada,
        ...payload,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }
}

module.exports = new ChamadaRepository();
