const express = require('express');
const router = express.Router();
const Product = require("../model/Product");
const dotenv = require("dotenv");

dotenv.config();

router.post('/addProduct', async (req, res, next) => {
    const productExist = await Product.findOne({title: req.body.title});
    if (productExist) {
        res.send({message: "Product already exist."});
    } else {
        const user = new Product({
            title: req.body.title,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            img: req.body.img,
        });

        try {
            const savedUser = await user.save();
            res.status(201).send({message: "Successfully Add Product."});
        } catch(err) {
            res.status(500).send({message: err});
        }
    }
});

module.exports = router;
