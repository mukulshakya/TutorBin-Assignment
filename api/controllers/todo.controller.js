const db = require("../../db");

exports.createTodo = async (req, res) => {
  const requiredKeys = ["todo", "dateTime"];
  for (const key of requiredKeys) {
    if (!req.body[key] || !req.body[key].trim())
      return res.badRequest(`${key} is required`);
    else req.body[key] = req.body[key].trim();
  }

  const { todo, dateTime } = req.body;

  if (new Date(dateTime).toString() === "Invalid Date")
    return res.badRequest("Invalid date time format");

  db.todos.insert({
    username: req.user.username,
    todo,
    dateTime: new Date(dateTime),
    status: "pending",
    createdAt: new Date(),
  });

  return res.created("Todo created");
};
