const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("This is a middleware");
    next();
});

app.use((req, res, next) => {
    res.send("Yo");
});

app.listen(3000);
