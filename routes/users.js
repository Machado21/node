var express = require("express");
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

const UserController = require("../controllers/UserController");

//User Routes
router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", UserController.store);
router.post("/images", UserController.upload);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);
module.exports = router;
