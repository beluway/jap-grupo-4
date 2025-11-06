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
  if (userNameElement) userNameElement.textContent = usuario.email;

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

  // --- Guardar datos del perfil ---
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

  // ----------------------------------------------------------------
  // 💳 SECCIÓN BILLETERA
  // ----------------------------------------------------------------

  const btnNuevaTarjeta = document.getElementById("btnNuevaTarjeta");
  const listaTarjetas = document.getElementById("listaTarjetas");
  const guardarTarjetaBtn = document.getElementById("guardarTarjeta");

  const numeroTarjeta = document.getElementById("numeroTarjeta");
  const nombreTarjeta = document.getElementById("nombreTarjeta");
  const vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
  const cvvTarjeta = document.getElementById("cvvTarjeta");

  // --- Cargar tarjetas guardadas ---
  function cargarTarjetas() {
    listaTarjetas.innerHTML = "";
    const tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];

    if (tarjetas.length === 0) {
      listaTarjetas.innerHTML = "<p class='text-muted'>No tienes tarjetas guardadas.</p>";
      return;
    }

    tarjetas.forEach((t, i) => {
      const masked = "**** **** **** " + t.numero.slice(-4);
      const cardHTML = `
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <h6>${masked}</h6>
            <p class="mb-1">${t.nombre}</p>
            <small>Vence: ${t.vencimiento}</small>
            <div class="text-end mt-2">
              <button class="btn btn-sm btn-danger eliminar-tarjeta" data-index="${i}">Eliminar</button>
            </div>
          </div>
        </div>`;
      listaTarjetas.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  // --- Abrir modal para agregar tarjeta ---
  btnNuevaTarjeta.addEventListener("click", () => {
    numeroTarjeta.value = "";
    nombreTarjeta.value = "";
    vencimientoTarjeta.value = "";
    cvvTarjeta.value = "";

    const modal = new bootstrap.Modal(document.getElementById("modalTarjeta"));
    modal.show();
  });

  // --- Guardar nueva tarjeta ---
  guardarTarjetaBtn.addEventListener("click", () => {
    if (!numeroTarjeta.value || !nombreTarjeta.value || !vencimientoTarjeta.value || !cvvTarjeta.value) {
      alert("❗ Completa todos los campos de la tarjeta");
      return;
    }

    const tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
    tarjetas.push({
      numero: numeroTarjeta.value,
      nombre: nombreTarjeta.value,
      vencimiento: vencimientoTarjeta.value,
      cvv: cvvTarjeta.value
    });

    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    alert("✅ Tarjeta guardada correctamente");
    bootstrap.Modal.getInstance(document.getElementById("modalTarjeta")).hide();
    cargarTarjetas();
  });

  // --- Eliminar tarjeta ---
  listaTarjetas.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar-tarjeta")) {
      const index = e.target.dataset.index;
      const tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
      tarjetas.splice(index, 1);
      localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
      cargarTarjetas();
    }
  });

  // --- Mostrar tarjetas al cargar ---
  cargarTarjetas();
});

// ----------------------------------------------------------------
// 🌙 MODO OSCURO
// ----------------------------------------------------------------
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