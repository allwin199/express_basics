const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const adminRoutes = require("./routes/admin");
const shop = require("./routes/shop");

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // public dir is given read access

app.use((req, res) => {
    User.findByPk(1)
        .then(() => {})
        .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shop);

app.use("/", errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: "Tom", email: "tom@gmail.com" });
        }
        return user;
    })
    .then((user) => {
        // console.log(user);
        app.listen(3000);
    })
    .catch((err) => console.log(err));
