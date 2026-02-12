const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    ingredientName: String,
    safetyLevel: String,
    description: String,
})

const Ingredient = mongoose.model("Ingredient", ingredientSchema)
module.exports = Ingredient