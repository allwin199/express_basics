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

    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect("/");
};

exports.getEditProduct = (req, res) => {
    const prodId = req.params.productId;
    const editMode = req.query.edit === "true" ? true : false;
    Product.findById(prodId, (product) => {
        console.log("product", product);
        res.status(200).render("admin/edit-product", {
            product: product,
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
        });
    });
};

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDescription
    );
    updatedProduct.save();
    res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    console.log("prodId", prodId);
    // Product.deleteProduct(prodId, (products) => {
    //     res.status(200).render("admin/products", {
    //         prods: products,
    //         pageTitle: "Admin Products",
    //         path: "/admin/products",
    //         hasProducts: products.length > 0,
    //     });
    // });
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
