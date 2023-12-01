const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const adminRoutes = require("./routes/admin");
const shop = require("./routes/shop");

const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // public dir is given read access

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            // console.log("user", user);
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shop);

app.use("/", errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });

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
        return user.createCart();
    })
    .then((user) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
