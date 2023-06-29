const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'pritam123', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
