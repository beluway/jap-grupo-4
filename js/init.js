const BASE_URL = "http://localhost:3000/emercado-api";
const EXT_TYPE = ".json";
const CATEGORIES_URL = `${BASE_URL}/cats/cat`;
const PRODUCTS_URL = `${BASE_URL}/cats_products/`;
const PRODUCT_INFO_URL = `${BASE_URL}/products/`;
const PRODUCT_INFO_COMMENTS_URL = `${BASE_URL}/products_comments/`;
const CART_INFO_URL = `${BASE_URL}/user_cart/`;
const CART_BUY_URL = `${BASE_URL}/cart/buy`;
const PUBLISH_PRODUCT_URL = `${BASE_URL}/sell/publish`;


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

/* let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
} */

async function getProtectedJSONData(url, method = 'GET', bodyData = null) {
    const token = localStorage.getItem('jwtToken');
    let result = { status: 'error', data: null };

    // Si no hay token: redirige a login
    if (!token) {
        window.location.href = "login.html";
        return result;
    }

    const headers = {
        "Authorization": `Bearer ${token}`
    };

    if (bodyData) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: bodyData ? JSON.stringify(bodyData) : null
        });

        // Token inválido
        if (response.status === 401) {
            localStorage.removeItem("jwtToken");
            window.location.href = "login.html";
            return result;
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        //console.log("DATA RECIBIDA:", data);
        result.status = "ok";
        result.data = data;
        return result;

    } catch (error) {
        result.data = error;
        return result;
    }
}


document.addEventListener("DOMContentLoaded", function(e){
  let data = localStorage.getItem("usuario");
    if (data === null) {
        data = sessionStorage.getItem("usuario");
        if (data === null) {
            window.location.href = "login.html";
        }
    }
  });

    //Cerrar sesión
const cerrarSesion = document.getElementById('cerrar');
cerrarSesion.addEventListener('click', () => {
    localStorage.clear();
    window.location = "login.html";
});