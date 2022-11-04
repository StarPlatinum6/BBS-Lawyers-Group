/* =========================== API Noticias =========================== */

const noticias = document.querySelector(".servicios__noticias");
const noticias2 = document.querySelector(".servicios__noticias2");
const noticias3 = document.querySelector(".servicios__noticias3");

const cargarNoticias = async () => {

    try {
        let noticiasLeyes = await fetch("http://api.mediastack.com/v1/news?access_key=6782489f14016462e2b6c2767d7060d1&limit=9&keywords=argentina leyes&countries=ar&languages=es");
        let resultadoNoticias = await noticiasLeyes.json();
        console.log(resultadoNoticias)

        let dataNoticias = resultadoNoticias.data;
        console.log(dataNoticias)

        dataNoticias.forEach(noticia => {
            noticias.innerHTML +=
            `
            <p class="lead">${noticia.title}</p>
            <a href="${noticia.url}" target="_blank">Fuente: ${noticia.source}</a>
            <br><br><br>
            `    
        })
    } catch (error) {
        console.log("Error en el request a la API de noticias")
        console.log(error)
    }
}

cargarNoticias();