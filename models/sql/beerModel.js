// mongoose beer model

const mongoose = require("mongoose");

const beerSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    volume : {
        type: Number,
        required: true
    },
    abv : {
        type: Number,
        required: true
    },
    ibu : {
        type: Number,
        required: true
    },
    brewery : {
        name : {
            type: String,
            required: true
        },
        city : {
            type: String,
            required: true
        },
        address : {
            type: String,
            required: true
        }
    },
    formats : [
        {
            name : {
                type: String,
                required: true
            },
            volume : {
                type: Number,
                required: true
            },
            unit : {
                type: String,
                required: true
            }
        }
    ]
});

const Beer = mongoose.model("Beer", beerSchema);

module.exports = Beer;