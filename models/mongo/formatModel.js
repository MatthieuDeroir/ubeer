// sequelize format model 

const sequelize = require("./db/sequelize");

const { DataTypes } = require("sequelize");

const Format = sequelize.define("Format", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    });

module.exports = Format;
