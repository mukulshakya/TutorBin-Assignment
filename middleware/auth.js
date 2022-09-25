const jwt = require("jsonwebtoken");
const db = require("../db");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.unAuth("Auth token is required");

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.users.findOne({ username: decoded.username });
    if (!user) return res.notFound("User not found");

    req.user = user;

    return next();
  } catch (err) {
    return res.unAuth("Auth token is invalid");
  }
};
