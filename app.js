const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const adminRoutes = require("./routes/admin");
const shop = require("./routes/shop");

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // public dir is given read access

app.use("/admin", adminRoutes);
app.use(shop);

app.use("/", errorController.get404);

app.listen(3000);
