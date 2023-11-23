const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title,
        imageUrl,
        price,
        description,
    })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
    const prodId = req.params.productId;
    const editMode = req.query.edit === "true" ? true : false;
    Product.findByPk(prodId)
        .then((product) => {
            res.status(200).render("admin/edit-product", {
                product: product,
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
                hasProducts: products.length > 0,
            });
        })
        .catch((err) => console.log(err));
};
