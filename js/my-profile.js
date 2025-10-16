/* 
import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.querySelector("#userName");
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");
  const email = document.querySelector("#email");
  const telefono = document.querySelector("#telefono");
  const guardarBtn = document.querySelector("#guardar");
  const cancelarBtn = document.querySelector("#cancelar");
  const inputImagen = document.querySelector("#perfil-img");
  const icono = document.querySelector("#icono");

   // --- Ocultamos el input de imagen ---
  inputImagen.style.display = "none";

    // --- Al hacer clic en el ícono, abrir selector ---
  icono.addEventListener("click", () => {
    inputImagen.click();
  });

  // --- Cuando el usuario elige una imagen ---
  inputImagen.addEventListener("change", () => {
    const archivo = inputImagen.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      const base64 = lector.result;
      icono.innerHTML = `<img src="${base64}" alt="Foto de perfil" class="foto-perfil">`;

      // Guardar en localStorage
      const datos = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
      datos.imagen = base64;
      localStorage.setItem("perfilUsuario", JSON.stringify(datos));
    };
    lector.readAsDataURL(archivo);
  });

  // Obtener el usuario logeado
const usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));

//obtengo el usuario logueado para mostrarlo en el nav
userNameElement.textContent = usuario.email;

// Cargar perfil guardado del localStorage (si existe)
const datosPerfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario"));

// precarga correo si no hay datos, si hay datos los muestra
if (datosPerfilGuardado == null) {
  email.value = usuarioLogeado.email;
} else if (datosPerfilGuardado){
  nombre.value = datosPerfilGuardado.nombre || "";
  apellido.value = datosPerfilGuardado.apellido || "";
  email.value = datosPerfilGuardado.email || "";
  telefono.value = datosPerfilGuardado.telefono || "";
}

  // Guardar datos al hacer clic en "Guardar"
  guardarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!nombre.value.trim() || !apellido.value.trim() || !email.value.trim() || !telefono.value.trim()) {
      alert("❗ Por favor, completa todos los campos obligatorios.");
      return;
    } else {

    const datosPerfil = {
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      email: email.value.trim(),
      telefono: telefono.value.trim(),
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(datosPerfil));
    alert("✅ Datos guardados correctamente");
}});
// Mantiene imagen anterior
    const guardado = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
    perfil.imagen = guardado.imagen || null;

  // Opcional: limpiar los campos con el botón "Cancelar"
  cancelarBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    nombre.value = "";
    apellido.value = "";
    email.value = "";
    telefono.value = "";
    localStorage.removeItem("perfilUsuario");
  });
});


const chkOscuro = document.getElementById('toggleDarkMode');
const divFondo = document.getElementById('fondo');

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
  localStorage.setItem('modoOscuro', chkOscuro.checked);
});
 */

import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.querySelector("#userName");
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");
  const email = document.querySelector("#email");
  const telefono = document.querySelector("#telefono");
  const guardarBtn = document.querySelector("#guardar");
  const cancelarBtn = document.querySelector("#cancelar");
  const inputImagen = document.querySelector("#perfil-img");
  const icono = document.querySelector("#icono");


  // --- Ocultamos el input de imagen ---
  inputImagen.style.display = "none";


  // --- Click en el ícono abre el selector de imagen ---
  icono.addEventListener("click", () => {
    inputImagen.click();
  });

  // --- Cuando el usuario elige una imagen ---
  inputImagen.addEventListener("change", () => {
    const archivo = inputImagen.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      const base64 = lector.result;
      icono.innerHTML = `<img src="${base64}" alt="Foto de perfil" class="foto-perfil">`;

      // Guardar o actualizar imagen en perfil guardado
      const datos = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
      datos.imagen = base64;
      localStorage.setItem("perfilUsuario", JSON.stringify(datos));
    };
    lector.readAsDataURL(archivo);
  });

  // --- Mostrar email del usuario en el nav ---
  userNameElement.textContent = usuario.email;

  // --- Cargar perfil guardado (si existe) ---
  const datosPerfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario"));
  const usuarioLogeado = JSON.parse(localStorage.getItem("usuario"));

  if (!datosPerfilGuardado) {
    email.value = usuarioLogeado?.email || usuario.email;
  } else {
    nombre.value = datosPerfilGuardado.nombre || "";
    apellido.value = datosPerfilGuardado.apellido || "";
    email.value = datosPerfilGuardado.email || "";
    telefono.value = datosPerfilGuardado.telefono || "";
    if (datosPerfilGuardado.imagen) {
      icono.innerHTML = `<img src="${datosPerfilGuardado.imagen}" alt="Foto de perfil" class="foto-perfil">`;
    }
  }

  // --- Guardar datos ---
  guardarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!nombre.value.trim() || !apellido.value.trim() || !email.value.trim() || !telefono.value.trim()) {
      alert("❗ Por favor, completa todos los campos obligatorios.");
      return;
    }

    const guardado = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
    const datosPerfil = {
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      email: email.value.trim(),
      telefono: telefono.value.trim(),
      imagen: guardado.imagen || null // mantiene la imagen anterior
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(datosPerfil));
    alert("✅ Datos guardados correctamente");
  });

  // --- Botón "Cancelar" ---
  cancelarBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    nombre.value = "";
    apellido.value = "";
    email.value = "";
    telefono.value = "";
    localStorage.removeItem("perfilUsuario");
    icono.innerHTML = "👤"; // vuelve al ícono original
  });
});

// --- MODO OSCURO ---
const chkOscuro = document.getElementById("toggleDarkMode");
const divFondo = document.getElementById("fondo");

window.addEventListener("load", () => {
  const modo = localStorage.getItem("modoOscuro");
  if (modo === "true") {
    divFondo.classList.add("dark-mode");
    chkOscuro.checked = true;
  } else {
    divFondo.classList.remove("dark-mode");
    chkOscuro.checked = false;
  }
});

chkOscuro.addEventListener("change", () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem("modoOscuro", chkOscuro.checked);
});

