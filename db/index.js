const loki = require("lokijs");
const db = new loki("sandbox.db");

const users = db.addCollection("users");

module.exports = {
  users,
};
