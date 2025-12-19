// src/backend/models/mongoose/DisciplinaModel.js
const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true },
    cargaHoraria: { type: Number, required: true },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
      required: true
    },
    descricao: { type: String }
  },
  { timestamps: true }
);

module.exports = 
mongoose.models.Disciplina ||
mongoose.model('Disciplina', disciplinaSchema);
