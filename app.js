const express = require("express");
const app = express();
const path = require("path");
const login_register_router = require("./routes/login_register");
const userRouter = require("./routes/users");
const productRouter = require("./routes/addProduct");

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const staticPath = path.join(__dirname, 'public');

app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "menu.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(staticPath, "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

app.get("/addProduct", (req, res) => {
  res.sendFile(path.join(staticPath, "addProduct.html"));
});

app.get("/product1", (req, res) => {
  res.sendFile(path.join(staticPath, "product1.html"));
})

app.get("/product2", (req, res) => {
  res.sendFile(path.join(staticPath, "product2.html"));
})

app.get("/product3", (req, res) => {
  res.sendFile(path.join(staticPath, "product3.html"));
})

app.get("/product4", (req, res) => {
  res.sendFile(path.join(staticPath, "product4.html"));
})

app.get("/product5", (req, res) => {
  res.sendFile(path.join(staticPath, "product5.html"));
})

app.get("/product6", (req, res) => {
  res.sendFile(path.join(staticPath, "product6.html"));
})

app.use(login_register_router);
app.use(userRouter);
app.use(productRouter);

app.use(express.static(staticPath));

app.use("*", (req, res) => {
  res.send("404 Not Found.");
})


module.exports = app;