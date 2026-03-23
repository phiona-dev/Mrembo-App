const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true, trim: true },
    brand: {type: String, trim: true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    ingredientList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }]
}, { timestamps: true})

const Product = mongoose.model("Product", productSchema)
module.exports = Product