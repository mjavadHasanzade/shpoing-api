const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database')

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    sequelize
});

module.exports = Product;