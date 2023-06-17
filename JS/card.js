import{traerDatos} from "./localStorage.js";
const data=traerDatos("super");
console.log(data);

//obtengo el lugar donde insertar cards
const $section=document.getElementById("container-card");
//obtengo el template
const $template=document.getElementById("template").content;
//creo fragmento
const frag=document.createDocumentFragment();

data.forEach(element => {

    const $plantilla=document.importNode($template,true);
//obtengo los elemento de la plantilla
$plantilla.querySelector("h2").textContent=element.nombre;
$plantilla.querySelector("h3").textContent=element.alias;
const $ul=$plantilla.querySelector("ul");
$ul.innerHTML=`<li><i class="fa-solid fa-heart-pulse"></i> fuerza ${element.fuerza}</li>`;

$ul.innerHTML+=`<li><i class="fa-solid fa-robot"></i>arma ${element.armas}</li>`;
$ul.innerHTML+=`<li>editorial ${element.editorial}</li>`;


frag.appendChild($plantilla);


});
$section.appendChild(frag);


