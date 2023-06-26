import { armas} from "./data.js";
import { crearSubtitulo,eliminarSubtitulo } from "./subtitulo.js"
import { crearTabla, eliminarTabla } from "./tabla.js";
import { camposVacios, cantidadCaracteresInvalida, precioFueraRango, cantidadInvalidasEnteras } from "./validaciones.js";
import { modoModificar, mostrarMensaje, mostrarSpinner, cargarSelect, resetFormulario, cargarFormulario,agregarValidaciones } from "./formulario.js";
import {traerDatos,actualizarLocalStorage} from "./localStorage.js"
import { SuperHeroe } from "./SuperHeroe.js";



// //DEBO GUARDARLA EN EL LOCAL STORAGE
localStorage.setItem("armas",JSON.stringify(armas));

const listaLS = localStorage.getItem("super") ?
    JSON.parse(localStorage.getItem("super"))
    : [];
console.log(listaLS);
//CREO VALOR DE SPAN PARA FOOTER
const fecha=new Date().getFullYear();
document.getElementById("span-footer-fecha").textContent=fecha.toString();

//CREO SUBTITULO Y LO AGREGO AL DOM
document.getElementById("subtitulo").appendChild(crearSubtitulo("SUPER HEROES"));

//CARGO SELECT
cargarSelect(traerDatos("armas"));

//CREO TABLA Y LO AGREGO AL DOM
document.querySelector("#section-tabla").appendChild(crearTabla(listaLS));


//AGREGO LOS REQUERIMIENTOS DEL FORM y cheked y sleected
agregarValidaciones();

//ME TRAIGO LOS ELEMENTOS DEL FORM
const $formulario = document.forms[0];
const { txtNombre, rdoEditorial, txtAlias, rangeFuerza, selecArmas, txtHidden } = $formulario;



//AGREGO EL MANEJADOR AL EVENTO SUBMIT
$formulario.addEventListener("submit", e => {
    e.preventDefault();

    // console.log(e.target);//FORM
    // console.log(e.type);//SUBMI

    mostrarSpinner();

    setTimeout(() => {


       //VALIDO --------------------------------------------- 
        let errores = [];
        for (const input of [txtNombre, txtAlias]) {

            if (camposVacios(input)) {

                errores.push("es necesario completar todos los campos");
                break;// SI HAY ALGUN CAMPO VACIO NO VEO LO DEMAS
            }

        };
        if(cantidadCaracteresInvalida(255,txtNombre))errores.push("no debe superar los 255 caracteres")

        if(cantidadInvalidasEnteras(rangeFuerza,0,51))errores.push("fuerza de rango");

      
        if (errores.length > 0) {
         
            let mensaje = errores.join("&#10007;");//USO INNERHTML
            console.log(mensaje);
            mostrarMensaje(mensaje);


        } else {

            if (txtHidden.value.trim() == "") {
                //ALTA
                let id = Date.now();
              
                const nuevo = new SuperHeroe(id, txtNombre.value,rangeFuerza.value,txtAlias.value,rdoEditorial.value,selecArmas.value);
                
                altaEntidad(nuevo);
                
                resetFormulario();

            }
            else {
                //MODIFICACION
              
                const datoModificado= new SuperHeroe(txtHidden.value, txtNombre.value,rangeFuerza.value,txtAlias.value,rdoEditorial.value,selecArmas.value);
                modificarEntidad(datoModificado);
                resetFormulario();
            }
        }

    }, 3000);

});


//CRUD 
function altaEntidad(nuevoDato) {
    listaLS.push(nuevoDato);
    actualizarLocalStorage("super", listaLS);
    actualizarTabla(listaLS);

}
function modificarEntidad(dataModificado) {

    let indice = listaLS.findIndex(d => d.id == dataModificado.id);
    if (indice != -1) {
        listaLS.splice(indice, 1, dataModificado);
        actualizarLocalStorage("entidad", listaLS);
        actualizarTabla(listaLS);
    }
}
function eliminarEntidad(id) {
    // alert(id);
    let indice = listaLS.findIndex(d => d.id == id);
    if (indice != -1) {
        listaLS.splice(indice, 1);
        actualizarLocalStorage("super", listaLS);
        actualizarTabla(listaLS);

    }
}


function actualizarTabla(lista) {
    const tabla = document.querySelector("#section-tabla table");
    eliminarTabla(tabla);


    document.querySelector("#section-tabla").appendChild(crearTabla(lista));
}
function actualizarSubtitulo(texto){

    const $contenedorSubtitulo=document.getElementById("subtitulo");
    eliminarSubtitulo($contenedorSubtitulo);
   $contenedorSubtitulo.appendChild(crearSubtitulo(texto));

}


///ORDENAMIENTO-----------------------------------------------------------------------------------


function ordenarDatosPorNumericos(criterio) {
    const copia = [...listaLS];
     copia.sort((a, b) => a[criterio] - b[criterio]);
    return copia;

}
function ordenarDatosPorString(criterio) {
    const copia = [...listaLS];
     copia.sort((a, b) =>{
  
        return a[criterio].localeCompare(b[criterio])
     } );
return copia;
}

function ordenarDatosPorNombre() {
    return ordenarDatosPorString("nombre");
}
function ordenarDatosPorAlias() {
    return ordenarDatosPorString("alias");
}
function ordenarDatosPorArmas() {
    return ordenarDatosPorString("armas");
}
function ordenarDatosPorFuerza(){
return ordenarDatosPorNumericos("fuerza");
}
function ordenarDatosPorEditorial(){
    return ordenarDatosPorNumericos("editorial");
    }

//DELEGACION DE EVENTO ---------------------------------------------------------------------------------------------
document.addEventListener("click", event => {
    let emisor = event.target;
    if(emisor.matches("input[type='range']")){

        let valor=emisor.value;
        document.getElementById("fuerzaSmall").textContent="fuerza: "+valor;
    }
    if (emisor.matches("td")) {
        let id = emisor.parentElement.dataset.id;
        let seleccionado = listaLS.find(item => item.id == id);
        console.log(seleccionado);
        cargarFormulario(seleccionado);
        modoModificar();
        actualizarSubtitulo("Modificacion");

    }

    if (emisor.matches("input[name='btnEliminar']")) {
        let id = document.forms[0].txtHidden.value;
        eliminarEntidad(id);
        resetFormulario();
      
    }
    if (emisor.matches("input[name='btnCancelar']")) {
        resetFormulario();
        actualizarSubtitulo("Llene el formulario de alta");
    }
    if (emisor.matches("th")) {
        console.log(emisor);
        // alert(emisor.textContent);
        switch (emisor.textContent) {
            case "nombre":
                actualizarTabla(ordenarDatosPorNombre());

                break;
            case "alias":
                actualizarTabla(ordenarDatosPorAlias());
                break;
            case "armas":
                actualizarTabla(ordenarDatosPorArmas());
                break;
            case "fuerza":
                actualizarTabla(ordenarDatosPorFuerza());
                break;
                case "editorial":
                    actualizarTabla(ordenarDatosPorEditorial());

            default:
                break;
        }
    }


});







