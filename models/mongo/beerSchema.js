const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour la brasserie
const brewerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { _id: false });

// Schéma pour le format
const formatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
}, { _id: false });

// Schéma pour la bière
const beerSchema = new Schema({
    id : {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    ibu: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    description: String,
    image: String,
    brewery: {
        type: brewerySchema,
        required: true
    },
    format: {
        type: formatSchema,
        required: true
    }
}, { timestamps: true });

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
