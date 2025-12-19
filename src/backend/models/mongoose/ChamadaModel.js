// src/backend/models/mongoose/ChamadaModel.js
const mongoose = require('mongoose');

const chamadaSchema = new mongoose.Schema(
  {
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aluno',
      required: true
    },
    disciplinaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disciplina',
      required: true
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
      required: true
    },
    data: { type: String, required: true },
    status: {
      type: String,
      enum: ['Presente', 'Ausente'],
      default: 'Ausente'
    }
  },
  { timestamps: true }
);

// Regra central reforçada no banco
chamadaSchema.index(
  { alunoId: 1, disciplinaId: 1, data: 1 },
  { unique: true }
);

module.exports = 
mongoose.models.Chamada ||
mongoose.model('Chamada', chamadaSchema);
