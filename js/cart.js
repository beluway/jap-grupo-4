/* const chkOscuro = document.getElementById("toggleDarkMode");

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("productoCarrito");
  const totalElement = document.querySelector(".total .precio");

  // Recuperar el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para renderizar los productos
  function renderizarCarrito() {
    contenedorCarrito.innerHTML = ""; // Limpiar contenido previo
    let total = 0;

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalElement.textContent = "$0";
      return;
    }

    // Variable para guardar el porcentaje de envío seleccionado
    let envioSeleccionado = localStorage.getItem("tipoEnvio") 
      ? parseFloat(localStorage.getItem("tipoEnvio")) 
      : 0;

    carrito.forEach((producto, index) => {

      let envioSeleccionado = localStorage.getItem("tipoEnvio") 
      const subtotal = producto.precio * producto.cantidad + envioSeleccionado / 100;
      total += subtotal;

      const itemHTML = `
        <div class="producto d-flex align-items-center justify-content-between border-bottom py-2">
          <div class="d-flex align-items-center gap-3">
            <img src="${producto.imagen || 'img/default.png'}" alt="${producto.nombre}" width="80" height="80" class="rounded">
            <div>
              <h5 class="mb-1">${producto.nombre}</h5>
              <p class="mb-0 text-muted">$${producto.precio}</p>
            </div>
          </div>

          <div class="unidades d-flex align-items-center gap-2">
            <button class="menos btn btn-sm btn-outline-secondary" data-index="${index}">−</button>
            <input type="number" class="cantidad form-control text-center" value="${producto.cantidad}" min="1" data-index="${index}" style="width: 60px;">
            <button class="mas btn btn-sm btn-outline-secondary" data-index="${index}">+</button>
          </div>

          <p class="mb-0 fw-bold">$${subtotal.toFixed(2)}</p>
        </div>
      `;

      contenedorCarrito.insertAdjacentHTML("beforeend", itemHTML);
    });

    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Actualiza el total mostrado
function actualizarTotal() {
  const total = subtotal + (subtotal * envioSeleccionado / 100);
  document.getElementById("totalFinal").innerText = "$" + total.toFixed(2);
}

  // Al hacer clic en Aceptar dentro del modal
document.getElementById("btn-aceptar-envio").addEventListener("click", () => {
  const seleccionado = document.querySelector('input[name="tipoEnvio"]:checked');
  
  if (!seleccionado) {
    alert("Por favor selecciona un tipo de envío.");
    return;
  }

  envioSeleccionado = parseFloat(seleccionado.value);
  localStorage.setItem("tipoEnvio", envioSeleccionado);

  // Actualiza el total con el nuevo envío
  actualizarTotal();

  // Cierra el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEnvio'));
  modal.hide();
});

  // Escuchar clicks en botones + y −
  contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("mas")) {
      const index = e.target.dataset.index;
      carrito[index].cantidad++;
    } else if (e.target.classList.contains("menos")) {
      const index = e.target.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();

    if (window.actualizarContadorCarrito) {
      window.actualizarContadorCarrito();
    }
  });

  // Detectar cambios en los inputs de cantidad
  contenedorCarrito.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad")) {
      const index = e.target.dataset.index;
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad > 0) carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
      window.actualizarContadorCarrito?.();
    }
  });

  // Render inicial
  renderizarCarrito();

  // Botón de "comprar"
  const btnComprar = document.getElementById("btn-comprar");
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      alert("¡Gracias por tu compra!");
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify([]));
      renderizarCarrito();
      window.actualizarContadorCarrito?.();
    });
  }
});

const divFondo = document.getElementById("fondo");

// Cambiar modo oscuro y guardar preferencia
chkOscuro.addEventListener('change', () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem('modoOscuro', chkOscuro.checked);
});

if (localStorage.getItem('modoOscuro') === 'true') {
  chkOscuro.checked = true;
  divFondo.classList.add('dark-mode');
}

//traemos el nombre de usuario para ponerlo en el navbar
import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");

  if (usuario && userNameElement) {
    userNameElement.textContent = usuario.email;
  }
}); */

/* const chkOscuro = document.getElementById("toggleDarkMode");

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("productoCarrito");
  const totalElement = document.querySelector(".total .precio");

  // Recuperar carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Recuperar tipo de envío seleccionado (porcentaje)
  let envioSeleccionado = localStorage.getItem("tipoEnvio")
    ? parseFloat(localStorage.getItem("tipoEnvio"))
    : 0;
    let nombreEnvio = localStorage.getItem("nombreEnvio") || "";

  // Función principal: renderizar carrito
  function renderizarCarrito() {
    contenedorCarrito.innerHTML = ""; 
    let subtotal = 0;

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalElement.textContent = "$0";
      return;
    }

    carrito.forEach((producto, index) => {
      const subtotalProducto = producto.precio * producto.cantidad;
      subtotal += subtotalProducto;

      const itemHTML = `
        <div class="producto d-flex align-items-center justify-content-between border-bottom py-2">
          <div class="d-flex align-items-center gap-3">
            <img src="${producto.imagen || 'img/default.png'}" alt="${producto.nombre}" width="80" height="80" class="rounded">
            <div>
              <h5 class="mb-1">${producto.nombre}</h5>
              <p class="mb-0 text-muted">$${producto.precio}</p>
            </div>
          </div>

          <div class="unidades d-flex align-items-center gap-2">
            <button class="menos btn btn-sm btn-outline-secondary" data-index="${index}">−</button>
            <input type="number" class="cantidad form-control text-center" value="${producto.cantidad}" min="1" data-index="${index}" style="width: 60px;">
            <button class="mas btn btn-sm btn-outline-secondary" data-index="${index}">+</button>
          </div>

          <p class="mb-0 fw-bold">$${subtotalProducto.toFixed(2)}</p>
        </div>
      `;

      contenedorCarrito.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Total con envío
    const totalConEnvio = subtotal + (subtotal * envioSeleccionado / 100);
    totalElement.textContent = `$${totalConEnvio.toFixed(2)}`;

    // Mostrar tipo de envío
    if (tipoEnvioTexto) {
      tipoEnvioTexto.textContent = nombreEnvio
        ? `Tipo de envío: ${nombreEnvio}`
        : "No se ha seleccionado envío";
    }
  }

  // Escuchar clicks en botones + y −
  contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("mas")) {
      const index = e.target.dataset.index;
      carrito[index].cantidad++;
    } else if (e.target.classList.contains("menos")) {
      const index = e.target.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    window.actualizarContadorCarrito?.();
  });

  // Cambiar cantidad manualmente
  contenedorCarrito.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad")) {
      const index = e.target.dataset.index;
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad > 0) carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
      window.actualizarContadorCarrito?.();
    }
  });

  // Clic en "Aceptar" dentro del modal de envío
  const btnAceptarEnvio = document.getElementById("btn-aceptar-envio");
  if (btnAceptarEnvio) {
    btnAceptarEnvio.addEventListener("click", () => {
      const seleccionado = document.querySelector('input[name="tipoEnvio"]:checked');
      if (!seleccionado) {
        alert("Por favor selecciona un tipo de envío.");
        return;
      }

      envioSeleccionado = parseFloat(seleccionado.value);

      // Obtener texto del label asociado
      const label = document.querySelector(`label[for="${seleccionado.id}"]`);
      nombreEnvio = label ? label.textContent.trim() : "";

      // Guardar en localStorage
      localStorage.setItem("tipoEnvio", envioSeleccionado);
      localStorage.setItem("nombreEnvio", nombreEnvio);

      renderizarCarrito();

      const modal = bootstrap.Modal.getInstance(document.getElementById("modalEnvio"));
      modal.hide();
    });
  }

  // Botón de "comprar"
  const btnComprar = document.getElementById("btn-comprar");
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      alert("¡Gracias por tu compra!");
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify([]));
      renderizarCarrito();
      window.actualizarContadorCarrito?.();
    });
  }

  // Render inicial
  renderizarCarrito();
});


// ========== MODO OSCURO ==========
const divFondo = document.getElementById("fondo");

chkOscuro.addEventListener('change', () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem('modoOscuro', chkOscuro.checked);
});

if (localStorage.getItem('modoOscuro') === 'true') {
  chkOscuro.checked = true;
  divFondo.classList.add('dark-mode');
}

// ========== USUARIO EN NAVBAR ==========
import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  if (usuario && userNameElement) {
    userNameElement.textContent = usuario.email;
  }
});
 */

const chkOscuro = document.getElementById("toggleDarkMode");

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("productoCarrito");
  const totalElement = document.querySelector(".total .precio");
  const tipoEnvioTexto = document.getElementById("tipoEnvioSeleccionado");
  const modalEnvio = document.getElementById("modalEnvio");
  const btnAceptarEnvio = document.getElementById("btn-aceptar-envio");
  const montoProductos = document.getElementById("montoProductos");
  const totalConEnvioModal = document.getElementById("totalConEnvio");

  // ========== MONEDA ==========
  const selectorMoneda = document.getElementById("moneda");
  const TASA_DOLAR = 42; // 1 USD = 42 UYU (ajustá según el día)
  let monedaActual = localStorage.getItem("moneda") || "UYU";
  selectorMoneda.value = monedaActual;

  // Recuperar carrito y envío desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let envioSeleccionado = localStorage.getItem("tipoEnvio")
    ? parseFloat(localStorage.getItem("tipoEnvio"))
    : 0;
  let nombreEnvio = localStorage.getItem("nombreEnvio") || "";

  // ========== FUNCIÓN CONVERSIÓN ==========
  function convertirMoneda(precio, desde, hacia) {
    if (desde === hacia) return precio;
    if (desde === "USD" && hacia === "UYU") return precio * TASA_DOLAR;
    if (desde === "UYU" && hacia === "USD") return precio / TASA_DOLAR;
    return precio;
  }

  // ========== FUNCIÓN PRINCIPAL ==========
  function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";
    let subtotal = 0;

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalElement.textContent = "$0";
      if (tipoEnvioTexto)
        tipoEnvioTexto.textContent = "No se ha seleccionado envío";
      return;
    }

    carrito.forEach((producto, index) => {
      const subtotalProducto = convertirMoneda(
        producto.precio * producto.cantidad,
        producto.moneda || "USD",
        monedaActual
      );
      subtotal += subtotalProducto;

      const itemHTML = `
        <div class="producto d-flex align-items-center justify-content-between border-bottom py-2">
          <div class="d-flex align-items-center gap-3">
            <img src="${producto.imagen || "img/default.png"}" alt="${producto.nombre}" width="80" height="80" class="rounded">
            <div>
              <h5 class="mb-1">${producto.nombre}</h5>
              <p class="mb-0 text-muted">${monedaActual === "USD" ? "US$" : "$"}${convertirMoneda(producto.precio, producto.moneda || "USD", monedaActual).toFixed(2)}</p>
            </div>
          </div>

          <div class="unidades d-flex align-items-center gap-2">
            <button class="menos btn btn-sm btn-outline-secondary" data-index="${index}">−</button>
            <input type="number" class="cantidad form-control text-center" value="${producto.cantidad}" min="1" data-index="${index}" style="width: 60px;">
            <button class="mas btn btn-sm btn-outline-secondary" data-index="${index}">+</button>
          </div>

          <p class="mb-0 fw-bold">${monedaActual === "USD" ? "US$" : "$"}${subtotalProducto.toFixed(2)}</p>
        </div>
      `;

      contenedorCarrito.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Calcular total con envío
    const totalConEnvio = subtotal + subtotal * (envioSeleccionado / 100);
    totalElement.textContent = `${monedaActual === "USD" ? "US$" : "$"}${totalConEnvio.toFixed(2)}`;

    // Mostrar costo de envío en el resumen
    if (tipoEnvioTexto) {
      tipoEnvioTexto.textContent = nombreEnvio
        ? `Envío: ${monedaActual === "USD" ? "US$" : "$"}${(subtotal * envioSeleccionado / 100).toFixed(2)}`
        : "No se ha seleccionado envío";
    }

    // Mostrar costo de productos en el resumen
    if (montoProductos) {
      montoProductos.textContent = `${monedaActual === "USD" ? "US$" : "$"}${subtotal.toFixed(2)}`;
    }
  }

  // ========== EVENTOS DEL MODAL ==========
  const montoEnvioSpan = document.getElementById("montoEnvio");

  modalEnvio.addEventListener("shown.bs.modal", () => {
    const radios = document.querySelectorAll('input[name="tipoEnvio"]');
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const subtotal = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const porcentaje = parseFloat(e.target.value);
        const montoEnvio = subtotal * (porcentaje / 100);
        montoEnvioSpan.textContent = `$${montoEnvio.toFixed(2)}`;
      });
    });

    const guardado = localStorage.getItem("tipoEnvio");
    if (guardado) {
      const radioGuardado = document.querySelector(
        `input[name="tipoEnvio"][value="${guardado}"]`
      );
      if (radioGuardado) radioGuardado.checked = true;

      const montoEnvio = subtotal * (parseFloat(guardado) / 100);
      montoEnvioSpan.textContent = `$${montoEnvio.toFixed(2)}`;
    } else {
      montoEnvioSpan.textContent = "$0.00";
    }
  });

  // ========== BOTÓN ACEPTAR ENVÍO ==========
  if (btnAceptarEnvio) {
    btnAceptarEnvio.addEventListener("click", () => {
      const seleccionado = document.querySelector(
        'input[name="tipoEnvio"]:checked'
      );
      if (!seleccionado) {
        alert("Por favor selecciona un tipo de envío.");
        return;
      }

      envioSeleccionado = parseFloat(seleccionado.value);
      const label = document.querySelector(`label[for="${seleccionado.id}"]`);
      nombreEnvio = label ? label.textContent.trim() : "";

      // Guardar en localStorage
      localStorage.setItem("tipoEnvio", envioSeleccionado);
      localStorage.setItem("nombreEnvio", nombreEnvio);

      // Guardado de dirección
      const departamento = document.getElementById("depto-input").value.trim();
      const localidad = document.getElementById("localidad-input").value.trim();
      const calle = document.getElementById("calle-input").value.trim();
      const numero = document.getElementById("numero-input").value.trim();
      const esquina = document.getElementById("esquina-input").value.trim();

      if (!departamento || !localidad || !calle || !numero || !esquina) {
        alert("Por favor complete todos los campos de dirección");
        return;
      }

      const direccion = { departamento, localidad, calle, numero, esquina };
      localStorage.setItem("direccionEnvio", JSON.stringify(direccion));

      renderizarCarrito();

      const modal = bootstrap.Modal.getInstance(modalEnvio);
      modal.hide();
    });
  }

  // ========== BOTONES + y − ==========
  contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("mas")) {
      const index = e.target.dataset.index;
      carrito[index].cantidad++;
    } else if (e.target.classList.contains("menos")) {
      const index = e.target.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    window.actualizarContadorCarrito?.();
  });

  // ========== CAMBIAR CANTIDAD MANUAL ==========
  contenedorCarrito.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad")) {
      const index = e.target.dataset.index;
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad > 0) carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
      window.actualizarContadorCarrito?.();
    }
  });

  // ========== BOTÓN COMPRAR ==========
  const btnComprar = document.getElementById("btn-comprar");
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      window.location = "checkout.html";
    });
  }

  // ========== EVENTO CAMBIO DE MONEDA ==========
  if (selectorMoneda) {
    selectorMoneda.addEventListener("change", () => {
      monedaActual = selectorMoneda.value;
      localStorage.setItem("moneda", monedaActual);
      renderizarCarrito();
    });
  }

  // Render inicial
  renderizarCarrito();
});


// ========== MODO OSCURO ==========
const divFondo = document.getElementById("fondo");

chkOscuro.addEventListener("change", () => {
  divFondo.classList.toggle("dark-mode", chkOscuro.checked);
  localStorage.setItem("modoOscuro", chkOscuro.checked);
});

if (localStorage.getItem("modoOscuro") === "true") {
  chkOscuro.checked = true;
  divFondo.classList.add("dark-mode");
}


// ========== USUARIO EN NAVBAR ==========
import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuario();
  const userNameElement = document.getElementById("userName");
  if (usuario && userNameElement) {
    userNameElement.textContent = usuario.email;
  }
});
