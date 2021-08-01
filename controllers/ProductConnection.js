const mongoose = require("mongoose");
const productSchema = require("../models/productSchema");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
//URL of the database
const DB_CONNECT_Old2 =
  "mongodb://admin:admin@basecluster-shard-00-00.hirbx.mongodb.net:27017,basecluster-shard-00-01.hirbx.mongodb.net:27017,basecluster-shard-00-02.hirbx.mongodb.net:27017/produtosDB?ssl=true&replicaSet=atlas-12fzsk-shard-0&authSource=admin&retryWrites=true&w=majority";
const DB_CONNECT =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/produtosDB?retryWrites=true&w=majority";
//URL segunda database connectionconst
const DB_CONNECT2 =
  process.env.DB_CONNECT ||
  "mongodb+srv://admin:admin@basecluster.hirbx.mongodb.net/produtosDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3030;

const conn = mongoose.createConnection(DB_CONNECT_Old2, options); //Se der errado olhar esta linha
const ProductModel = conn.model("Product", productSchema);

module.exports = conn;
//module.exports = UserModel;
