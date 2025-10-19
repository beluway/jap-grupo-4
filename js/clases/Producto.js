
export class Producto{
    constructor(nombre, precio, descripcion, imagen,vendidos){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.vendidos = vendidos || 0; // Inicializamos vendidos en 0 si no se indica nada 
    }

    toString(){
        return `Producto: ${this.nombre}, Precio: ${this.precio}, Descripción: ${this.descripcion}, Imagen: ${this.imagen}`;
    }
}