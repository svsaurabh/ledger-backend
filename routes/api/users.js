const router = require("express").Router();
const User = require("../../models/Users");
const middleware = require("../middleware/auth");

//@route GET api/users
//@desc Get All Users
//@access public
router.get("/", middleware, async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
