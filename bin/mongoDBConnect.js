const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  Conectou
);

function Conectou() {
  console.log("Conectado");
}

module.exports = mongoose;
//https://stackoverflow.com/questions/34558140/what-is-the-best-practice-to-connect-disconnect-to-a-database
