const serverless = require("serverless-http");
const express = require("express");
const { toDo_routes } = require("./routes/toDo");
const { auth_routes } = require("./routes/user");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

toDo_routes(app);
auth_routes(app);

module.exports.handler = serverless(app);
