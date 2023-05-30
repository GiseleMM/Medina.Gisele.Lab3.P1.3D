export function mostrarSpinner(){
    document.querySelector("#spinner").classList.remove("none");
}
export function ocultarSpinner(){
    document.querySelector("#spinner").classList.add("none");
}
export  function cargarFormulario(txtTitulo,rdoTransaccion,txtDescripcion,txtPrecio,txtBaños,txtEstacionamientos,txtDormitorios,txtHidden){
    document.forms[0].txtTitulo.value=txtTitulo;
    alert(rdoTransaccion);
    document.forms[0].rdoTransaccion.value=rdoTransaccion;
    alert( document.forms[0].rdoTransaccion.value);
    document.forms[0].txtDescripcion.value=txtDescripcion;
    document.forms[0].txtPrecio.value=txtPrecio;
    document.forms[0].txtBaños.value=txtBaños;
    document.forms[0].txtEstacionamientos.value=txtEstacionamientos;
    document.forms[0].txtDormitorios.value=txtDormitorios;
    document.forms[0].txtHidden.value=txtHidden;
    
}
export function resetFormulario(){
    document.forms[0].reset();
    document.getElementById("span-mensaje").textContent="";
    document.forms[0]["alta-modificacion"].value="GUARDAR";
    document.forms[0].btnEliminar.classList.add("none");
    document.forms[0].btnCancelar.classList.add("none");
    ocultarSpinner();

}
export function mostrarMensaje(texto){
    const $span= document.getElementById("span-mensaje");
    $span.innerHTML=texto;
    console.log($span.textContent);
    console.log($span.parentElement);
    
    $span.parentElement.open=true;//DIALOG
    setTimeout(() => {
        $span.parentElement.removeAttribute("open");
        resetFormulario();
    }, 5000);

}
export function modoModificar(){
    document.forms[0]["alta-modificacion"].value="MODIFICAR";
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
        if((input.matches("input[type='text']")) || (input.matches("input[type='number']")) || input.matches("input[type='radio']")){
            input.setAttribute("required",true);
           
        }
        
    }
    document.forms[0].rdoTransaccion[0].setAttribute("checked",true);////ESTO DEBERIA HACERLO MAS GENERICO NO SIRVE PARA TODO LOS PORMULARIOS POR Q USO NOMBRE

}