const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../", "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.id === id
            );
            let existingProduct;
            if (existingProductIndex !== -1) {
                existingProduct = cart.products[existingProductIndex];
            }
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                // console.log("writeError", err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const product = updatedCart.products.find((prod) => prod.id === id);
            const productQty = product.qty;
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;
            updatedCart.products = updatedCart.products.filter(
                (prod) => prod.id !== id
            );
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log("writeError", err);
            });
        });
    }
};
