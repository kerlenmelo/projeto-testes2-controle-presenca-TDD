const express = require('express');
const cors = require('cors');

const chamadaRoutes = require('../backend/routes/ChamadaRoutes');
const authRoutes = require('../backend/routes/AuthRoutes');
const alunoRoutes = require('../backend/routes/AlunoRoutes');
const professorRoutes = require('../backend/routes/ProfessorRoutes');
const disciplinaRoutes = require('../backend/routes/DisciplinaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chamadas', chamadaRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/disciplinas', disciplinaRoutes);

module.exports = app;
