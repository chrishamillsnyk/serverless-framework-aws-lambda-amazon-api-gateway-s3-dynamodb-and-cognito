const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
// validates if input email and password are correct
function checkLogin(req, db) {
  const sqlQuery =
    "SELECT email FROM credentials WHERE " +
    "email='" + req.body.email + "' AND " +
    "password='" + req.body.password + "'";

  db.query(sqlQuery, (err, result) => {
    if (err) {
      return false;
    }

    return result.length !== 0;
  });
}

module.exports.handler = serverless(app);
