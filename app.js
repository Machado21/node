const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// const instance2 = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const app = express();
//Começa aqui
const connect = require("./controllers/ProductConnection");
// console.log(conect);
// var Mongoose = require("mongoose").Mongoose;
// var instance1 = new Mongoose();
// var instance2 = new Mongoose();
// var Mongoose = require("mongoose").Mongoose;
// const instance1 = new Mongoose();
//Terminar aqui

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//COMEÇA AQUI
//TERMINA AQUI

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

//COMEÇA aqui
//TERMINA AQUI
/* 
//URL of the database
const DB_CONNECT =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/sample_mflix?retryWrites=true&w=majority";
//URL segunda database connectionconst
const DB_CONNECT2 =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/sample_supplies?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3030;

// connect to database
mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//COMEÇA AQUI

//TERMINAR AQUI

// instance2.connect(DB_CONNECT2, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

//Test the connection
let db = mongoose.connection;
*/
connect.on("error", function (error) {
  console.log(error);
});
connect.once("open", function (callback) {
  console.log("Connection to Database Successful!");
});

//Segunda database
// let db2 = instance2.connection;

// db2.on("error", function (error) {
//   console.log(error);
// });
// db2.once("open", function (callback) {
//   console.log("Connection to Database Successful!");
// });

//Segunda database
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// module.exports = instance1;
// module.exports = instance2;
//https://dev.to/ziishaned/open-multiple-mongodb-connection-in-express-js-app-36be
