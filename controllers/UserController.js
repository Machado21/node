const mongoose = require("mongoose");
// const { update } = require("../models/User");
// const appM = require("../app");
const connection = require("./UserConnection");
const multiparty = require("multiparty");
require("dotenv").config();
const fs = require("fs");
const fileType = require("file-type");
const uploadFile = require("./ImageController");
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
  async upload(req, res) {
    console.log("ENTROU UPLOAD");
    // let produtoNovo = req.body;
    // console.log(req.body);

    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      // console.log(req);
      console.log(files);
      console.log(fields);
      if (error) {
        return res.status(500).send(error);
      }
      try {
        const path = files.image[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const fileName = `images/${Date.now().toString()}`;
        const fileURL = await uploadFile.uploadFileFirebase(buffer, fileName, type, process.env.FB_BCKT_PRO);
        var campos = new Object();
        for (var [key, value] of Object.entries(fields)) {
          campos[key] = value.toString();
        }
        campos["image"] = fileURL;
        // campos["image"] = "https://s3.amazonaws.com/rodrigues.user.bucket/" + fileName + "." + type.ext;
        console.log(campos);
        Users.create(campos).then((result) => {
          console.log(result);
        });

        return res.status(200).send(fileURL);
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });

    // Products.create(produtoNovo).then((result) => {
    //   console.log(result);
    // });
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
