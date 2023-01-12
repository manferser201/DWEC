// Variables auxiliares
let obj_html = document.documentElement;
let obj_body = obj_html.lastChild;

// Ejercicio 1 - Obtener el número de párrafos de la página.
let parrafos = obj_body.getElementsByTagName("p");
console.log("Número de párrafos: ", parrafos.length);

// Ejercicio 2 - Obtener el texto del segundo párrafo.
let textoParrafo2 = parrafos[1].textContent;
console.log("Texto del primer párrafo: ", textoParrafo2);

// Ejercicio 3 - Obtener el número de enlaces de la página.
let enlaces = obj_body.getElementsByTagName("a");
console.log("Número de enlaces: ", enlaces.length);

// Ejercicio 4 - Obtener la dirección del primer enlace.
let direccionPrimerEnlace = enlaces[0].getAttribute("href");
console.log("Direccio dl primer enlace: ", direccionPrimerEnlace);

// Ejercicio 5 - Obtener la dirección del penúltimo enlace.
let direccionPenultimoEnlace = enlaces[enlaces.length - 2].getAttribute("href");
console.log("Dirección del penúltimo enlace: ", direccionPenultimoEnlace);

// Ejercicio 6 - Obtener el número de enlaces que apuntan a /wiki/Municipio
let numEnlacesApuntan = 0;

for (let index = 0; index < enlaces.length; index++) {
    
    if(enlaces[index].href.includes("/wiki/Municipio")){
        
        numEnlacesApuntan++;
    }
}

console.log("Número de enlaces que apuntan a /wiki/Municipio: ", numEnlacesApuntan);

// Ejercicio 7 - Obtener el número de enlaces del primer párrafo.
let primerParrafo = parrafos[0];
let enlacesPrimerParrafo = primerParrafo.getElementsByTagName("a");
console.log("Número de enlaces en el primer párrafo: ", enlacesPrimerParrafo.length);

let info = document.getElementById("info");
info.innerHTML = "<h2><u>Resultados</u></h2>" + "<b> El número de párrafos es: </b>" + parrafos.length + "<br>" + 
                    "<b> El texto del primer párrafo es: </b>" + textoParrafo2 + "<br>" + 
                    "<b> El número de enlaces es: </b>" + enlaces.length + "<br>" + 
                    "<b> La dirección del primer enlace es: </b>" + direccionPrimerEnlace + "<br>" + 
                    "<b> La dirección del penúltimo enlace es: </b>" + direccionPenultimoEnlace + "<br>" + 
                    "<b> El número de enlaces que apuntan a /wiki/Municipios es: </b>" + numEnlacesApuntan + "<br>" + 
                    "<b> El número de enlaces del primer párrafo es: </b>" + enlacesPrimerParrafo.length;