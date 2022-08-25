const express = require("express");
const app = express();
const path = require("path");
const usersRouter = require("./routes/users");

app.use(express.json());

app.use(usersRouter);
app.use(express.static(path.join(__dirname, 'public'), 
  {index: false, extension: ['html']}));

module.exports = app;