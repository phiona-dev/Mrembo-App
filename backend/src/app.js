const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route")
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/", categoryRoutes);
app.use("/", productRoutes);

// Routes
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});


module.exports = app

