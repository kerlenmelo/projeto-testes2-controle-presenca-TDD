const mongoose = require('mongoose');

const alunoDisciplinaSchema = new mongoose.Schema(
  {
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aluno',
      required: true,
    },
    disciplinaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disciplina',
      required: true,
    },
    status: {
      type: String,
      enum: ['Ativo', 'Trancado'],
      default: 'Ativo',
    },
    dataMatricula: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

alunoDisciplinaSchema.index({ alunoId: 1, disciplinaId: 1 }, { unique: true });

module.exports =
  mongoose.models.AlunoDisciplina ||
  mongoose.model('AlunoDisciplina', alunoDisciplinaSchema);
