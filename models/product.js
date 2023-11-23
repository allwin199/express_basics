const cart = require("./cart");
const db = require("../util/database");

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {}

    static fetchAll(cb) {
        getProductsFromFile(cb);
        db.execute("SELECT * FROM products")
            .then((result) => console.log(result[0]))
            .catch((err) => console.log(err));
    }

    static findById(id, cb) {}

    static deleteById(id, cb) {}
};
