exports.getAddProduct = (req, res) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

const products = [];
exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title, pageTitle: "Add Product" });
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    res.render("shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
    });
};
