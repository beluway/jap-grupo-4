import {getUsuario} from "./clases/Usuario.js"

//obtengo los elementos relacionados con las estrellas
const starBorder = `<span class="material-icons">star_border</span>`;
const star = `<span class="material-icons">star</span>`;

//obtengo el ID del producto seleccionado que se guardó en el LocalStorage
const productID = localStorage.getItem("productID");

//evento de carga del html
document.addEventListener("DOMContentLoaded", () => {

//obtengo el usuario logueado para mostrarlo en el nav
const usuario = getUsuario();
const userNameElement = document.getElementById("userName");
userNameElement.textContent = usuario.email;

 //función para cargar la info del producto seleccionado
  getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        const product = resultObj.data;
        const galeria = document.getElementById("imagenes");
        
        document.getElementById("nombre").innerText = product.name;
        document.getElementById("descripcion").innerText = product.description;
        document.getElementById("precio").innerText = `Precio: ${product.currency} ${product.cost}`;
        document.getElementById("ventas").innerText = `Cantidad de vendidos: ${product.soldCount}`;
        document.getElementById("categoria").innerText = `Categoría: ${product.category}`;  
      
        product.images.forEach(imgUrl => {
          const img = document.createElement("div");
          img.innerHTML = `<img src="${imgUrl}" class="img-fluid">`;
          galeria.appendChild(img);
        });

        //llamo a función que muestra los related products de ese mismo producto
        mostrarProductosRelacionados(product.relatedProducts);
      }
    });
  
//-------------SECCIÓN DE COMENTARIOS-------------

//función que carga los comentarios si ya no los tenía guardados
if(cargarComentarios ==null){
  getJSONData(PRODUCT_INFO_COMMENTS_URL+productID+EXT_TYPE)
  .then(resultObj =>{
    if (resultObj.status === "ok") {
      const comentarios = resultObj.data;
      const container = document.getElementById("comentarios");
      let htmlContentToAppend = "";
      
      comentarios.forEach(comentario =>{
      htmlContentToAppend +=
      `<div class="userRating"><span class="userInfo">${comentario.user} <span id="dateTime">${comentario.dateTime}</span></span><span class="userStars">${star.repeat(comentario.score)}${starBorder.repeat(5-comentario.score)}</span></div>
      <div class="userComment">${comentario.description}</div>`;
      })
      container.innerHTML = htmlContentToAppend;
    }
  })}

});//------> FIN DEL CONTENTLOADED

//-------------PRODUCTOS RELACIONADOS-------------
    function mostrarProductosRelacionados(relatedArray) {
  const container = document.getElementById("related-container");
  container.innerHTML = ""; 

  relatedArray.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "14rem";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
      <div class="card-body">
        <h6 class="card-title">${producto.name}</h6>
      </div>
    `;

    div.addEventListener("click", () => {
      localStorage.setItem("productID", producto.id);
      location.reload(); 
    });

    container.appendChild(div);
  });
}

const container = document.getElementById("comentarios");

let comentarios = []; // todos los comentarios (API + agregados)

// Genera el HTML de un comentario
function mostrarComentario(comentario) {
  return `
    <div class="userRating">
      <span class="userInfo">${comentario.user} 
        <span id="dateTime">${comentario.dateTime}</span>
      </span>
      <span class="userStars">
        ${star.repeat(comentario.score)}${starBorder.repeat(5 - comentario.score)}
      </span>
    </div>
    <div class="userComment">${comentario.description}</div>
  `;
}

// Genera el HTML de toda la lista
function mostrarComentarios(lista) {
  let htmlContentToAppend = "";
  lista.forEach(c => {
    htmlContentToAppend += mostrarComentario(c);
  });
  container.innerHTML = htmlContentToAppend;
}

// Guardar en localStorage
function guardarComentarios() {
  sessionStorage.setItem("comentarios_" + productID, JSON.stringify(comentarios));
}

// Cargar desde localStorage
function cargarComentarios() {
  const stored = sessionStorage.getItem("comentarios_" + productID);
  return stored ? JSON.parse(stored) : null;
}
//2
// Intentamos cargar desde sessionStorage
const storedComentarios = cargarComentarios();
if (storedComentarios) {
  comentarios = storedComentarios;
  mostrarComentarios(comentarios);
} else {
  // Si no hay nada en localStorage, pedimos a la API
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE)
    .then(resultObj => {
      if (resultObj.status === "ok") {
        comentarios = resultObj.data;
        guardarComentarios(); // guardamos por primera vez
        mostrarComentarios(comentarios);
      }
    });
}
//3
document.getElementById("send-comment").addEventListener("submit", function(e) {
  e.preventDefault();

  const score = parseInt(document.getElementById("rate").value);
  const description = document.getElementById("area-comment").value.trim();

  if (description === "") {
    alert("Por favor escriba un comentario.");
    return;
  }

  const usuario = getUsuario(); // viene de tu clase Usuario.js

  const nuevoComentario = {
    user: usuario.email,              // o usuario.nombre si lo tenés
    dateTime: new Date().toLocaleString(),
    score: score,
    description: description
  };

  comentarios.push(nuevoComentario); // guardamos en memoria
  guardarComentarios();                 // persistimos en localStorage
  mostrarComentarios(comentarios);    // refrescamos la vista
  this.reset();                      // limpiamos el form
});

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

//SECCIÓN COMPRAR QUE DERIVA A LA PANTALLA DEL CARRITO
const btnComprar = document.getElementById('comprar');

btnComprar.addEventListener("click",()=>{
window.location = "cart.html"
});


