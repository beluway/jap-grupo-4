const express = require("express");
const cartRouter = express.Router();

const cartController = require("../controllers/cartController");

cartRouter.get("/");

cartRouter.get("/:id", cartController.getCartItemsById);

cartRouter.post("/:idCart/:idProduct",cartController.addItemIntoCart);

module.exports = cartRouter;