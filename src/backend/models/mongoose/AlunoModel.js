// src/backend/models/mongoose/AlunoModel.js
const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true, unique: true },
    matricula: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true },
    curso: { type: String, required: true },
    senha: { type: String, required: true },
    role: { type: String, default: 'Aluno' }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Aluno ||
  mongoose.model('Aluno', alunoSchema);

