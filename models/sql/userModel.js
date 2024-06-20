const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    oauthId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user' // 'user' or 'admin'
    }
}, {
    timestamps: true
});

module.exports = User;
