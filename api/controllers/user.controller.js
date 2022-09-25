const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db");

const saltRounds = 10;

exports.signUp = async (req, res) => {
  const requiredKeys = ["username", "password"];
  for (const key of requiredKeys) {
    if (!req.body[key] || !req.body[key].trim())
      return res.badRequest(`${key} is required`);
    else req.body[key] = req.body[key].trim();
  }

  const { username, password } = req.body;
  const passwordPattern = /^[a-z0-9]{6,}$/i;

  const usernameTaken = db.users.findOne({ username });
  if (usernameTaken) return res.badRequest("Username is already taken");

  if (!passwordPattern.test(password))
    return res.badRequest("Password should be alphanumeric");

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  db.users.insert({ username, password: hashedPassword });

  return res.created("Signup successfull");
};

exports.login = async (req, res) => {
  const requiredKeys = ["username", "password"];
  for (const key of requiredKeys) {
    if (!req.body[key] || !req.body[key].trim())
      return res.badRequest(`${key} is required`);
    else req.body[key] = req.body[key].trim();
  }

  const { username, password } = req.body;

  const user = db.users.findOne({ username });
  if (!user) return res.notFound("user not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.unAuth("Incorrect password");

  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return res.ok({ username, token }, "Login successfull");
};
