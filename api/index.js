const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.use("/users", require("./routes/user.route"));
router.use("/todos", auth, require("./routes/todo.route"));

module.exports = router;
