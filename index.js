require("dotenv").config();
const express = require("express");
const app = express();
const api = require("./api");

const PORT = process.env.port || 3030;

// Parse request body
app.use(express.json());

app.use((req, res, next) => {
  Object.assign(res, require("./utils/response.util"));
  return next();
});

// Ping route
app.get("/", (req, res) => {
  return res.send("OK");
});

// Register routes
app.use(api);

// error handler
app.use((err, req, res, next) => err && res.unexpected());

// Spin up server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
