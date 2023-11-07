const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const adminData = require("./routes/admin");
const shop = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // public dir is given read access

app.use("/admin", adminData.routes);
app.use(shop);

app.use("/", (req, res) => {
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

app.listen(3000);
