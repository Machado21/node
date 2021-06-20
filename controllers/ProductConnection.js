const mongoose = require("mongoose");
const productSchema = require("../models/productSchema");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
//URL of the database
const DB_CONNECT =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/sample_mflix?retryWrites=true&w=majority";
//URL segunda database connectionconst
const DB_CONNECT2 =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/sample_supplies?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3030;

const conn = mongoose.createConnection(DB_CONNECT2, options); //Se der errado olhar esta linha
const UserModel = conn.model("Product", productSchema);

module.exports = conn;
//module.exports = UserModel;
