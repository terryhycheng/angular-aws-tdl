const serverless = require("serverless-http");
const express = require("express");
const priseClient = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { verifyAuthToken } = require("./routes/verify");
const { toDo_routes } = require("./routes/toDo");
const { auth_routes } = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

toDo_routes(app);
auth_routes(app);

module.exports.handler = serverless(app);
