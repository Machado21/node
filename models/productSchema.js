const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nome do produto é obrigatório"],
    },
    valor: {
      type: String,
      required: [true, "Valor do produto é obrigatório"],
    },
    categoria: {
      type: String,
      required: [true, "Categoria do produto é obrigatória"],
    },
    purchaseMethod: {
      type: String,
      required: [true, "Categoria do produto é obrigatória"],
    },
  },
  { collection: "sales" }
);

module.exports = productSchema;