const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nome do produto é obrigatório"],
    },
    price: {
      type: Number,
      required: [true, "Valor do produto é obrigatório"],
    },
    qty: {
      type: String,
      required: [true, "Quantidade do produto é obrigatória"],
    },
    brand: {
      type: String,
      required: [true, "Marca o produto é obrigatória"],
    },
    tags: {
      type: [String],
      required: [true, "Deve conter no mínimo 1 categoria"],
    },
  },
  { collection: "produtos" }
);

module.exports = productSchema;
