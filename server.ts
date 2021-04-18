const express = require("express");
const app = express();

app.listen(3030, function () {
  console.log("3030 vai ");
});

app.get("/", (req, res) => {
  res.send("Hello world2");
});
