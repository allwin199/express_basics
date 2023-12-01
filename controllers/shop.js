const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
    Product.findAll().then((products) => {
        res.status(200).render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
        });
    });
};

exports.getProducts = (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: products.length > 0,
            });
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then((product) => {
            res.status(200).render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts();
        })
        .then((products) => {
            console.log(products);
            res.status(200).render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: products,
            });
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
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
