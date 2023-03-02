const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;
const API_KEY = "f114621b2bd388bee68e73e620c67828";
const TRENDING_MOVIES_URL = "trending/movie/week";
const API_BASE_URL = `https://api.themoviedb.org/3/${TRENDING_MOVIES_URL}?api_key=${API_KEY}`;
const titulos_tabla = ["id", "original_title", "overview", "original_language","realase_date", "vote_average", "poster_path"]

let lista_peliculas_favs = []

window.onload = () => {
    document.getElementById("cargar_peliculas").addEventListener('click', cargar_peliculas);
    document.getElementById("guardar_favs").addEventListener('click', guardar_favs);
    document.getElementById("obtener_favs").addEventListener('click', obtener_favs);
    document.getElementById("limpiar").addEventListener('click', limpiar);
}

function cargar_peliculas(){
    console.log("Entrando en el método cargar_pelicula");

    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        if(xhr.readyState === READY_STATE_COMPLETE && xhr.status === HTTP_STATUS_OK){
            
            let datos_JSON = JSON.parse(xhr.responseText);
            
            console.log(datos_JSON);
            let listado_peliculas = procesar_peliculas(datos_JSON.results);
            crearTarjeta("mostrar_peliculas", listado_peliculas);
            
            for (let index = 1; index <= listado_peliculas.length; index++) {
                // Cambia el corazón al dearle al like
                document.getElementById(`like${index}`).addEventListener('click', () => {
                
                    // let like = document.getElementById("like").checked;
                    console.log("Like pulsado");
                    let like = document.getElementById(`like${index}`);

                    let src = like.getAttribute("src");
                    console.log(src);

                    if (src === "./heart_border.png"){
                        like.src = "./heart_filled.png";
                        lista_peliculas_favs.push(listado_peliculas[index - 1]);

                        console.log("Añadido 1 registro", lista_peliculas_favs);
                    }

                    if (src === "./heart_filled.png"){
                        like.src = "./heart_border.png";
                        
                        for (let i = 0; i < lista_peliculas_favs.length; i++) {
    
                            if (lista_peliculas_favs[i].id === listado_peliculas[index - 1].id){
                                console.log(lista_peliculas_favs[i].id);
                                console.log(listado_peliculas[index - 1].id);

                                lista_peliculas_favs.splice(i, 1);
                            }
                            
                        }

                        console.log("Eliminado 1 registro", lista_peliculas_favs);
                    }
                });
            }

            
        }
    }

    xhr.open("GET", API_BASE_URL);

    xhr.send();
}

function procesar_peliculas(peliculas){
    console.log("Entrando en el método procesar_peliculas");

    let lista_peliculas = [];

    peliculas.forEach(pelicula => {
        
        let datos_filtrados = {
            id: pelicula.id,
            original_title: pelicula.original_title,
            overview: pelicula.overview,
            original_language: pelicula.original_language,
            release_date: pelicula.release_date,
            vote_average: pelicula.vote_average,
            poster_path: pelicula.poster_path
        }

        lista_peliculas.push(datos_filtrados);
    });

    return lista_peliculas;
}

function guardar_favs(){
    console.log("Entrando en el método guardar_favs");

    fetch("./save_movies.php", {
        method: "POST",
        headers: {
            "Content-type": "applicattion/json",
        },
        body : JSON.stringify(lista_peliculas_favs)
    }).then((response) => {
        if (response.ok) {           
            return response.json();   
        }
    }).then((data) => {
        console.log(data);
        let respuesta_servidor = document.getElementById("respuesta_servidor");
        respuesta_servidor.innerHTML = `Respuesta del servidor al hacer el POST: ${data.resultado}`;

    }).catch((error) => {
        console.log(error);
    });
}

function obtener_favs(){
    console.log("Entrando en el método obtener_favs");

    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        if(xhr.readyState === READY_STATE_COMPLETE && xhr.status === HTTP_STATUS_OK){
            
            let datos_JSON = JSON.parse(xhr.responseText);
            
            crearTarjeta("mostrar_peliculas_fav", datos_JSON);
        }
    }

    xhr.open("GET", "./get_favs.php");

    xhr.send();
}

function limpiar(){
    console.log("Entrando en el método limpiar");

    document.getElementById("mostrar_peliculas").innerHTML = "";
    document.getElementById("mostrar_peliculas_fav").innerHTML = "";
}

function crearTarjeta(id, listado_peliculas){
    console.log("Entrando en el método crearCarta");

        let contador = 1;
        let div_tarjeta = document.getElementById(id);
        div_tarjeta.innerHTML = "";



        listado_peliculas.forEach((pelicula) => {
            
            let tarjeta = document.createElement("div");
            tarjeta.className = "card";
            tarjeta.style = "width: 18rem;";

            let cuerpo_tarjeta = document.createElement("div");
            cuerpo_tarjeta.className = "card-body";

            for (const campo in pelicula) {
                
                console.log("Tipo de la variable campo", (campo))
                if (campo == "poster_path"){
                    let poster = document.createElement("img");
                    poster.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
                    poster.class = "card-img-top";
                    poster.alt = "Imagen película";

                    tarjeta.appendChild(poster);
                }

                if (campo === "original_title") {
                    let h5 = document.createElement("h5");
                    let titulo = document.createTextNode(pelicula[campo])
                    h5.class = "card-title";
                    h5.appendChild(titulo);

                    cuerpo_tarjeta.appendChild(h5);
                }

                let p = document.createElement("p");
                p.appendChild(document.createTextNode(pelicula[campo]));

                cuerpo_tarjeta.appendChild(p);
                
                
            }

                let img = document.createElement("img");
                img.src = "./heart_border.png";
                img.id = `like${contador}`;
                cuerpo_tarjeta.appendChild(img);

                tarjeta.appendChild(cuerpo_tarjeta);

                div_tarjeta.appendChild(tarjeta);

                contador++;
        });

        
        
}