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

  //borramos el aviso si se seleccionó una tarjeta
    //aviso.textContent = "";
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

// ================== MONEDA ==================
function obtenerSimboloMoneda() {
  const moneda = localStorage.getItem("moneda") || "UYU";
  return moneda === "USD" ? "US$" : "$";
}


// ================== RESUMEN DEL PEDIDO (versión con conversión de moneda) ==================
function mostrarResumen() {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];
  const nombreEnvio = localStorage.getItem("nombreEnvio") || "No seleccionado";
  let porcentajeEnvioLS = parseFloat(localStorage.getItem("tipoEnvio")) || 0;

  const lista = document.getElementById("listaResumen");
  const resumenEnvio = document.getElementById("resumenEnvio");
  const resumenSubtotal = document.getElementById("resumenSubtotal");
  const resumenTotal = document.getElementById("resumenTotal");

  if (!lista || !resumenSubtotal || !resumenEnvio || !resumenTotal) return;

  const monedaActual = localStorage.getItem("moneda") || "UYU";
  const simbolo = obtenerSimboloMoneda(monedaActual);

  const TASA_DOLAR = 42; // 1 USD = 42 UYU
  function convertirMoneda(precio, desde, hacia) {
    if (desde === hacia) return precio;
    if (desde === "USD" && hacia === "UYU") return precio * TASA_DOLAR;
    if (desde === "UYU" && hacia === "USD") return precio / TASA_DOLAR;
    return precio;
  }

  // Calcular subtotal sumando los productos convertidos
  let subtotalConvertido = 0;
  lista.innerHTML = "";
  productos.forEach((p) => {
    const precioConvertido = convertirMoneda(p.precio, p.moneda || "UYU", monedaActual);
    const totalProducto = precioConvertido * p.cantidad;
    subtotalConvertido += totalProducto;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `<span>${p.nombre} x${p.cantidad}</span><span>${simbolo}${totalProducto.toFixed(2)}</span>`;
    lista.appendChild(li);
  });

  // Calcular envío y total
  const envioConvertido = subtotalConvertido * porcentajeEnvioLS / 100;
  const totalConvertido = subtotalConvertido + envioConvertido;

  resumenSubtotal.textContent = `Subtotal: ${simbolo}${subtotalConvertido.toFixed(2)}`;
  resumenEnvio.textContent = nombreEnvio
      ? `Envío (${nombreEnvio}): ${simbolo}${envioConvertido.toFixed(2)}`
      : "Envío no seleccionado";
  resumenTotal.textContent = `Total: ${simbolo}${totalConvertido.toFixed(2)}`;
}



//mostrar cofirmación de dirección guardada
const direccion = document.getElementById("direccion");
if (direccion){
  const direccionEnvio = JSON.parse(localStorage.getItem("direccionEnvio")) || "No especificada";
  direccion.textContent = `Dirección de envío: ${direccionEnvio.localidad}, ${direccionEnvio.departamento},
   Calle: ${direccionEnvio.calle}, Numero:  ${direccionEnvio.numero}, Esquina: ${direccionEnvio.esquina}`;
   direccion.style.color = "orange";
}


 // ================== FINALIZAR COMPRA ==================
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

if (btnFinalizarCompra) {
  btnFinalizarCompra.addEventListener("click", () => {
    //cambio el || por && para que valide si no hay ningún método de pago seleccionado pq si no existe alguno de los dos es undefined y da por válido
    if(!localStorage.getItem("tarjetaSeleccionada") && !localStorage.getItem("transferencia")){
      let faltaPago = document.getElementById("aviso-compra");
      faltaPago.textContent = "Debes seleccionar un método de pago antes de finalizar la compra.";
      faltaPago.style.color = "red";
      setTimeout(() => {
        faltaPago.textContent = "";
      }, 3000);
      return;
    } 

    let transferenciaLS = localStorage.getItem("transferencia");
    if(transferenciaLS){
      let transferenciaRealizada = document.getElementById("transferenciaRealizada");
      transferenciaRealizada.textContent = "Transferencia realizada con éxito ✅";
      transferenciaRealizada.style.color = "green";
      transferenciaRealizada.classList.remove("d-none");

    }

    //necesito retrasar la alerta de compra para que se vea el mensaje de transferencia realizada 
    setTimeout(()=>{


    //limpiamos el localStorage
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
    localStorage.removeItem("transferencia");

    finalDeCompra();

    }, 1000);//1000 ms de retraso 
  }
);
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
  if(!localStorage.getItem("direccionEnvio")||!localStorage.getItem("tipoEnvio")||!localStorage.getItem("carrito")){
  window.location.href = "cart.html";
  }
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  if (usuario && userNameElement) userNameElement.textContent = usuario.email;

  cargarTarjetas();
  mostrarResumen();
  mostrarTarjetaSeleccionada();
});

// ========== MODAL TRANSFERENCIA BANCARIA ==========
const btnTransferencia = document.getElementById('aceptar-trans');
const modalTansferencia = document.getElementById('modal-transfer')

const importe = document.getElementById("importe");
const moneda = document.getElementById("moneda")
let totalCarrito = localStorage.getItem("totalCarrito");
let monedaLS = localStorage.getItem("moneda");

  importe.value = totalCarrito;
  importe.readOnly = true;

  if (monedaLS === "USD"){
    /* moneda.options[1].selected = true;
    moneda.readOnly = true; */
    moneda.value = "USD";
    moneda.options.remove(0);
  }
  else{
    moneda.value = "UYU";
    moneda.options.remove(1);
  }

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


//CONFETTI

const confettiBtn = document.getElementById("confetti-btn");

//OVERLAY AL FINALIZAR COMPRA

const overlay = document.getElementById("overlay");
const volverBtn = document.getElementById("volverBtn");

volverBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Función para mostrar el overlay con animación al final de la compra
function showOverlay() {
  const overlay = document.getElementById("overlay");

  const text = overlay.querySelector(".slide-text");
  text.style.animation = 'none';
  void text.offsetWidth;
  text.style.animation = '';

  overlay.classList.add("show");
}

//Confetti
function finalDeCompra(){
  showOverlay();
var end = Date.now() + (10 * 1000);

var colors = ['#ff8c00ff','#004d80ff','#ffffffff'];

(function frame() {
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
}