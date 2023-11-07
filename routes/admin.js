const express = require("express");
const path = require("path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
});

router.post("/add-product", (req, res) => {
    products.push({ title: req.body.title, pageTitle: "Add Product" });
    res.redirect("/");
});

exports.routes = router;
exports.products = products;
