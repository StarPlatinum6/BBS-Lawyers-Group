/* =========================== API Clima =========================== */

const clima = document.querySelector(".cp__clima");

// Función parsea timestamp UNIX de API a formato hora
const convertirFechaUnix = (fechaUnix) => {
    let fecha = new Date(fechaUnix * 1000),    
        hh = fecha.getHours(),
        h = hh,
        minutos = ('0' + fecha.getMinutes()).slice(-2),     
        amPm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        amPm = 'PM';
    } else if (hh === 12) {
        h = 12;
        amPm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    time = h + ':' + minutos + ' ' + amPm;
    return time;
}


const cargarClima = async () => {

    try {
        let climaBsAs = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-34.60&lon=-58.43&units=metric&exclude=minutely&lang=es&appid=302c11209a8a82ae2ff126079a3242f8");

        let resultadoClima = await climaBsAs.json();
        let datos = resultadoClima.weather;

        datos.forEach(propClima => {
            clima.innerHTML +=
            `
                <p>Clima: ${propClima.description}</p>
                <img src="http://openweathermap.org/img/wn/${propClima.icon}@2x.png">
                <p>Hum: ${resultadoClima.main.humidity}%</p>
                <p>Amanece: ${convertirFechaUnix(resultadoClima.sys.sunrise)}</p>
                <p>Anochece: ${convertirFechaUnix(resultadoClima.sys.sunset)}</p>
                <p>Temp: ${Math.round(resultadoClima.main.temp)} C°</p>
            `
        })

    } catch {
        console.log("Error en el request a la API de clima")
    }
}

cargarClima();