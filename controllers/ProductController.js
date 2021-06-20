const mongoose = require("mongoose");
// const appM = require("../app");

// const { update } = require("../models/Product");
const connection = require("./ProductConnection");

// console.log(connection);
// console.log(connection);
// console.log("##############################");
const Products = connection.models["Product"];
// const Products = connection.models["Product"];
// console.log(typeof Products);
// const Products = mongoose.model("products");
// const Products = appM.instace2.model("products");

module.exports = {
  //show all created articles
  async index(req, res) {
    const data = await Products.find();
    return res.json(data);
  },
  //show a particular article
  async show(req, res) {
    const data = await Products.findById(req.params.id);
    return res.json(data);
  },
  //Create and store an article
  async store(req, res) {
    Products.create(req.body).then((result) => {
      return res
        .json({
          success: true,
          message: "Product created",
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: err,
          });
        });
    });
  },
  //Update existing blog
  async update(req, res) {
    await Products.findById(req.params.id).then((result) => {
      Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .then((result) => {
          return res.json({
            success: true,
            message: "Article updated",
          });
        })
        .catch((err) => ({
          success: false,
          message: err,
        }));
    });
  },
  //Delete category
  async destroy(req, res) {
    await Products.findByIdAndDelete(req.params.id)
      .then((result) => {
        return res.json({
          success: true,
          message: "Article deleted",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          success: false,
          message: err,
        });
      });
  },
};
