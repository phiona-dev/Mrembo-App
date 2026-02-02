require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

// Connect DB BEFORE starting server
connectDB();

const startServer = async () => {
    await connectDB();
    app.listen(3000, () => console.log("Server running"));
};

startServer();

