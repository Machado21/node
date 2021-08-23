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
      required: [true, "Marca do produto é obrigatória"],
    },
    tags: {
      type: [String],
      required: [true, "Deve conter no mínimo 1 categoria"],
    },
<<<<<<< HEAD
    // img: {
    //   type: Buffer,
    // },
=======
    img: {
      type: [Buffer],
      required: [true, "Deve conter no mínimo 1 imagem"],
    },
>>>>>>> 152cc24c3bc795dc7a4df789ab1cd55dda7c1f50
  },
  { collection: "produtos" }
);

module.exports = productSchema;
