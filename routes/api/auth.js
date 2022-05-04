const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/Users");
const middleware = require("../middleware/auth");

//@route   Get api/auth
//@desc    Test Route
//@access  Public
router.get("/", middleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   POST api/auth
//@desc    Authenticate user & get token
//@access  Public
router.post("/login", async (req, res) => {
    const jwtSecret = process.env.SECRET;
    const { email, password } = req.body;
    try {
        // if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(403)
                .json({ errors: [{ message: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(403)
                .json({ errors: [{ message: "Invalid Credentials" }] });
        }

        // Return Json Token
        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;
