
export function crearTabla(array){
    const $tabla=document.createElement("TABLE");
    if(Array.isArray(array) && (array.length>0)){

        const claves=Object.keys(array[0]);
        
        $tabla.appendChild(crearTHead(claves));
        $tabla.appendChild(crearTBody(array));
    }

    return $tabla;
}
function crearTBody(array){
   const $cuerpo= document.createElement("TBODY");
    array.forEach(item => {
        const $fila=document.createElement("TR");

        for (const key in item) {
           if(key=="id")
          {
            $fila.dataset.id=item[key];

          }else{
            const $celda=document.createElement("TD");
           
            $celda.textContent=item[key];
            $fila.appendChild($celda);
          } 
          
        }
        $cuerpo.appendChild($fila);
    });
    console.log($cuerpo);
return $cuerpo;

}function crearTHead(lista){
   const $cabecera= document.createElement("THEAD");
   const $fila= document.createElement("TR");
for (const clave of lista) {
if(clave=="id")continue;
     const $celda=document.createElement("TH");
     $celda.textContent=clave;
     $fila.appendChild($celda);
}
$cabecera.appendChild($fila);
console.log($cabecera);
return $cabecera;
}
export function eliminarTabla(tabla){

    if( tabla instanceof HTMLTableElement){
        while(tabla.hasChildNodes()){
            tabla.removeChild(tabla.firstElementChild);
        }
        tabla.parentElement.removeChild(tabla);
    }
}