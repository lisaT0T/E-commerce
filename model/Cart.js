const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    products: [
        {
            productID: {type: String},
            quantity: {type: Number, default: 1,},
        }
    ]
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;