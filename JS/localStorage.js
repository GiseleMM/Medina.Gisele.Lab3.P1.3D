export function traerDatos(clave){
    return  (localStorage.getItem(clave))?JSON.parse(localStorage.getItem(clave)):[];

}
export function actualizarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}