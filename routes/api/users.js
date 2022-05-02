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
            isActive: true,
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

router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ mesage: "User does not exist" }] });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:email", async (req, res) => {
    const { firstName, lastName } = req.body;
    const updateData = { firstName, lastName, updatedAt: new Date() };
    try {
        let found = await User.findOneAndUpdate(
            { email: req.params.email },
            updateData
        );
        if (found == null) {
            return res
                .status(400)
                .json({ errors: [{ mesage: "User does not exist" }] });
        }
        await res.status(200).json({
            message: "User has been successfully updated",
            data: found,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
});

router.delete("/:email", async (req, res) => {
    try {
        let found = await User.findOneAndUpdate(
            { email: req.params.email, isActive: true },
            { isActive: false }
        );
        if (found == null) {
            return res
                .status(400)
                .json({ errors: [{ mesage: "User does not exist" }] });
        }
        await res
            .status(200)
            .json({ message: "User has been successfully deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;
