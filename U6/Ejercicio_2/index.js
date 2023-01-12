document.getElementById("botonEscribir").addEventListener("click", escribir, false);
document.getElementById("botonEliminarPrimero").addEventListener("click", eliminarPrimerLi, false);
document.getElementById("botonEliminarUltimo").addEventListener("click", eliminarUltimoLi, false);
let lista = document.getElementById("lista");

function escribir(){
    let texto = prompt("Escriba lo que quiere introducir");
    let ul = document.getElementById("lista");
    let li = document.createElement("li");
    let contenido = document.createTextNode(texto);

    li.appendChild(contenido);
    ul.appendChild(li);
}

function eliminarPrimerLi(){

    lista.removeChild(lista.firstElementChild);
}

function eliminarUltimoLi(){

    lista.removeChild(lista.lastElementChild);
}