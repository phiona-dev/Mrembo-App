const router = require("express").Router();

router.post("/signup", async (req, res) => {
    console.log("Signup route")
    console.log(req.body)
    res.json({ message: "Route working" })

})

module.exports = router;