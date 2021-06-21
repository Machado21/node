const mongoose = require("mongoose");
// const { update } = require("../models/User");
// const appM = require("../app");
const connection = require("./UserConnection");

const Users = connection.models["User"];
// const Users = mongoose.model("users");
// const Users = appM.instance1.model("users");

module.exports = {
  //show all created articles
  async index(req, res) {
    const data = await Users.find();
    return res.json(data);
  },
  //show a particular article
  async show(req, res) {
    const data = await Users.findById(req.params.id);
    return res.json(data);
  },
  //Create and store an article
  async store(req, res) {
    Users.create(req.body).then((result) => {
      return res
        .json({
          success: true,
          message: "Article created",
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
    await Users.findById(req.params.id).then((result) => {
      Users.findByIdAndUpdate(req.params.id, req.body, {
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
    await Users.findByIdAndDelete(req.params.id)
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
