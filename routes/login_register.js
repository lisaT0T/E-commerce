const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({userName: req.body.userName});
        if (user) {
            var checkPwd = await bcrypt.compare(req.body.password, user.password);
            if (!checkPwd) {
                res.send({message: "Invalid User Name or password."});
            } else {
                const token = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, process.env.JWT_KEY, 
                {expiresIn: "2d",});
                // res.setHeader("JWT", token);
                user.toke = token;
                // const {password, ...others} = user._doc;

                res.status(200).send({message: "Successfully Logged in.", redirect: "/"});
            }
        } else {
            res.send({message: "User Do not found, please sign up.", redirect: "/register"});
        }
    } catch(err) {
        res.status(500).send({message: err});
    }
})

router.post('/register', async (req, res, next) => {
    const userExist = await User.findOne({userName: req.body.userName});
    const emailExist = await User.findOne({email: req.body.email});
    if (userExist) {
        res.send({message: "User Name already exist."});
    } else if (emailExist) {
        res.send({message: "Email already registered."});
    } else if (req.body.password !== req.body.retype) {
        res.send({message: "Password do not match."});
    } else {
        try {
            var hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        } catch(err) {
            console.log("Error when hashing the password in register.");
            res.status(500).send({message: err});
        }

        try {
            var user = await User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                
            });

            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_KEY,
            {
                expiresIn: "2d",
            });

            user.token = token;
            // res.status(201).json(user.token);
            res.status(201).send({message: "Successfully Registered.", redirect: "/"});

        } catch (err) {
            res.status(500).send({message:err});
        } 


        // res.setHeader("JWT", token);
        // res.status(201).send({message: "Successfully Registered.", redirect: "/"});
    }
});

module.exports = router;
