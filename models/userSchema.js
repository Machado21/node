const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nome do usuário é obrigatório!"],
    },
    email: {
      type: String,
      required: [true, "E-mail do usuário é obrigatório!"],
    },
    password: {
      type: String,
      required: [true, "Senha do usuário é obrigatório!"],
    },
    image: {
      type: String,
    },
    cart: {
      type: Schema.Types.Mixed,
    },
  },
  { collection: "usuarios" }
);

module.exports = userSchema;
