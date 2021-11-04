const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shoping', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dev.sqlite'
})

module.exports = sequelize;