const express = require("express");
const controller = require("../controllers/todo.controller");

const router = express.Router();

router.post("/", controller.createTodo);
router.get("/", controller.getTodos);
router.route("/:id").get(controller.getOneTodo).delete(controller.deleteTodo);

module.exports = router;
