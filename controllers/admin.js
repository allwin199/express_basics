const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.status(200).render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
            hasProducts: products.length > 0,
        });
    });
};