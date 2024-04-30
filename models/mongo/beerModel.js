// sequelize beer model 

const sequelize = require("./db/sequelize");

const { DataTypes } = require("sequelize");

const Beer = sequelize.define("Beer", {
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
    },
    ibu: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
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
//