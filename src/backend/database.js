const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://rm180249:lL8ATaNLr4vCrVkl@controle-presenca.7h1ruog.mongodb.net/?appName=controle-presenca'
  );
  console.log('MongoDB conectado');
};

module.exports = connectDB;
