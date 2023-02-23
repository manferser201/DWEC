const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;

let listado_usuarios = [];
let xhr = new XMLHttpRequest();

window.onload = () => {
    document.getElementById("generar_usuario").addEventListener('click', generar_usuario);
    document.getElementById("bdXMLHttpRequest").addEventListener('click', conexion_por_XMLHttpRequest);
    document.getElementById("bdFetch").addEventListener('click', conexion_por_Fetch);
}

function generar_usuario(){

    fetch("https://randomuser.me/api/?nat=es")
    .then((response) => {
        if (response.ok) return response.json();
    }).then((usuario) => {
       
        let datos = datos_usuario(usuario.results[0]);
        generar_tabla_usuario(datos);
        
        document.getElementById("addUser").addEventListener('click', () => {
        
            listado_usuarios.push(datos);
            generar_tabla_listado_usuarios();
        });
    })
}

function datos_usuario(usuario){

    let datos_usuario = {
        image:usuario.picture.medium,
        name:usuario.name.first + " " + usuario.name.last,
        street:usuario.location.street.name + " " + usuario.location.street.number,
        phone:usuario.phone,
        email:usuario.email
    }

    return datos_usuario;
}

function generar_tabla_usuario(usuario){
    
    let titulos = ["Imagen","Nombre", "Dirección", "Teléfono", "Email"];

    let div_tabla = document.getElementById("usuario");
    div_tabla.innerHTML = "";

    let tabla = document.createElement("table");
    let tr = document.createElement("tr");

    // Pintamos la cabecera de la tabla
    titulos.forEach((titulo) => {
        th = document.createElement("th");
        th.appendChild(document.createTextNode(titulo));
        tr.appendChild(th);
    });

    tabla.appendChild(tr);

    let td = document.createElement("td");
    tr = document.createElement("tr");

    let img = document.createElement("img");
    img.setAttribute("src", usuario.image); 
    td.appendChild(img);
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(usuario.name));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(usuario.street));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(usuario.phone));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(usuario.email));
    tr.appendChild(td);

    td = document.createElement("td");
    let boton = document.createElement("button");
    let texto = document.createTextNode("Añadir Usuario");
    boton.setAttribute("id", "addUser");
    boton.appendChild(texto);
    td.appendChild(boton);
    tr.appendChild(td);

    // Insertamos los datos a la tabla
    tabla.appendChild(tr);
    div_tabla.appendChild(tabla);

}

function generar_tabla_listado_usuarios(){

    let titulos = ["Nombre", "Dirección", "Teléfono", "Email"];

    generar_tabla(titulos, "lista_usuarios")
}

function generar_tabla(titulos, id){

    let div_tabla = document.getElementById(id);
    div_tabla.innerHTML = "";

    let tabla = document.createElement("table");
    let cabecera = document.createElement("tr");

    // Pintamos la cabecera de la tabla
    titulos.forEach((titulo) => {
        th = document.createElement("th");
        th.appendChild(document.createTextNode(titulo));
        cabecera.appendChild(th);
    });

    tabla.appendChild(cabecera);

    listado_usuarios.forEach((usuario) => {
        let tr = document.createElement("tr");
        
        console.log(usuario);
        
        for (const campo in usuario) {
            
            if (campo != "image") {
                let td = document.createElement("td");
                td.appendChild(document.createTextNode(usuario[campo]));
                tr.appendChild(td);
            }
        }

        tabla.appendChild(tr);
    });

    // Insertamos los datos a la tabla
    div_tabla.appendChild(tabla);
}

function conexion_por_XMLHttpRequest() {
    console.log("POST XMLHttpRequest");

    ///Segundo paso, una función anónima que recoge y trata los datos recibidos
    xhr.open("POST", "save_users.php");
    xhr.setRequestHeader("Content-type", "application/json");

    let listado_string = JSON.stringify(listado_usuarios);

    xhr.onreadystatechange = comprobar_estado;
    xhr.send(listado_string);
}

function conexion_por_Fetch(){

    fetch("./save_users.php", {
        method: "POST",
        headers: {
            "Content-type": "applicattion/json",
        },
        body : JSON.stringify(listado_usuarios)
    }).then((response) => {
        if (response.ok) {           
            return response.json();   
        }
        
    }).then((data) => {
        console.log(data);
        let respuesta_servidor = document.getElementById("respuesta_servidor");
        respuesta_servidor.innerHTML = `Respuesta del servidor con Fetch: ${data.resultado}`;

    }).catch((error) => {
        console.log(error);
    });
}

function comprobar_estado() {
    
    if(xhr.readyState === READY_STATE_COMPLETE && xhr.status === HTTP_STATUS_OK){
        
        let respuesta = xhr.responseText;
        let respuesta_servidor = document.getElementById("respuesta_servidor");
        respuesta_servidor.innerHTML = `Respuesta del servidor con XMLHttpRequest: ${respuesta}`;

    } else {
        
        console.log("Error al comprobar el estado del servidor con XMLHttpRequest al realizar el POSTde guardar usuario");
    }
}