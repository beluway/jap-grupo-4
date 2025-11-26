// middleware/verificarToken.js

const jwt = require('jsonwebtoken');

// Clave secreta: DEBE ser la misma que usaste para firmar el token en el login.
// Es mejor almacenarla como una variable de entorno.
const JWT_SECRET = 'CLAVESECRETA'; 

function verificarToken(req, res, next) {
    // 1. Obtener el encabezado de autorización
    // El token generalmente viene en el formato: Authorization: Bearer [token]
    const authHeader = req.headers['authorization'];
    
    // Si no hay encabezado, o si no tiene el formato "Bearer <token>", denegar.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado o formato incorrecto.' });
    }
    
    // 2. Extraer el token (quitando "Bearer ")
    const token = authHeader.split(' ')[1];

    // 3. Verificar el token
    try {
        // jwt.verify decodifica el token usando la clave secreta
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Adjuntamos la información decodificada (por ejemplo, el ID de usuario) al objeto req
        // para que la ruta pueda acceder a ella.
        req.user = decoded; 
        
        // 4. Si es válido, pasar al siguiente middleware o a la ruta final
        next(); 
    } catch (err) {
        // Si hay un error (token expirado, inválido, mal firmado)
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}

module.exports = verificarToken;