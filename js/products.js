import { getUsuario } from "./clases/Usuario.js";

//inicializo el array de products vacío
let productsArray = [];

//carrgado del json de productos
document.addEventListener("DOMContentLoaded", function (e) {


    //obtengo el id de la categoría actual del localStorage
    let catID = localStorage.getItem('catID');
    //la incluyo en la URL del Json de forma dinámica con un string literal
    //idea 1: `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`

    getJSONData(PRODUCTS_URL + catID + EXT_TYPE)
        .then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data.products;
                showProductsList(productsArray);
            }
        })
    const usuario = getUsuario();
    const userNameElement = document.getElementById("userName");

    userNameElement.textContent = usuario.email;
});


//crea una fila por cada producto.
function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend +=
            `<tr class="producto" data-precio="${product.cost}" data-id="${product.id}">
        <td class="name" scope="row">${product.name}<br><img src="${product.image}"></td>
        <td class="description"><span>${product.description}</span></td>
        <td class="sold">${product.soldCount}</td>
        <td class="price">${product.currency}${product.cost}</td>
     </tr>`;
    }
    document.getElementById("products-list").innerHTML = htmlContentToAppend;
    clickProduct();
};

function clickProduct() {
  const products = document.querySelectorAll(".producto");
  products.forEach(product => {
    product.addEventListener("click", () => {
      const id = product.getAttribute("data-id");
      localStorage.setItem("productID", id);
      window.location = "product-info.html";
    });
  });
}

//obtengo los elementos del DOM
const filtroAsc = document.getElementById("asc");
const filtroDesc = document.getElementById("desc");
const filtroRel = document.getElementById("rel");

function sortCat(criteria) {

    //creo una copia del array original para no modificarlo repetidamente
    //los tres puntos se llaman operador spread y crean una copia superficial del array
    let arrayOrdenado = [...productsArray];

    switch (criteria) {
        case "asc":
            //de menor a mayor precio
            arrayOrdenado.sort((a, b) => b.cost - a.cost);
            break;
        case "desc":
            //de mayor a menor precio
            arrayOrdenado.sort((a, b) => a.cost - b.cost);
            break;
        case "rel":
            //de más cantidad de vendidos a menos
            arrayOrdenado.sort((a, b) => b.soldCount - a.soldCount);
            break;
    }
    showProductsList(arrayOrdenado);
}

//listeners de los botones de ordenamiento
filtroAsc.addEventListener("click", function () {
    sortCat("asc");
});
filtroDesc.addEventListener("click", function () {
    sortCat("desc");
});
filtroRel.addEventListener("click", function () {
    sortCat("rel");
});

//buscador en tiempo real
const buscador = document.getElementById("buscador");

buscador.addEventListener("input", function (e) {
    const busqueda = e.target.value.toLowerCase();

    const productsFiltro = productsArray.filter(product =>
        //incluye el producto si el nombre contiene lo que se escribió en el buscador
        product.name.toLowerCase().includes(busqueda) ||
        //incluye el producto si la descripción contiene lo escrito en el buscador
        product.description.toLowerCase().includes(busqueda)
    );
    //llamo a la función que muestra los productos pasandole el array filtrado
    showProductsList(productsFiltro);
    //si no hay coincidencias, muestro un mensaje en un p de color rojo
    if (productsFiltro.length == 0 || (product.name.toLowerCase().includes(busqueda))) {
        document.getElementById("products-list").innerHTML = "<p style='color:red;'>Ningún producto coincide con la búsqueda</p>";
    }
});


const botonFiltrar = document.getElementById("filtrar")

botonFiltrar.addEventListener("click", filtrarPorPrecio);

function filtrarPorPrecio() {
    const min = parseFloat(document.getElementById('min').value);
    const max = parseFloat(document.getElementById('max').value);

   /* if(min.value==null || max.value==null){
        const aviso = document.getElementById('aviso');
        aviso.innerHTML="Escriba un mínimo y un máximo para filtrar";
        
    }
    else{}*/

    const productos = document.querySelectorAll('.producto');

    console.log("funciona");
    productos.forEach(producto => {
        const precio = parseFloat(producto.getAttribute('data-precio'));

        if (precio >= min && precio <= max) {
            producto.classList.remove('oculto');
        } else {
            producto.classList.add('oculto');
        }
    });

}

const filtro1 = document.getElementById("min");
const filtro2 = document.getElementById("max");
const botonLimpiar = document.getElementById("limpiar");

botonLimpiar.addEventListener("click", limpiarFiltro);

function limpiarFiltro() {
    const productos = document.querySelectorAll('.producto'); 

    productos.forEach(producto => {
        producto.classList.remove('oculto'); 
    });

filtro1.value = '';
filtro2.value = '';

    console.log("filtro limpiado");
}

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




