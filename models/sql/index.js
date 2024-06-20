const Beer = require('./beerModel');
const Brewery = require('./breweryModel');
const Format = require("./formatModel");
const User = require("./userModel");

// Définir les associations
Beer.belongsTo(Brewery, { foreignKey: 'breweryId' });
Brewery.hasMany(Beer, { foreignKey: 'breweryId' });

Beer.belongsTo(Format, { foreignKey: 'formatId' });
Format.hasMany(Beer, { foreignKey: 'formatId' });

module.exports = {
    Beer,
    Brewery,
    Format,
    User
};
