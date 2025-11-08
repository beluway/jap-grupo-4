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

  // --- Imagen de perfil ---
  inputImagen.style.display = "none";
  icono.addEventListener("click", () => inputImagen.click());
  inputImagen.addEventListener("change", () => {
    const archivo = inputImagen.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      const base64 = lector.result;
      icono.innerHTML = `<img src="${base64}" alt="Foto de perfil" class="foto-perfil">`;

      const datos = JSON.parse(localStorage.getItem("perfilUsuario")) || {};
      datos.imagen = base64;
      localStorage.setItem("perfilUsuario", JSON.stringify(datos));
    };
    lector.readAsDataURL(archivo);
  });

  // --- Mostrar usuario ---
  if (userNameElement) userNameElement.textContent = usuario.email;

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
      imagen: guardado.imagen || null,
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(datosPerfil));
    alert("✅ Datos guardados correctamente");
  });

  cancelarBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    nombre.value = "";
    apellido.value = "";
    email.value = "";
    telefono.value = "";
    localStorage.removeItem("perfilUsuario");
    icono.innerHTML = "👤";
  });

  // ----------------------------------------------------------------
  // 💳 SECCIÓN BILLETERA
  // ----------------------------------------------------------------
  const btnNuevaTarjeta = document.getElementById("btnNuevaTarjeta");
  const guardarTarjeta = document.getElementById("guardarTarjeta");
  const listaTarjetas = document.getElementById("listaTarjetas");
  const modalTarjeta = new bootstrap.Modal(document.getElementById("modalTarjeta"));

  const numero = document.getElementById("numeroTarjeta");
  const nombreTarjeta = document.getElementById("nombreTarjeta");
  const mes = document.getElementById("mesVencimiento");
  const anio = document.getElementById("anioVencimiento");
  const cvv = document.getElementById("cvvTarjeta");

  // --- Generar años dinámicamente ---
  const anioActual = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    const opcion = document.createElement("option");
    opcion.value = anioActual + i;
    opcion.textContent = anioActual + i;
    anioVencimiento.appendChild(opcion);
  }

  // --- Cargar tarjetas guardadas ---
  let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];
  renderizarTarjetas();

  btnNuevaTarjeta.addEventListener("click", () => {
    limpiarCampos();
    limpiarErrores();
    modalTarjeta.show();
  });

  guardarTarjeta.addEventListener("click", () => {
    limpiarErrores();
    let valido = true;

    if (numeroTarjeta.value.trim().length !== 16 || isNaN(numeroTarjeta.value)) {
      marcarError(numeroTarjeta);
      valido = false;
    }
    if (nombreTarjeta.value.trim() === "") {
      marcarError(nombreTarjeta);
      valido = false;
    }
    if (mesVencimiento.value === "" || anioVencimiento.value === "") {
      marcarError(mesVencimiento);
      marcarError(anioVencimiento);
      valido = false;
    }
    if (cvvTarjeta.value.trim().length !== 3 || isNaN(cvvTarjeta.value)) {
      marcarError(cvvTarjeta);
      valido = false;
    }

    if (!valido) {
      mostrarMensaje("⚠️ Por favor, completa todos los campos correctamente.", "danger");
      return;
    }

    /* const nuevaTarjeta = {
      numero: numeroTarjeta.value.trim(),
      nombre: nombreTarjeta.value.trim(),
      vencimiento: `${mesVencimiento.value}/${anioVencimiento.value}`,
      cvv: cvvTarjeta.value.trim(),
    }; */
          const nuevaTarjeta = {
      numero,
      nombreTarjeta,
      vencimiento: `${mes}/${anio}`,
      cvv
    };

    tarjetas.push(nuevaTarjeta);
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

    renderizarTarjetas();
    modalTarjeta.hide();
    mostrarMensaje("✅ Tarjeta agregada correctamente.", "success");
  });

  function renderizarTarjetas() {
    listaTarjetas.innerHTML = "";

    if (tarjetas.length === 0) {
      listaTarjetas.innerHTML = `<p class="text-muted text-center">No tienes tarjetas guardadas.</p>`;
      return;
    }

    tarjetas.forEach((tarjeta, index) => {
      const div = document.createElement("div");
      div.classList.add("col-md-4");

      div.innerHTML = `
        <div class="card p-3 shadow-sm tarjeta-item">
          <p class="mb-1"><strong>💳 ${tarjeta.numero.replace(/\d{12}(\d{4})/, "**** **** **** $1")}</strong></p>
          <p class="mb-1">${tarjeta.nombre}</p>
          <p class="mb-2 text-muted">Vence: ${tarjeta.vencimiento}</p>
          <button class="btn btn-outline-danger btn-sm" data-index="${index}">Eliminar</button>
        </div>
      `;

      div.querySelector("button").addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        tarjetas.splice(i, 1);
        localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
        renderizarTarjetas();
        mostrarMensaje("🗑️ Tarjeta eliminada correctamente.", "secondary");
      });

      listaTarjetas.appendChild(div);
    });
  }

  function limpiarCampos() {
    numeroTarjeta.value = "";
    nombreTarjeta.value = "";
    mesVencimiento.value = "";
    anioVencimiento.value = "";
    cvvTarjeta.value = "";
  }

  function marcarError(input) {
    input.classList.add("is-invalid");
  }

  function limpiarErrores() {
    document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  }

  function mostrarMensaje(texto, tipo) {
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} mt-3`;
    alerta.textContent = texto;
    document.getElementById("modalTarjeta").querySelector(".modal-content").prepend(alerta);

    setTimeout(() => alerta.remove(), 2500);
  }

  // ----------------------------------------------------------------
  // 🌙 MODO OSCURO
  // ----------------------------------------------------------------
  const chkOscuro = document.getElementById("toggleDarkMode");
  const divFondo = document.getElementById("fondo");

  window.addEventListener("load", () => {
    const modo = localStorage.getItem("modoOscuro");
    divFondo.classList.toggle("dark-mode", modo === "true");
    chkOscuro.checked = modo === "true";
  });

  chkOscuro.addEventListener("change", () => {
    divFondo.classList.toggle("dark-mode", chkOscuro.checked);
    localStorage.setItem("modoOscuro", chkOscuro.checked);
  });
});
