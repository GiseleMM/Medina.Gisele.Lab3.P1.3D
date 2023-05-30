//MONEY         /^\$[0-9]{1,3}([\\.][0-9]{3})/

//validacion EMAIL   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
//VALIDAR N CANTIDAD DE CARACTERES EJ 25   ^[\s\S]{0,25}$   
//contraseña   /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
// solo NUMEROS     ^[0-9]+$
//valida numeros enterso y con coma sin $ /^\d*\.\d+$/



// RANGO DE CXARACTER      La solución es usar {n,m} (cuantificador de rango), donde n es el mínimo de ocurrencias posibles y m el máximo.

// Ejemplo:

// var re = /^[a-zA-Z0-9]{0,20}$/;

export function camposVacios(input) {

    if (input.value.trim() === "") {
        // input.insertAdjacentHTML('afterend',"<span>&#x26c5;<span>");
        console.log("vacio input", input.type, input.name);
        return true;
    }
    return false;

}

export function cantidadCaracteresInvalida(num, input) {
    // let patron = "^[a-zA-Z0-9]{0,t}$";
    // patron = patron.replace("t", num);//USO T PARA REMPLZAR POR NUM
    // let exp = new RegExp(patron);
    // console.log(exp);
    // console.log(patron);
    // console.log(input.value.trim());
    // console.log(exp.test(input.value.trim()));///VER Q HACER
    // return exp.test(input.value.trim())


    let valor=input.value.trim();
    let tam=valor.lenght;
    return tam>num; //si es mayor es invalido y retorna true

}

export function precioFueraRango(input, min, max) { //MNNO  lOS INCLUYE
    let valor = input.value;

    console.log(valor);
    let re = /^\$?(\d{1,3},?(\d{3},?)*\d{3}(.\d{0,3})?|\d{1,3}(.\d{2})?)$/;
    console.log(re.test(valor));// numerico
    if (re.test(valor)) {

        const array = valor.split("$");
        console.log(array);
        console.log(array.lenght);
        let copia = valor;
        if (valor.startsWith("$")) {
            copia = valor.slice(1);

        }
        console.log(copia);


        copia = parseFloat(copia);
        console.log("parsefloat", copia);
        if (isNaN(copia)) {
            console.log("es nan o infinitive")

        } else {
            if (copia > min && copia < max) {
                console.log("valido");
                return false;
            }

        }


    }
    return true;
}
export function cantidadInvalidasEnteras(input, min, max) {
    let valor = input.value;
    console.log(valor);
    let copia = parseInt(valor);
    console.log("parseInt", copia);
    if (isNaN(copia)) {
        console.log("es nan o infinitive")
    } else {
        if (copia > min && copia < max) {
            console.log("valido");
            return false;

        }

    }
return true;
}
