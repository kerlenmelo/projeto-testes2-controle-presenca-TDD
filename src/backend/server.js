const app = require('../backend/app');
const connectDB = require('../backend/database');

const PORT = 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
  });
});
