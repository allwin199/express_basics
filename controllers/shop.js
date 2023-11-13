const Product = require("../models/product");

exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.status(200).render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
        });
    });
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.status(200).render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
            hasProducts: products.length > 0,
        });
    });
};

exports.getCart = (req, res) => {
    res.status(200).render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
    });
};

exports.getCheckout = (req, res) => {
    res.status(200).render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};

exports.getOrders = (req, res) => {
    res.status(200).render("shop/orders", {
        path: "/orders",
        pageTitle: "Orders",
    });
};
