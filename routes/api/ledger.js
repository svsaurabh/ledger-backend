/**
 * @author Shriyansh
 */
const router = require("express").Router();
const Ledger = require("../../models/Ledger");
const middleware = require("../middleware/auth");

//@route POST api/ledger
//@desc Register ledger
//@access public
router.post("/", middleware, async (req, res) => {
    const { id, name, description, createdBy, createdAt, updatedAt } = req.body;
    try {
        let ledger = await Ledger.findOne({ name, createdBy });
        if (ledger) {
            return res
                .status(400)
                .json({ error: [{ message: "User already exists" }] });
        }
        ledger = new Ledger({
            id,
            name,
            description,
            createdBy: req.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await ledger.save();
        res.status(201).json({ message: "Ledger is creaeted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

//@route GET api/ledger/:_id
//@desc Get ledger records through id
//@access public
router.get("/:_id", middleware, async (req, res) => {
    try {
        const user = await Ledger.findOne({ _id: req.params._id });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

//@route GET api/ledger/:user id
//@desc Get ledger records through user id
//@access public
router.get("/", middleware, async (req, res) => {
    // console.log(req);
    try {
        const user = await Ledger.find({ createdBy: req.user.id });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

//@route PUT api/ledger
//@desc Update description by user id
//@access public
router.put("/:_id", middleware, async (req, res) => {
    const { description } = req.body;
    const updatedData = { description, updatedAt: new Date() };
    try {
        const found = await Ledger.findByIdAndUpdate(
            { _id: req.params._id },
            updatedData
        );
        console.log(found);
        if (found == null) {
            return res
                .status(400)
                .json({ error: [{ message: "User does not exist" }] });
        }
        found.description = updatedData.description;
        found.updatedAt = updatedData.updatedAt;
        res.status(200).json({
            message: "User has been updated",
            data: found,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:_id", middleware, async (req, res) => {
    try {
        const user = await Ledger.deleteOne({ _id: req.params._id });
        res.status(200).json({
            message: "Ledger deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
});
module.exports = router;
