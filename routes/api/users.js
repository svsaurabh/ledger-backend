const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");

//@route POST api/user
//@desc Register User
//@access public
router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ errors: [{ message: "User already exists" }] });
        }
        user = new User({
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log(err.message);
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
