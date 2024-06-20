// sequelize brewery model

const sequelize = require("../../db/sequelize");


const { DataTypes } = require("sequelize");

const Brewery = sequelize.define("Brewery", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address : {
        type: DataTypes.STRING,
        allowNull: false,
    }
    });

module.exports = Brewery;
