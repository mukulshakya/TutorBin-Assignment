const express = require("express");
const controller = require("../controllers/todo.controller");

const router = express.Router();

router.route("/").post(controller.createTodo).get(controller.getTodos);
router
  .route("/:id")
  .get(controller.getOneTodo)
  .delete(controller.deleteTodo)
  .put(controller.updateTodo);

module.exports = router;
