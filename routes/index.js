const router = require("express").Router();

router.use("/user", require("./api/user"));
router.use("/users", require("./api/users"));
router.use("/auth", require("./api/auth"));
module.exports = router;
