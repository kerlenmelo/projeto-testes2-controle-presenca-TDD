const mongoose = require('mongoose');

const chamadaSchema = new mongoose.Schema(
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
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Presente', 'Ausente'],
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Garante que a chamada seja única por DIA,
 * independentemente do horário enviado.
 */
chamadaSchema.pre('save', function () {
  if (this.data instanceof Date) {
    this.data.setHours(0, 0, 0, 0);
  }
});

/**
 * Um aluno só pode ter UMA chamada por dia em cada disciplina
 */
chamadaSchema.index({ alunoId: 1, disciplinaId: 1, data: 1 }, { unique: true });

module.exports =
  mongoose.models.Chamada || mongoose.model('Chamada', chamadaSchema);
