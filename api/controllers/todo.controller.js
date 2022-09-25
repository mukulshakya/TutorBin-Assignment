const { uuid, isUuid } = require("uuidv4");
const db = require("../../db");

exports.createTodo = async (req, res) => {
  try {
    const requiredKeys = ["todo", "dateTime"];
    for (const key of requiredKeys) {
      if (!req.body[key] || !req.body[key].trim())
        return res.badRequest(`${key} is required`);
      else req.body[key] = req.body[key].trim();
    }

    const { todo, dateTime } = req.body;

    if (new Date(dateTime).toString() === "Invalid Date")
      return res.badRequest("Invalid date time format");

    const todoExists = db.todos.findOne({ todo: todo.toLowerCase() });
    if (todoExists) return res.badRequest("Todo already exists");

    db.todos.insert({
      id: uuid(),
      username: req.user.username,
      todo: todo.toLowerCase(),
      dateTime: new Date(dateTime),
      status: "pending",
      createdAt: new Date(),
    });

    return res.created("Todo created");
  } catch (e) {
    return res.unexpected();
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = db.todos
      .find({})
      .map(({ id, username, todo, dateTime, status, createdAt }) => ({
        id,
        username,
        todo,
        dateTime,
        status,
        createdAt,
      }));

    return res.ok(todos);
  } catch (e) {
    return res.unexpected();
  }
};

exports.getOneTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return res.badRequest("Invalid id");

    const todo = db.todos.findOne({ id });
    if (!todo) return res.notFound("Todo not found");

    return res.ok({
      id: todo.id,
      username: todo.username,
      todo: todo.todo,
      dateTime: todo.dateTime,
      status: todo.status,
      createdAt: todo.createdAt,
    });
  } catch (e) {
    return res.unexpected();
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return res.badRequest("Invalid id");

    const todo = db.todos.findOne({ id });
    if (!todo) return res.notFound("Todo not found");

    db.todos.remove(todo);

    return res.noContent();
  } catch (e) {
    return res.unexpected();
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isUuid(id)) return res.badRequest("Invalid id");

    const todoExist = db.todos.findOne({ id });
    if (!todoExist) return res.notFound("Todo not found");

    const allowedKeys = ["todo", "dateTime"];
    for (const key of allowedKeys) {
      if (req.body[key] && !req.body[key].trim())
        return res.badRequest(`${key} is missing`);
      else req.body[key] = req.body[key].trim();
    }

    const { todo, dateTime } = req.body;
    if (todo) {
      const nameTaken = db.todos.findOne({
        todo: todo.toLowerCase(),
        id: { $ne: id },
      });
      if (nameTaken) return res.badRequest("Todo already exists");

      todoExist.todo = todo.toLowerCase();
    }
    if (dateTime) {
      if (new Date(dateTime).toString() === "Invalid Date")
        return res.badRequest("Invalid date time format");

      todoExist.dateTime = new Date(dateTime);
    }

    db.todos.update(todoExist);

    return res.noContent();
  } catch (e) {
    return res.unexpected();
  }
};
