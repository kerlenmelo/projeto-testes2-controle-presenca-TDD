// src/backend/models/mongoose/AlunoDisciplinaModel.js
const mongoose = require('mongoose');

const alunoDisciplinaSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ['ativo', 'concluido', 'cancelado'],
      default: 'ativo'
    },
    nota: {
      type: Number,
      min: 0,
      max: 10
    }
  },
  { timestamps: true }
);

// Evita matrícula duplicada
alunoDisciplinaSchema.index(
  { alunoId: 1, disciplinaId: 1 },
  { unique: true }
);

module.exports = mongoose.model('AlunoDisciplina', alunoDisciplinaSchema);
