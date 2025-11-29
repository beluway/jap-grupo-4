

import { getUsuario } from "./clases/Usuario.js";
import { setUsuario } from "./clases/Usuario.js";

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("clave");

const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const claveInput = document.getElementById("clave");
  const rememberMe = document.getElementById("rememberMe");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);});


//revisamos si ya había un usuario logueado
window.addEventListener("DOMContentLoaded", () => {
    const usuario = getUsuario();
    if (usuario) {
      emailInput.value = usuario.email;
      claveInput.value = usuario.clave;
      rememberMe.checked = usuario.fromLocalStorage; // Only check if from localStorage;
    }
  });

  // Función para manejar el inicio de sesión y guardar el token
async function handleLogin(username, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Enviar credenciales en el cuerpo (req.body en tu backend)
            body: JSON.stringify({ username, password })
        });

        // Verificar si la petición fue exitosa (código 200)
        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // GUARDAR TOKEN EN localStorage 
            localStorage.setItem('jwtToken', token);
            
            console.log("Inicio de sesión exitoso. Token guardado.");
            // Aquí redirigirías al usuario a la página principal.
            return true;
        } else {
            // Manejar errores de credenciales (ej: 401 Unauthorized)
            const errorData = await response.json();
            console.error('Error de autenticación:', errorData.error);
            return false;
        }
    } catch (error) {
        console.error('Error de conexión con el servidor:', error);
        return false;
    }
}


  //función a ejecutar cuando le demos click a ingresar
loginForm.addEventListener("submit", async function(event) { //HACER ESTA FUNCIÓN ASYNC
    event.preventDefault(); // Evita que se recargue la página

    const email = emailInput.value.trim();
    const clave = claveInput.value.trim();

    if (!email || !clave) {
        alert("Por favor, completa todos los campos.");
        return;
    }


    if (rememberMe.checked){
        setUsuario(email, clave, "localStorage");
        sessionStorage.removeItem("usuario"); // Limpia sessionStorage si existía
        const usuario = getUsuario();
        //console.log que se muestra rápido para verificar que se haya guardado bien
        console.log(`Se guardó correctamente al usuario: ${usuario.email}, ${usuario.clave}`); 
    }
    else{
      setUsuario(email, clave, "sessionStorage");
        localStorage.removeItem("usuario"); //si no se marcó la opción no hay necesidad de guardar al usuario// Limpia localStorage si existía
    }
    //le paso justamente las credenciales que espera 
    const loginExitoso = await handleLogin("admin", "admin");

    // Solo redirigir si el login fue exitoso Y el token se guardó.
    if (loginExitoso) {
        // Muestra un mensaje amigable antes de redirigir
        console.log("Login y token guardado con éxito. Redirigiendo...");
        window.location.href = "index.html"; 
    } else {
        // Si no fue exitoso, la función handleLogin ya mostró el error
        alert("Error al iniciar sesión. Verifica tus credenciales.");
        return;
    }

});
  


    
 

