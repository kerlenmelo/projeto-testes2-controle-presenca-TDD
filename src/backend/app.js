const express = require('express');
const cors = require('cors');
const chamadaRoutes = require('../backend/routes/ChamadaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chamadas', chamadaRoutes);

module.exports = app;
