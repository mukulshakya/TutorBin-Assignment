const loki = require("lokijs");
const db = new loki("sandbox.db");

const users = db.addCollection("users");
const todos = db.addCollection("todos");

module.exports = {
  users,
  todos,
};
