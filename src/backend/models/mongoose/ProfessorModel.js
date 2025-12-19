// src/backend/models/mongoose/ProfessorModel.js
const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    senha: { type: String, required: true },
    role: { type: String, default: 'Professor' }
  },
  { timestamps: true }
);

module.exports = 
mongoose.models.Professor ||
mongoose.model('Professor', professorSchema);
