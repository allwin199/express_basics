const express = require("express");

const router = express.Router();
const productsRoute = require("../controllers/products");

router.get("/", productsRoute.getProducts);

module.exports = router;
