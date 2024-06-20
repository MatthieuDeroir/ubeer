const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const Beer = sequelize.define('Beer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    abv: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    ibu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    price : {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 1000000
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    breweryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    formatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Beer;
