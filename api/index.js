const express = require("express");
const router = express.Router();

router.use("/users", require("./routes/user.route"));

module.exports = router;
