var express = require("express");
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

const ProductController = require("../controllers/ProductController.js");

//Product Routes
router.get("/", ProductController.index);
router.get("/:id", ProductController.show);
router.post("/", ProductController.store);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.destroy);
module.exports = router;
