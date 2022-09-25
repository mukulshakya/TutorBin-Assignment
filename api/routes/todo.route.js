const express = require("express");
const controller = require("../controllers/todo.controller");

const router = express.Router();

router.post("/", controller.createTodo);

module.exports = router;
