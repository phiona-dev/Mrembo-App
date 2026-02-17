const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")

const saltRounds = 10;

router.post("/signup", async (req, res) => {
    
    try{
        const { email, password, name } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Email and password required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser){
            return res.status(400).json({ message: "Email already registered"})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date()
        })

        await newUser.save();

        return res.status(201).json({ message: "User created successfully"})

    }catch (error){
        console.error(error);
        return res.status(500).json({ message: "Server error"})
    }
    

})

module.exports = router;