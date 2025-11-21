const express = require("express");
/* const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA"; */

// Aquí importamos los routers
const cartRouter = require("./routes/cartRoute");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>¡Bienvenido al servidor del grupo 4!</h1>");
});


// Middleware que autoriza a realizar peticiones a /cart
/* app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
}); */

// Asociamos el router de people con la ruta /people
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


