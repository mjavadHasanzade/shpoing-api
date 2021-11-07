const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database')

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    oldPrice: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    // category: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: true,
    // },
    // properties: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: true
    // },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize
});

module.exports = Product;