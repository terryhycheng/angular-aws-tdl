const serverless = require("serverless-http");
const express = require("express");
const { toDo_routes } = require("./routes/toDo");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

// app.listen(5000, () => {
//   console.log(`Server is running on port 5000!`);
// });

toDo_routes(app);

module.exports.handler = serverless(app);
