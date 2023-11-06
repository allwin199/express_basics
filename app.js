const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Routes
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(productRoutes);

app.use("/", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
