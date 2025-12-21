const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cargaHoraria: {
      type: Number,
      required: true,
      min: 1,
      max: 500,
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
      required: true,
    },
    descricao: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Disciplina || mongoose.model('Disciplina', disciplinaSchema);
