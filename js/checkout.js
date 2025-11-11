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
};

// ========== MODAL TRANSFERENCIA BANCARIA ==========
const btnTransferencia = document.getElementById('aceptar-trans');
const modalTansferencia = document.getElementById('modal-transfer')

btnTransferencia.addEventListener('click',()=>{

    const origen = document.getElementById("cuenta-origen").value.trim();
    const importe = document.getElementById("importe").value.trim();
    const moneda = document.getElementById("moneda").value.trim();
    const asunto = document.getElementById("asunto").value.trim();

    if(!origen || !importe || !moneda || !asunto){
      alert("Por favor complete todos los campos.");
      return;
    }

    const transferencia = { origen, importe, moneda, asunto};
    localStorage.setItem("transferencia", JSON.stringify(transferencia));

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(modalTansferencia);
    modal.hide();
    });