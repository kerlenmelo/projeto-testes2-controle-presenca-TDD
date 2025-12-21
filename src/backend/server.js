require('dotenv').config();
const app = require('../backend/app');
const connectDB = require('../backend/database');

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
    process.exit(1);
  });
