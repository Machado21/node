const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const app = express();

const connectProduct = require("./controllers/ProductConnection");
const connectUser = require("./controllers/UserConnection");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// console.log(typeof process.env.S3_BUCKET, process.env.S3_BUCKET); // object { BASIC : 'basic' }

connectProduct.on("error", function (error) {
  console.log(error);
});
connectProduct.once("open", function (callback) {
  console.log("Connection to Database Successful!");
});
//Segunda collection
connectUser.on("error", function (error) {
  console.log(error);
});
connectUser.once("open", function (callback) {
  console.log("Connection to Database Successful!");
});
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
