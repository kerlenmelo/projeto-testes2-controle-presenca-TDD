const express = require('express');
const cors = require('cors');
const chamadaRoutes = require('../backend/routes/ChamadaRoutes');
const authRoutes = require('../backend/routes/AuthRoutes');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/chamadas', chamadaRoutes);
app.use('/api/auth', authRoutes);
module.exports = app;

