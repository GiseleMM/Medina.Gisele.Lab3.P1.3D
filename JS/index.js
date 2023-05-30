import { lista } from "./data.js";
import { crearSubtitulo,eliminarSubtitulo } from "./subtitulo.js"
import { crearTabla, eliminarTabla } from "./tabla.js";
import { camposVacios, cantidadCaracteresInvalida, precioFueraRango, cantidadInvalidasEnteras } from "./validaciones.js";
import { modoModificar, mostrarMensaje, mostrarSpinner, ocultarSpinner, resetFormulario, cargarFormulario,agregarValidaciones } from "./formulario.js";
import { Anuncio } from "./Anuncio.js";

//OBTENGO LISTA
console.log(lista);

// //DEBO GUARDARLA EN EL LOCAL STORAGE
// localStorage.setItem("entidad",JSON.stringify(lista));



const listaLS = localStorage.getItem("entidad") ?
    JSON.parse(localStorage.getItem("entidad"))
    : [];

// const copia=localStorage.getItem("entidad")?
// JSON.parse(localStorage.getItem("entidad"))
// :[];



//CREO SUBTITULO Y LO AGREGO AL DOM
document.getElementById("subtitulo").appendChild(crearSubtitulo("Llena el formulario de alta"));

//CREO TABLA Y LO AGREGO AL DOM
document.querySelector("#section-tabla").appendChild(crearTabla(listaLS));


//AGREGO LOS REQUERIMIENTOS DEL FORM
agregarValidaciones();

//ME TRAIGO LOS ELEMENTOS DEL FORM
const $formulario = document.forms[0];
const { txtTitulo, rdoTransaccion, txtDescripcion, txtPrecio, txtBaños, txtEstacionamientos, txtDormitorios, txtHidden } = $formulario;



//AGREGO EL MANEJADOR AL EVENTO SUBMIT
$formulario.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(document.getElementById("span-mensaje").textContent);
    // document.getElementById("span-mensaje").textContent = "";

    // console.log(e.target);//FORM
    // console.log(e.type);//SUBMI


    // document.querySelector("#spinner").classList.remove("none");
    mostrarSpinner();

    setTimeout(() => {


       //VALIDO --------------------------------------------- 
        let errores = [];
        for (const input of [txtTitulo, txtDescripcion, txtPrecio, txtBaños, txtEstacionamientos, txtDormitorios]) {

            if (camposVacios(input)) {

                errores.push("es necesario completar todos los campos");
                break;// SI HAY ALGUN CAMPO VACIO NO VEO LO DEMAS
            }

        };
        if(cantidadCaracteresInvalida(255,txtDescripcion))errores.push("no debe superar los 255 caracteres")

        if(precioFueraRango(txtPrecio,0,10000000))errores.push("precio fuera de rango");

        if(cantidadInvalidasEnteras(txtBaños,0,30))errores.push("num de  baños invalido");

        if(cantidadInvalidasEnteras(txtEstacionamientos,0,30))errores.push("num de estacionamientos invalido");
        
        if(cantidadInvalidasEnteras(txtDormitorios,0,30))errores.push("num de dormitorios invalido");

      
        if (errores.length > 0) {
            let mensaje = errores.join("&#10007;");//USO INNERHTML
            console.log(mensaje);
            mostrarMensaje(mensaje);


        } else {

            if (txtHidden.value.trim() == "") {
                //ALTA
                let id = Date.now();
                const nuevo = new Anuncio(id, txtTitulo.value, rdoTransaccion.value, txtDescripcion.value, txtPrecio.value, txtBaños.value, txtEstacionamientos.value, txtDormitorios.value);
                altaEntidad(nuevo);
                
                resetFormulario();

            }
            else {
                //MODIFICACION

                const datoModificado = new Anuncio(txtHidden.value, txtTitulo.value, rdoTransaccion.value, txtDescripcion.value, txtPrecio.value, txtBaños.value, txtEstacionamientos.value, txtDormitorios.value);
                modificarEntidad(datoModificado);
                resetFormulario();
            }
        }





  
        // ocultarSpinner();
        // resetFormulario();---> si lo coloco aca mostrar mnsaje falla por q tambien usa settimeout
    }, 3000);




});


//CRUD 
function altaEntidad(nuevoDato) {
    listaLS.push(nuevoDato);
    actualizarLocalStorage("entidad", listaLS);
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
    alert(id);
    let indice = listaLS.findIndex(d => d.id == id);
    if (indice != -1) {
        listaLS.splice(indice, 1);
        actualizarLocalStorage("entidad", listaLS);
        actualizarTabla(listaLS);

    }
}

function actualizarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
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
function ordenarDatosPorId() {


    return ordenarDatosPorNumericos("id");
}
function ordenarDatosPorEstacionamiento() {
    return ordenarDatosPorNumericos("num_estacionamientos");
}
function ordenarDatosPorBaños() {
    return ordenarDatosPorNumericos("num_baños");
}
function ordenarDatosPorDormitorios() {
    return ordenarDatosPorNumericos("num_dormitorios");
}
function ordenarDatosPorPrecio() {
    const copia = [...listaLS];
    return copia.sort((a, b) => {
        let a1 = a.precio;
        if (a.precio.startsWith("$")) {
            a1 = a.precio.slice(1);
        }
        a1 = parseFloat(a1);
        let b1 = b.precio;
        if (b.precio.startsWith("$")) {
            b1 = b.precio.slice(1);
        }
        b1 = parseFloat(b1);
        return a1 - b1;
    });


}
function ordenarDatosPorNumericos(criterio) {
    const copia = [...listaLS];
    return copia.sort((a, b) => a[criterio] - b[criterio]);

}
function ordenarDatosPorTitulo() {
    return ordenarDatosPorString("titulo");
}
function ordenarDatosPorDescripcion() {
    return ordenarDatosPorString("descripcion");
}
function ordenarDatosPorTransaccion() {
    return ordenarDatosPorString("transaccion");
}
function ordenarDatosPorString(criterio) {
    const copia = [...lista];
    return copia.sort((a, b) => a[criterio].localeCompare(b[criterio]));

}

//DELEGACION DE EVENTO ---------------------------------------------------------------------------------------------
document.addEventListener("click", event => {
    let emisor = event.target;
    if (emisor.matches("td")) {
        let id = emisor.parentElement.dataset.id;
        let seleccionado = listaLS.find(item => item.id == id);
        console.log(seleccionado);
        cargarFormulario(seleccionado.titulo, seleccionado.transaccion, seleccionado.descripcion, seleccionado.precio, seleccionado["num_baños"], seleccionado["num_estacionamientos"], seleccionado["num_dormitorios"], seleccionado.id);
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
        alert(emisor.textContent);
        switch (emisor.textContent) {
            case "titulo":
                actualizarTabla(ordenarDatosPorTitulo());

                break;
            case "descripcion":
                actualizarTabla(ordenarDatosPorDescripcion());
                break;
            case "transaccion":
                actualizarTabla(ordenarDatosPorTransaccion());
                break;
            case "precio":
                actualizarTabla(ordenarDatosPorPrecio());
                break;

            case "num_baños":
                actualizarTabla(ordenarDatosPorBaños());
                break;
            case "num_estacionamiento":
                actualizarTabla(ordenarDatosPorEstacionamiento());
                break;
            case "num_dormitorios":
                actualizarTabla(ordenarDatosPorDormitorios());
                break;

            default:
                break;
        }
    }


});







