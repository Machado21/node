const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Title of blog is required"],
    },
    email: {
      type: String,
      required: [true, "Content of the blog is required"],
    },
    password: {
      type: String,
      required: [true, "Name of author is required"],
    },
  },
  { collection: "users" }
);

module.exports = userSchema;
