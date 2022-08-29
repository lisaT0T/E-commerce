const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_KEY,
    {useNewUrlParser: true, useUnifiedTopology: true, },
    (error, client) => {
        if (error) console.log(error);
        else console.log("Connected to database.");
    })

module.exports = mongoose.connection;