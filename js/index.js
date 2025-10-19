import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", function () { 

    const usuario = getUsuario();
    const userNameElement = document.getElementById("userName");
    userNameElement.textContent = usuario.email;
    });

    //Modo Oscuro
const chkOscuro = document.getElementById('toggleDarkMode');
const divFondo = document.getElementById('fondo');
const jumbotron = document.getElementById('jumbotron');


    // Aplicar preferencia al cargar la página
window.addEventListener('load', () => {
  const modo = localStorage.getItem('modoOscuro');
  if (modo === "true") {
    divFondo.classList.add("dark-mode");
    chkOscuro.checked = true;
  } else {
    divFondo.classList.remove("dark-mode");
    chkOscuro.checked = false;
  }
});

// Cambiar modo oscuro y guardar preferencia
chkOscuro.addEventListener('change', () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  jumbotron.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem('modoOscuro', chkOscuro.checked);
});