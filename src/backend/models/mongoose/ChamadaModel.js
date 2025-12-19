const mongoose = require('mongoose');

const chamadaSchema = new mongoose.Schema(
  {
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
    data: {
      type: String,
      required: true
    },
    presencas: [
      {
        alunoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Aluno',
          required: true
        },
        status: {
          type: String,
          enum: ['Presente', 'Ausente'],
          default: 'Ausente'
        }
      }
    ],
    finalizada: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Regra: uma chamada por disciplina e data
chamadaSchema.index(
  { disciplinaId: 1, data: 1 },
  { unique: true }
);

module.exports =
  mongoose.models.Chamada ||
  mongoose.model('Chamada', chamadaSchema);
