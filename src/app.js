const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/hello", (req, res) => {
  res.send("hello world");
});

app.use("/test", (req, res) => {
  res.send("test succeed");
});

app.listen(1111, () => {
  console.log("server listening on port 1111");
});
