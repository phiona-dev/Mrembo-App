const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    brand: String,
    ingredientList: [],
    createdAt: Date
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product