const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize
});

module.exports = Users;