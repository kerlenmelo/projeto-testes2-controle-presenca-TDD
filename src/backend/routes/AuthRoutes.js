const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', (req, res) =>
  AuthController.loginProfessor(req, res)
);

module.exports = router;
