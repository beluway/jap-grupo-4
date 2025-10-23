import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", function () { 

    const usuario = getUsuario();
    const userNameElement = document.getElementById("userName");
    userNameElement.textContent = usuario.email;
    });
