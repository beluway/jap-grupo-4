/* const express = require("express"); */
/* const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA"; */

// Aquí importamos los routers
/* const cartRouter = require("../routes/cartRoute");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>¡Bienvenido al servidor del grupo 4!</h1>");
}); */


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
/* app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
 */

/* const express = require("express");
const cors = require("cors");

// Routers (correctamente referenciados)
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cartRoute");

const app = express();
const port = 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta inicial
app.get("/", (req, res) => {
  res.send("<h1>¡Bienvenido al servidor del grupo 4!</h1>");
});

// Rutas API públicas para JSONs
app.use("/api", apiRouter);

// Rutas de autenticación (POST /auth/login)
app.use("/auth", authRouter);

// Carrito (protegido con JWT por tu authMiddleware)
app.use("/cart", cartRouter);

// Inicializamos servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
 */
/* const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); */
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
// Middleware para parsear JSON (usado comúnmente en peticiones API, como para el login)
app.use(express.json());
// Middleware para parsear datos de formularios (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const SECRET_KEY = "CLAVESECRETA";

// Importa el middleware
const verificarToken = require('./middleware/verificarToken'); 



// =============================
// LOGIN (ruta pública)
// =============================
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});


// =============================
// RUTAS PROTEGIDAS
// =============================

const apiRouter = express.Router();
apiRouter.use(verificarToken);

// Carpeta donde están los JSON
const dataDir = path.join(__dirname, 'emercado-api');
console.log('dataDir:', dataDir);

// Conecta el router a la aplicación
app.use('/emercado-api', apiRouter);

apiRouter.get('/:folder/:file', (req, res) => {
  const folder = req.params.folder;
  const file = req.params.file;

  const filePath = path.join(dataDir, folder, `${file}.json`);
  console.log("Buscando:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'JSON file not found' });
  }

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ error: 'Error reading JSON file' });
  }
});

// Monta el router protegido
app.use('/emercado-api', apiRouter);

// Para servir los JSON de emercado-api
app.use('/emercado-api', express.static(path.join(__dirname, 'emercado-api')));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  });



/* // Base folder where your JSONs are stored (project root: one level up from backend)
const dataDir = path.join(__dirname, '..', 'emercado-api');
// Helpful log so you can see the resolved path when the server starts
console.log('dataDir:', dataDir); */


//PAUTA 2
//Metodo GET que obtiene los archivos JSON
//le pasamos parametros folder(subcarpeta dentro de emercado-api) y file(nombre o id del JSON)

/* //apiRouter.get ... para proteger estas rutas también
app.get('/:folder/:file', (req, res) => { 
  const folder = req.params.folder;
  const file = req.params.file;


  const filePath = path.join(dataDir, folder, `${file}.json`);


  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'JSON file not found' });
  }


  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ error: 'Error reading JSON file' });
  }
});


app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
}); */


