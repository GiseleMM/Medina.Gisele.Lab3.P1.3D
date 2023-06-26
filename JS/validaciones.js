
export function camposVacios(input) {

    if (input.value.trim() === "") {
        // input.insertAdjacentHTML('afterend',"<span>&#x26c5;<span>");
        console.log("vacio input", input.type, input.name);
        return true;
    }
    return false;

}

export function cantidadCaracteresInvalida(num, input) {

    let valor=input.value.trim();
    let tam=valor.lenght;
    return tam>num; //si es mayor es invalido y retorna true

}

export function precioFueraRango(input, min, max) { //MNNO  lOS INCLUYE
    let valor = input.value;

   
    let re = /^\$?(\d{1,3},?(\d{3},?)*\d{3}(.\d{0,3})?|\d{1,3}(.\d{2})?)$/;
 
    if (re.test(valor)) {

        const array = valor.split("$");
    
        let copia = valor;
        if (valor.startsWith("$")) {
            copia = valor.slice(1);

        }


        copia = parseFloat(copia);
      
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
   
    let copia = parseInt(valor);
    
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
