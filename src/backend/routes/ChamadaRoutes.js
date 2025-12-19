const express = require('express');
const { registrar } = require('../controllers/ChamadaController');

const router = express.Router();

router.post('/', registrar);

module.exports = router;
