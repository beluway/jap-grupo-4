import { getUsuario } from "./clases/Usuario.js";

document.addEventListener("DOMContentLoaded", function () { 

    const usuario = getUsuario();
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = usuario.email;
    });

    //guardar cantidad, datos del producto

    //Guardamos en el local storage los id de los que agregué
    const productID = localStorage.getItem('productID');
    //Cuando estamos en el carrito hacemos un fetch a cada producto que agregamos, por id
getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        const product = resultObj.data;
        const galeria = document.getElementById("imagenes");
        
        document.getElementById("nombre").innerText = product.name;
        document.getElementById("precio").innerText = `Precio: ${product.currency} ${product.cost}`;
        product.images.forEach(imgUrl => {
          const img = document.getElementById('imagenProducto');
          img.innerHTML = `<img src="${imgUrl}" class="img-fluid">`;
          galeria.appendChild(img);
        });
        
        //llamo a función que muestra los related products de ese mismo producto
        mostrarProductosRelacionados(product.relatedProducts);
      }
    });
    //guardo el id, la moneda, ya guardo toda la info en el LocalStorage
    //llenamos un array con la información de los objetos
    //cuando le damos a comprar más de una vez, que se actualice la cantidad de ese producto

    //localStorage .clear del username para cerrar sesión


//Para poner el modo oscuro
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