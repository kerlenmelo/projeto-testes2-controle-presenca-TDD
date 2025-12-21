const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
      length: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    telefone: {
      type: String,
    },
    senha: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      default: 'Aluno',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Aluno || mongoose.model('Aluno', alunoSchema);
