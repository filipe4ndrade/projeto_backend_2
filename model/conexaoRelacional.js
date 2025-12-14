const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'fullstack', 'senha_fullstack', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com MySQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com MySQL:', err);
  });

module.exports = sequelize;
