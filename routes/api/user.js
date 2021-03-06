const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const middleware = require("../middleware/auth");

//@route POST api/user
//@desc Register User
//@access public
router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        let user = await User.findOne({ email, isActive: true });
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

//@route GET api/user
//@desc Get User by email
//@access public
router.get("/:email", middleware, async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.params.email,
            isActive: true,
        }).select("-password");
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ message: "User does not exist" }] });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

//@route PUT api/user/:email
//@desc Update User by email id
//@access public
router.put("/:email", middleware, async (req, res) => {
    const { firstName, lastName } = req.body;
    const updateData = { firstName, lastName, updatedAt: new Date() };
    try {
        const found = await User.findOneAndUpdate(
            { email: req.params.email, isActive: true },
            updateData
        ).select("-password");
        if (found == null) {
            return res
                .status(400)
                .json({ errors: [{ message: "User does not exist" }] });
        }
        found.firstName = updateData.firstName;
        found.lastName = updateData.lastName;
        found.updatedAt = updateData.updatedAt;
        res.status(200).json({
            message: "User has been successfully updated",
            data: found,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
});

//@route DELETE api/users/email
//@desc Delete User by email ????????????
//@access public
router.delete("/:email", middleware, async (req, res) => {
    try {
        let found = await User.findOneAndUpdate(
            { email: req.params.email, isActive: true },
            { isActive: false }
        );
        if (found == null) {
            return res
                .status(400)
                .json({ errors: [{ message: "User does not exist" }] });
        }
        res.status(200).json({ message: "User has been successfully deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;
