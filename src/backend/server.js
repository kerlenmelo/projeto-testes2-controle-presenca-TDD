const app = require('../backend/app');

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
