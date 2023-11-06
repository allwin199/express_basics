const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Routes
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(productRoutes);

app.use("/", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
