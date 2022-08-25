const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Lisa:200810@cluster0.ixcmero.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true, },
    (error, client) => {
        if (error) console.log(error);
        else console.log("Connected to database.");
    })

module.exports = mongoose.connection;