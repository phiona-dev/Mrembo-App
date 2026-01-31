const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())

app.get("/health", (req, res) => {
    res.status(200).send("OK")
})

app.listen(3000, () => console.log("Server is listening on port 3000"))