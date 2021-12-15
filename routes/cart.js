var express = require("express");
var router = express.Router();
var cart = require("../controllers/CartController");

router.route("/").post(cart.addToCart).put(cart.updateItems);
router.route("/items").get(cart.getItems);
module.exports = router;
