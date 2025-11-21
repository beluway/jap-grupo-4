const express = require("express");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "e_commerce",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

/**
 * Inserta un producto en el carrito o actualiza su cantidad si ya existe.
 */
const addItemIntoCart = async (cartId, productId, quantity = 1) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // 1. Verificar si el producto ya está en el carrito.
        const [existingItem] = await conn.query(
            `SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId]
        );

        let response;
        if (existingItem) {
            // 2. Si existe, actualizar la cantidad: sumar la nueva cantidad a la existente.
            const newQuantity = existingItem.quantity + quantity;
            response = await conn.query(
                `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?`,
                [newQuantity, cartId, productId]
            );
            console.log(`Producto ${productId} actualizado en carrito ${cartId}. Nueva cantidad: ${newQuantity}`);

        } else {
            // 3. Si no existe, insertar el nuevo registro.
            response = await conn.query(
                `INSERT INTO cart_items(cart_id, product_id, quantity) VALUE(?, ?, ?)`,
                [cartId, productId, quantity]
            );
            console.log(`Producto ${productId} insertado en carrito ${cartId} con cantidad: ${quantity}`);
        }
        
        // Retornar la respuesta (podría ser el resultado de INSERT o UPDATE)
        return response; 

    } catch (error) {
        // En un entorno de producción, es importante manejar el error (e.g., retornar un error específico).
        console.error("Error al insertar producto en carrito:", error); 
        return false;
    } finally {
        if (conn) conn.release(); // Devolver la conexión al pool
    }
};

const createCart = async (cart) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO carts(subtotal, total) VALUE(?, ?)`,
      [cart.subtotal, cart.total]
    );

    return { id: parseInt(response.insertId), ...cart };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const getCartById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT subtotal, total FROM carts WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const getCartItemsById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT cartId, productId, quantity FROM car_items WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};



module.exports = {
  createCart,
  addItemIntoCart,
  getCartById,
  getCartItemsById,
};

