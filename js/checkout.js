// ========== USUARIO EN NAVBAR ==========
import { getUsuario } from "./clases/Usuario.js";

// ============  CHECKOUT.JS  ============
const STORAGE_KEY = "tarjetas";

// Elementos del DOM
const listaTarjetas = document.getElementById("listaTarjetas");
const formNuevaTarjeta = document.getElementById("formNuevaTarjeta");
const anioSelect = document.getElementById("anioVencimiento");

// ================== AÑOS DINÁMICOS ==================
if (anioSelect) {
  const yearActual = new Date().getFullYear();
  for (let i = 0; i < 15; i++) {
    const option = document.createElement("option");
    option.value = yearActual + i;
    option.textContent = yearActual + i;
    anioSelect.appendChild(option);
  }
}

// ================== GUARDAR NUEVA TARJETA ==================
if (formNuevaTarjeta) {
  formNuevaTarjeta.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero = document.getElementById("numeroTarjeta").value.trim();
    const nombre = document.getElementById("nombreTarjeta").value.trim();
    const mes = document.getElementById("mesVencimiento").value;
    const anio = document.getElementById("anioVencimiento").value;
    const cvv = document.getElementById("cvvTarjeta").value.trim();

    if (!numero || !nombre || !mes || !anio || !cvv) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (numero.length < 16) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    const nuevaTarjeta = {
      numero,
      nombre,
      vencimiento: `${mes}/${anio}`,
      cvv,
    };

    const tarjetas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    tarjetas.push(nuevaTarjeta);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarjetas));

    alert("Tarjeta guardada correctamente ✅");

    formNuevaTarjeta.reset();
    cargarTarjetas();

    // Cambiar de tab automáticamente
    const tabTrigger = document.querySelector("#miBilletera-tab");
    if (tabTrigger) {
      const tab = new bootstrap.Tab(tabTrigger);
      tab.show();
    }
  });
}

//función para poder mostrar la tarjeta que se seleccionó
function mostrarTarjetaSeleccionada() {
  const alerta = document.getElementById("tarjetaSeleccionada");
  const tarjetaSeleccionada = JSON.parse(localStorage.getItem("tarjetaSeleccionada"));

  if (tarjetaSeleccionada && alerta) {
    alerta.textContent = `Tarjeta seleccionada: ${tarjetaSeleccionada.nombre} (**** **** **** ${String(tarjetaSeleccionada.numero).slice(-4)})`;
    alerta.classList.remove("d-none");
  } else if (alerta) {
    alerta.classList.add("d-none");
  }
}

// ================== CARGAR TARJETAS ==================
function cargarTarjetas() {
  if (!listaTarjetas) return;

  listaTarjetas.innerHTML = "";

  const tarjetas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (tarjetas.length === 0) {
    listaTarjetas.innerHTML = `<p class="text-muted text-center">No tienes tarjetas guardadas.</p>`;
    return;
  }

  tarjetas.forEach((tarjeta, index) => {
    const vencimiento = tarjeta.vencimiento || `${tarjeta.mes || "??"}/${tarjeta.anio || "????"}`;

    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="card p-3 shadow-sm">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${tarjeta.nombre}</h6>
            <small class="text-muted">**** **** **** ${String(tarjeta.numero).slice(-4)}</small><br>
            <small>Vence: ${vencimiento}</small>
          </div>
          <button class="btn btn-outline-primary btn-sm seleccionar-tarjeta"
                  data-index="${index}">
            Seleccionar
          </button>
        </div>
      </div>
    `;
    listaTarjetas.appendChild(col);
  });

  // ✅ Agregar eventos después de renderizar las tarjetas
  document.querySelectorAll(".seleccionar-tarjeta").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const tarjetas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const seleccionada = tarjetas[index];

      // Guardar selección
      localStorage.setItem("tarjetaSeleccionada", JSON.stringify(seleccionada));

      // Mostrar visualmente la tarjeta elegida
      mostrarTarjetaSeleccionada();

      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalTarjeta"));
      modal.hide();
    });
  });
}


// ================== RESUMEN DEL PEDIDO ==================
function mostrarResumen() {
  const productos = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const tipoEnvio = localStorage.getItem("nombreEnvio") || "No seleccionado";
  const subtotalLS = parseFloat(localStorage.getItem("subtotalCarrito")) || 0;
  const costoEnvioLS = parseFloat(localStorage.getItem("costoEnvio")) || 0;
  const totalLS = parseFloat(localStorage.getItem("totalCarrito")) || 0;

  const lista = document.getElementById("listaResumen");
  const resumenEnvio = document.getElementById("resumenEnvio");
  const resumenSubtotal = document.getElementById("resumenSubtotal");
  const resumenTotal = document.getElementById("resumenTotal");

  if (!lista || !resumenSubtotal || !resumenEnvio || !resumenTotal) return;

  // Mostrar productos
  lista.innerHTML = "";
  productos.forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `<span>${p.name} x${p.count}</span><span>$${(p.unitCost * p.count).toFixed(2)}</span>`;
    lista.appendChild(li);
  });

  // Mostrar resumen de totales
  resumenSubtotal.textContent = `Subtotal: $${subtotalLS.toFixed(2)}`;
  resumenEnvio.textContent = tipoEnvio
    ? `Envío (${tipoEnvio}): $${costoEnvioLS.toFixed(2)}`
    : "Envío no seleccionado";
  resumenTotal.textContent = `Total: $${totalLS.toFixed(2)}`;
}


// ================== FINALIZAR COMPRA ==================
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
if (btnFinalizarCompra) {
  btnFinalizarCompra.addEventListener("click", () => {
    alert("✅ Compra realizada con éxito. ¡Gracias por tu pedido!");
    localStorage.removeItem("carrito");
    localStorage.removeItem("tipoEnvio");
    localStorage.removeItem("porcentajeEnvio");
    localStorage.removeItem("productID");
    localStorage.removeItem("catID");
    localStorage.removeItem("direccionEnvio");
    localStorage.removeItem("costoEnvio");
    localStorage.removeItem("nombreEnvio");
    localStorage.removeItem("subtotalCarrito");
    localStorage.removeItem("totalCarrito");
    localStorage.removeItem("tarjetaSeleccionada");
    window.location.href = "cart.html";
  });
}

// ================== MODO OSCURO ==================
const divFondo = document.getElementById("fondo");
const chkOscuro = document.getElementById("toggleDarkMode");

if (chkOscuro && divFondo) {
  chkOscuro.addEventListener("change", () => {
    divFondo.classList.toggle("dark-mode", chkOscuro.checked);
    localStorage.setItem("modoOscuro", chkOscuro.checked);
  });

  if (localStorage.getItem("modoOscuro") === "true") {
    chkOscuro.checked = true;
    divFondo.classList.add("dark-mode");
  }
}

// ================== CARGA INICIAL ==================
document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  if (usuario && userNameElement) userNameElement.textContent = usuario.email;

  cargarTarjetas();
  mostrarResumen();
  mostrarTarjetaSeleccionada();
});
