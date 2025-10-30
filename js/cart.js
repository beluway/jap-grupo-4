const chkOscuro = document.getElementById("toggleDarkMode");

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

    carrito.forEach((producto, index) => {
      const subtotal = producto.precio * producto.cantidad;
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