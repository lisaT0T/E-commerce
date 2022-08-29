const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    products: [
        {
            productID: {type: String},
            quantity: {type: Number, default: 1,},
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, default: "Pending"},
})

const Order = mongoose.model("order", orderSchema);

module.exports = Order;