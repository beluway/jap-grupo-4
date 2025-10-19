

import { Usuario } from "./clases/Usuario.js";
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


  //función a ejecutar cuando le demos click a ingresar
loginForm.addEventListener("submit", function(event) {
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

    window.location.href = "index.html"; //redirige a la página principal

});
  


    
 

