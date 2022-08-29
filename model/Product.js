const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true, min: [0, 'Price cannot be negative']},
    img: {type: String, required: true},
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;