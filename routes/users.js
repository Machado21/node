var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const UserController = require("../controllers/UserController");

//User Routes
router.get("/users", UserController.index);
router.get("/user/:id", UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);
console.log(router);
module.exports = router;
