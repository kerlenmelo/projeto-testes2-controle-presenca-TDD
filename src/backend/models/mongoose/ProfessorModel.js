const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema(
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
      default: 'Professor',
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Professor || mongoose.model('Professor', professorSchema);
