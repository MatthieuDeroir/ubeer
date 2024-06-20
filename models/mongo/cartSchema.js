const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    beerId: {
        type: Schema.Types.ObjectId,
        ref: 'Beer',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    items: [cartItemSchema],
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
