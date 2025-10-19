export class Usuario{


    constructor (email,clave){
        this.email=email;
        this.clave=clave;
    }

     toString(){
        return `Usuario: ${this.email}, Clave: ${this.clave}`;
     }
}

  
 //creamos una instancia de Usuario

   export function setUsuario(email,clave, storageType = "localStorage"){
        //creamos un nuevo usuario
        const usuario = new Usuario(email,clave);
        //guardamos el usuario en localStorage FUNCIONA
        if (storageType === "localStorage") {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
    }
    
    //obtenemos el usuario del localStorage por si lo preciso
    export function getUsuario(){
        let data = localStorage.getItem("usuario");
        if(data!==null){
        const usuario = new Usuario("","");
        usuario.email=JSON.parse(data).email;
        usuario.clave=JSON.parse(data).clave;
        usuario.fromLocalStorage = true; // Indica que viene de localStorage
        return usuario;
        }
        data = sessionStorage.getItem("usuario");
    if (data !== null) {
        const usuario = new Usuario("", "");
        usuario.email = JSON.parse(data).email;
        usuario.clave = JSON.parse(data).clave;
        usuario.fromSessionStorage = true; // Indica que viene de sessionStorage
        return usuario;
    }
    return null;
    }