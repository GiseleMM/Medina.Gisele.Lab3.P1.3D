export function mostrarSpinner(){
    document.querySelector("#spinner").classList.remove("none");
}
export function ocultarSpinner(){
    document.querySelector("#spinner").classList.add("none");
}
export  function cargarFormulario(dato){
    document.forms[0].txtNombre.value=dato.nombre;
    
    document.forms[0].rdoEditorial.value=dato.editorial;
 
    document.forms[0].txtAlias.value=dato.alias;
    document.forms[0].rangeFuerza.value=dato.fuerza;
    document.forms[0].selecArmas.value=dato.armas;
    document.forms[0].txtHidden.value=dato.id;
}
export function resetFormulario(){
    document.forms[0].reset();
    document.getElementById("span-mensaje").textContent="";
    document.forms[0]["alta-modificacion"].innerHTML='<i class="fa-solid fa-floppy-disk">GUARDAR';
    document.forms[0].btnEliminar.classList.add("none");
    document.forms[0].btnCancelar.classList.add("none");
    ocultarSpinner();

}
export function mostrarMensaje(texto){
    const $span= document.getElementById("span-mensaje");
    $span.innerHTML= "&#10060";
    $span.innerHTML+=texto;
    console.log($span.textContent);
    console.log($span.parentElement);
    
    $span.parentElement.open=true;//DIALOG
    setTimeout(() => {
        $span.parentElement.removeAttribute("open");
        resetFormulario();
    }, 4000);

}
export function modoModificar(){
    document.forms[0]["alta-modificacion"].innerHTML="MODIFICAR";
    mostrarEliminarYCancelar();
}
function mostrarEliminarYCancelar(){
    document.forms[0].btnEliminar.classList.remove("none");
    document.forms[0].btnCancelar.classList.remove("none");
}
export function agregarValidaciones(){

    const $constroles=document.forms[0].elements;
    for (const input of $constroles) {
        // alert(input.type);
        // alert(input.name);
        if((input.matches("input[type='text']")) || (input.matches("input[type='number']")) || input.matches("input[type='radio']" || input.matches("select"))){
            input.setAttribute("required",true);
           
        }
        
    }
    document.forms[0].rdoEditorial[0].setAttribute("checked",true);////ESTO DEBERIA HACERLO MAS GENERICO NO SIRVE PARA 
    //TODO LOS PORMULARIOS POR Q USO NOMBRE
    document.forms[0].selecArmas.options[0].selected="true";

}
export function cargarSelect(datos){

    const $selec=document.querySelector("select");
  //  alert($selec);
    const frag=document.createDocumentFragment();
datos.forEach(element=>{
    const $option= document.createElement("OPTION");
    $option.setAttribute("value",element);
    $option.textContent=element;
    frag.appendChild($option);
});
$selec.appendChild(frag);
}