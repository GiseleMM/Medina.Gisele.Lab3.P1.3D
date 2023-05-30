export function crearSubtitulo(sub){
let texto=sub.trim();
const $ul=document.createElement("UL");
let tam=texto.length;
for (let index = 0; index < texto.length; index++) {

    const $li=document.createElement("LI");
    if(texto.charAt(index)==" "){
        $li.innerHTML="<span> &nbsp; </span>";

    }else{
        $li.textContent=texto.charAt(index).toUpperCase();
    }
 
    $ul.appendChild($li)
    
}
$ul.classList.add("subtitulo-dinamico");
return $ul;

}
export function eliminarSubtitulo(contenedor){

    
        while(contenedor.hasChildNodes()){
            contenedor.removeChild(contenedor.firstElementChild);
        }
        
    }
