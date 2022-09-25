const bcrypt = require("bcrypt");
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
