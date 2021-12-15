var express = require("express");
var router = express.Router();
var homeController = require("../controllers/HomeController");
router.route("/").get(homeController.getHome);
router.route("/:color").get(homeController.getColor);
module.exports = router;
