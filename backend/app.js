
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mariadb = require("mariadb");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root", //cambiar la contraseña
  port: 3307, //cambiar por el verdadero puerto
  multipleStatements: true,
};

// Creamos un pool TEMPORAL sin 'database'
let dbPool = mariadb.createPool(dbConfig); 

// Función para inicializar la DB
async function initializeDatabase() {
    let conn;
    try {
        // Usamos el pool temporal para ejecutar el script
        conn = await dbPool.getConnection();

        // 1. Leer el script SQL (asumimos que incluye CREATE DATABASE)
        const sqlScriptPath = path.join(__dirname, 'ecommerce.sql');
        const sql = fs.readFileSync(sqlScriptPath, 'utf8');

        console.log("Ejecutando script de inicialización de la base de datos...");
        
        // 2. Ejecutar todas las consultas
        await conn.query(sql); 

        console.log("Base de datos y tablas creadas exitosamente.");
        
        // 3. 🚨 Reconfiguramos y recreamos el pool global para la DB 'ecommerce'
        const finalDbConfig = { 
            ...dbConfig, 
            database: 'ecommerce', 
            multipleStatements: false 
        };

        dbPool.end(); 
        dbPool = mariadb.createPool(finalDbConfig);
        console.log("Pool de conexiones listo para la aplicación.");
        
    } catch (err) {
        console.error("ERROR al inicializar la DB:", err);
    } finally {
        if (conn) conn.release();
    }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const SECRET_KEY = "CLAVESECRETA";

// NOTA: Asume que 'verificarToken.js' existe y exporta la función
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
// RESTO DE RUTAS PROTEGIDAS
// =============================

const apiRouter = express.Router();
apiRouter.use(verificarToken);

const dataDir = path.join(__dirname, 'emercado-api');
console.log('dataDir:', dataDir);

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

app.use('/emercado-api', apiRouter);

app.use('/emercado-api', express.static(path.join(__dirname, 'emercado-api')));

// Envuelve la inicialización antes de iniciar el servidor
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`API is running on http://localhost:${PORT}`);
    });
});


