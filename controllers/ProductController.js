const multer = require("multer");
const mongoose = require("mongoose");
const multiparty = require('multiparty');

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
    let produtoNovo = req.body;
    //produtoNovo["img"] = req.file.buffer;
    console.log(req.body);
    //console.log("Req file ");
    //console.log(req.file);
    // let produtoNovo = req.body;
    // produtoNovo["img"] = req.file;
    // console.log(req.file.buffer);
    
    //req.body e produto são objetos javascript, portanto não podem ser iterados como um vetor
    //Assim tive de iterar por um e pegar as propriedades do outro
    //Solução para mais valores:
    //(1) iterar em um objeto com for
    //(2) passar para um vetor todos os valores
    //(3) iterar no OUTRO objeto e atribuir a partir de um índice do vetor copiado anteriormente

    Products.create(produtoNovo).then((result) => {
      // console.log(req.body);
      console.log(result);
      // return res
      //   .json({
      //     success: true,
      //     message: "Product created",
      //   })
      //   .catch((err) => {
      //     return res.json({
      //       success: false,
      //       message: err,
      //     });
      //   });
    });
  },

  async upload(req, res) {
    let produtoNovo = req.body;
    console.log(req.body);

    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response.status(500).send(error);
      };
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const fileName = `bucketFolder/${Date.now().toString()}`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (err) {
        return response.status(500).send(err);
      }
    });

    // Products.create(produtoNovo).then((result) => {
    //   console.log(result);
    // });
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
