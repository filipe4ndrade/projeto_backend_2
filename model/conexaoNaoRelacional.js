const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/ecommerce';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Erro ao conectar com MongoDB:', err);
});

db.once('open', () => {
  console.log('Conexão com MongoDB estabelecida com sucesso.');
});

module.exports = mongoose;
