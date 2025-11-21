// Importamos los models necesarios
const cartModel = require("../models/cartModel");

const getCartById = async (req,res) =>{
const id = parseInt(req.params.id);
const cart = await cartModel.getCartById(id);

  if (user) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Carrito no encontrado" });
  }

};

const createCart = async (req, res) => {
  const createdCart = await cartModel.createCart(req.body);
  if (createdCart) {
    res.json(createdCart);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const getCartItemsById = async (req,res) =>{
const id = parseInt(req.params.id);
const cartItems = await cartModel.getCartItemsById(id);

  if (user) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Carrito no encontrado" });
  }
};

const addItemIntoCart = async (req, res) => {
  const addedItems = await cartModel.addItemIntoCart(req.body);
  if (addedItems) {
    res.json(addedItems);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};



  



