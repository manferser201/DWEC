const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;

window.onload = () => {
    document.getElementById("generar_usuario").addEventListener('click', generar_usuario);
    // document.getElementById("bdXMLHttpRequest").addEventListener('click', conexion_por_XMLHttpRequest);
    // document.getElementById("bdFetch").addEventListener('click', conexion_por_Fetch);
}

function generar_usuario(){

    fetch("https://randomuser.me/api/?nat=es"
    ).then((response) => {
        if (response.ok) return response.json();
    }).then((usuario) => {
       
        console.log(usuario.results[0]);

        datos_usuario(usuario.results[0]);
        console.log(datos_usuario(usuario));
    })
}

function datos_usuario(usuario){

    console.log(usuario.picture.medium);
    let datos_usuario = {
        "picture":usuario.picture.medium,
        name:usuario.name,
        street:usuario.location.street,
        phone:usuario.phone,
        email:usuario.email
    }

    return datos_usuario;
}

function generar_tabla(){

}