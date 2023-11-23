const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
    Product.fetchAll().then(([rows]) => {
        res.status(200).render("shop/index", {
            prods: rows,
            pageTitle: "Shop",
            path: "/",
            hasProducts: rows.length > 0,
        });
    });
};

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.status(200).render("shop/product-list", {
                prods: rows,
                pageTitle: "All Products",
                path: "/products",
                hasProducts: rows.length > 0,
            });
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.status(200).render("shop/product-detail", {
                product: product[0],
                pageTitle: product[0].title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty,
                    });
                }
            }
            res.status(200).render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: cartProducts,
            });
        });
    });
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
