window.actualizarContadorCarrito = function() {
  //console.log("Ejecutando actualizarContadorCarrito");

  const cartCountElement = document.getElementById("cart-count");
  if (!cartCountElement) {
    console.warn(" No se encontró el elemento #cart-count en esta página");
    return;
  }


  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalProductos = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);

  if (totalProductos > 0) {
    cartCountElement.style.display = "inline";
    cartCountElement.textContent = totalProductos;
  } else {
    cartCountElement.style.display = "none";
  }
};


document.addEventListener("DOMContentLoaded", window.actualizarContadorCarrito);