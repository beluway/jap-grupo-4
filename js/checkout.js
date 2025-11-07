// ========== USUARIO EN NAVBAR ==========
import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  if (usuario && userNameElement) {
    userNameElement.textContent = usuario.email;
  }
});

// ========== MODO OSCURO ==========
const divFondo = document.getElementById("fondo");
const chkOscuro = document.getElementById("toggleDarkMode");

chkOscuro.addEventListener("change", () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem("modoOscuro", chkOscuro.checked);
});

if (localStorage.getItem("modoOscuro") === "true") {
  chkOscuro.checked = true;
  divFondo.classList.add("dark-mode");
}