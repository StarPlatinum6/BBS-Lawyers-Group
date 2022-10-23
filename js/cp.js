/* ================== Sentencias para cp.html ================== */

let documentoCliente = sessionStorage.getItem("documentoSesion");
let nombreCliente = sessionStorage.getItem("nombreSesion");
let apellidoCliente = sessionStorage.getItem("apellidoSesion");

let horaActual = new Date().getHours();
let bienvenidaHora;

if ((horaActual >= 6) && (horaActual <= 12)) {
    bienvenidaHora = `un lindo día`;
} else if ((horaActual >= 13) && (horaActual <= 19)) {
    bienvenidaHora = `una linda tarde`;
} else {
    bienvenidaHora = `una linda noche`;
}

const bienvenida = document.createElement("div");
bienvenida.setAttribute("class", "row justify-content-center lead text-center cp__main--bienvenida");
bienvenida.innerHTML = `¡Hola ${nombreCliente} ${apellidoCliente}! ¡Hace ${bienvenidaHora} hoy!<br>¿Qué podemos hacer por vos?`
document.querySelector(".cp__main").prepend(bienvenida);

// BOTONES //
const btnNuevoTurno = document.getElementById("cp__nuevoTurno");
const btnCancelarTurno = document.getElementById("cp__cancelarTurno");
const btnCancelarTurnoSi = document.getElementById("cp__cancelarTurno--si");
const btnCancelarTurnoNo = document.getElementById("cp__cancelarTurno--no");
const btnClienteDatos = document.getElementById("cp__clienteDatos");
const btnClienteTurnos = document.getElementById("cp__clienteTurnos");

// NODOS NUEVO TURNO //
const formulario = document.querySelector(".cp__main--formularioTurnos");
const nuevoTurnoDatos = document.getElementById("cp__nuevoTurno--datos");
const resultado = document.querySelector(".registro__main--resultado");

// NODOS CANCELAR TURNOS //
const cancelarTurnoDatos = document.getElementById("cp__cancelarTurno--datos");
const cancelarTurnoDocumento = document.getElementById("cp__cancelarTurno--documento");
const cancelarTurnoInforme = document.getElementById("cp__cancelarTurno--informe");
const cancelarTurnoResultado = document.getElementById("cp__cancelarTurno--resultado");

// NODOS MIS DATOS //
const datosCliente = document.getElementById("cp__clienteDatos--datos");
const datosClienteDocumento = document.getElementById("cp__clienteDatos--documento");
const datosClienteInfo = document.getElementById("cp__clienteDatos--informe");
const datosClienteTabla = document.getElementById("cp__clienteDatos--tabla")

// NODOS MIS TURNOS //
const clienteTurnos = document.getElementById("cp__clienteTurnos--datos");
const clienteTurnosDocumento = document.getElementById("cp__clienteTurnos--documento");
const clienteTurnosInfo = document.getElementById("cp__clienteTurnos--informe");
const clienteTurnosTabla = document.getElementById("cp__clienteTurnos--tabla");


const mostrarFormulario = () => {
    if ((nuevoTurnoDatos.classList[1] == 'invisible') || (nuevoTurnoDatos.classList[0] == 'invisible') || (nuevoTurnoDatos.classList[2] == 'invisible')) {
        nuevoTurnoDatos.classList.remove('invisible');
        nuevoTurnoDatos.classList.add('animate__animated');
        nuevoTurnoDatos.classList.add('animate__fadeInRight');
        nuevoTurnoDatos.classList.remove('animate__fadeOutRight');
        cancelarTurnoDatos.classList.add('invisible');
        datosCliente.classList.add('invisible');
        datosClienteInfo.classList.add('invisible');
        clienteTurnos.classList.add('invisible');
        clienteTurnosInfo.classList.add('invisible');
    } else {
        setTimeout (() => {
            nuevoTurnoDatos.classList.add('invisible');
        }, 1100);
        nuevoTurnoDatos.classList.add('animate__fadeOutRight');
        nuevoTurnoDatos.classList.remove('animate__fadeInRight');
    }
}

const rama = document.getElementById("turno__rama");
const anio = document.getElementById("turno__anio");
const mes = document.getElementById("turno__mes");
const dia = document.getElementById("turno__dia");

const agregarTurno = () => {

    let val1 = false;
    let val2 = false;

    let ramaValor = rama.value.trim();
    let anioValor = parseInt(anio.value.trim());
    let mesValor = mes.value.trim();
    let diaValor = parseInt(dia.value.trim());
    let hora = Math.round(Math.random()*10+8);
    let abogadoAsignado = asignarAbogado(ramaValor);

    if (diaValor === '') {
        estadoIncorrecto(dia, 'El día es obligatorio');
        val1 = false;
    } else if (((diaValor < 1) || (diaValor > meses[mesValor-1].dias)) || (isNaN(diaValor))) {
        estadoIncorrecto(dia, 'La fecha ingresada está fuera del rango de días del mes o ingresaste un dato incorrecto')
        val1 = false;
    } else if ((anioValor == 2022) && (mesValor - 1 == (hoy.getMonth())) && (diaValor <= hoy.getDate()) || (isNaN(diaValor) || (diaValor > meses[mesValor-1].dias))) {
        estadoIncorrecto(dia, 'No podemos agendar turnos para hoy o para el pasado, o ingresaste un valor incorrecto.')
    } else {
        estadoCorrecto(dia);
        val1 = true;
    }

    if ((anioValor == 2022) && (mesValor - 1 < (hoy.getMonth()))) {
        estadoIncorrecto(mes, 'No podemos agendar turnos para el pasado');
        estadoIncorrecto(anio, 'No podemos agendar turnos para el pasado');
        val2 = false;
    } else {
        estadoCorrecto(mes);
        estadoCorrecto(anio);
        val2 = true;
    }

    mesTurno = meses[mesValor-1].nombre;

    if ((val1 == true) && (val2 == true)) {
    let nuevoTurno = new Turno (documentoCliente, ramaValor, abogadoAsignado, anioValor, mesTurno, diaValor, hora);
    turnosSolicitados.push(nuevoTurno);
        
        resultado.classList.remove('invisible');
        resultado.style.color = "#0ab96d";
        resultado.innerHTML = `<h6>¡El turno se agendó con éxito! Podés verificarlo desde Mis Turnos.</h6>`;
        setTimeout (() => {
            resultado.classList.add('invisible');
        }, 4000);
    } else {
        resultado.classList.remove('invisible');
        resultado.style.color = "#ff3860";
        resultado.innerHTML = `<h6>Mientras haya datos incorrectos, no se podrá agendar el turno.</h6>`;
        setTimeout (() => {
            resultado.classList.add('invisible');
        }, 4000);
    }

};

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarTurno();
    localStorage.setItem("baseTurnos", JSON.stringify(turnosSolicitados));
});

const estadoIncorrecto = (el, mensaje) => {
    const controlIngreso = el.parentElement;
    const errorDisplay = controlIngreso.querySelector('.incorrecto');

    errorDisplay.innerText = mensaje;
    controlIngreso.classList.add('incorrecto');
    controlIngreso.classList.remove('correcto')
};

const estadoCorrecto = el => {
    const controlIngreso = el.parentElement;
    const errorDisplay = controlIngreso.querySelector('.incorrecto');

    errorDisplay.innerText = '';
    controlIngreso.classList.add('correcto');
    controlIngreso.classList.remove('incorrecto');
};

const asignarAbogado = (ramaValor) => {
    let abogadoAsignado;
    switch (ramaValor) {
        case "Civil":
            abogadoAsignado = abogadosBBS[0].nombre;
            break;
        case "Familia":
            abogadoAsignado = abogadosBBS[1].nombre;
            break;
        case "Penal":
            abogadoAsignado = abogadosBBS[2].nombre;
            break;
        case "Laboral":
            abogadoAsignado = abogadosBBS[3].nombre;
            break;
        case "Accidentes":
            abogadoAsignado = abogadosBBS[4].nombre;
            break;
        default:
            alert("Si ves éste mensaje significa que se rompió el tejido del espacio-tiempo, busca a tu astrofísico de cabecera.");
            break;
    }

    return abogadoAsignado;

};

btnNuevoTurno.addEventListener('click', mostrarFormulario);

/* ======================================================== */

const mostrarCancelacion = () => {
        if ((cancelarTurnoDatos.classList[1] == 'invisible') || (cancelarTurnoDatos.classList[0] == 'invisible') || (cancelarTurnoDatos.classList[2] == 'invisible')) {

            cancelarTurnoDatos.classList.remove('invisible');
            cancelarTurnoDatos.classList.add('animate__animated');
            cancelarTurnoDatos.classList.add('animate__fadeInRight');
            cancelarTurnoDatos.classList.remove('animate__fadeOutRight');

            nuevoTurnoDatos.classList.add('invisible');
            datosCliente.classList.add('invisible');
            datosClienteInfo.classList.add('invisible');
            clienteTurnos.classList.add('invisible');
            clienteTurnosInfo.classList.add('invisible');
        } else {
            setTimeout (() => {
                cancelarTurnoDatos.classList.add('invisible');
            }, 1100);
            cancelarTurnoDatos.classList.add('animate__fadeOutRight');
            cancelarTurnoDatos.classList.remove('animate__fadeInRight');
        }

    let turnoEliminar = turnosSolicitados.findIndex(elemento => elemento.Documento === documentoCliente);

    cancelarTurnoDocumento.innerHTML = `${documentoCliente}`;
    if (turnoEliminar != -1) {
        cancelarTurnoInforme.innerHTML = `
        <div class="table-responsive m-2">
            <table class="table table-striped table-hover">
                <tr>
                    <td>Abogado</td>
                    <td>Rama</td>
                    <td>Año</td>
                    <td>Mes</td>
                    <td>Dia</td>
                    <td>Hora</td>
                </tr>
            <tr>
                <td>${turnosSolicitados[turnoEliminar].Abogado}</td>
                <td>${turnosSolicitados[turnoEliminar].Rama}</td>
                <td>${turnosSolicitados[turnoEliminar].Año}</td>
                <td>${turnosSolicitados[turnoEliminar].Mes}</td>
                <td>${turnosSolicitados[turnoEliminar].Dia}</td>
                <td>${turnosSolicitados[turnoEliminar].Hora}:00hs</td>
            </tr>
            </table>
        </div>`;
    } else {
        cancelarTurnoInforme.innerHTML = ``
    }
}

const cancelarTurno = () => {
    
    if ((turnosSolicitados.some((elemento) => elemento.Documento == documentoCliente)) == true) {
        let turnoEliminar = turnosSolicitados.findIndex(elemento => elemento.Documento === documentoCliente);
        turnosSolicitados.splice(turnoEliminar, 1);
        localStorage.setItem("baseTurnos", JSON.stringify(turnosSolicitados));
        cancelarTurnoResultado.classList.remove('invisible');
        cancelarTurnoResultado.innerHTML = `
        Listo, se eliminó el turno correspondiente.<br><br>
        Si tiene otro turno con el mismo DNI, realice otra cancelación.
        `
        setTimeout (() => {
            cancelarTurnoDatos.classList.add('invisible');
            cancelarTurnoResultado.classList.add('invisible');
        }, 4000);
    } else {
        cancelarTurnoResultado.classList.remove('invisible');
        cancelarTurnoResultado.innerHTML = `
        No registramos ningún turno con dicho número de DNI.
        `
        setTimeout (() => {
            cancelarTurnoDatos.classList.add('invisible');
            cancelarTurnoResultado.classList.add('invisible');
        }, 4000);
    }
};

btnCancelarTurno.addEventListener('click', mostrarCancelacion);
btnCancelarTurnoNo.addEventListener('click', mostrarCancelacion);
btnCancelarTurnoSi.addEventListener('click', cancelarTurno);

/* ======================================================== */

const mostrarCliente = () => {
    if ((datosCliente.classList[1] == 'invisible') || (datosCliente.classList[0] == 'invisible') || (datosCliente.classList[2] == 'invisible') || (datosClienteInfo.classList[1] == 'invisible') || (datosClienteInfo.classList[0] == 'invisible') || (datosClienteInfo.classList[2] == 'invisible')) {

        datosClienteTabla.innerHTML = ``
    
        datosClienteInfo.classList.remove('invisible');
        datosClienteInfo.classList.add('animate__animated');
        datosClienteInfo.classList.add('animate__fadeInRight');
        datosClienteInfo.classList.remove('animate__fadeOutRight');
        datosCliente.classList.remove('invisible');
        datosCliente.classList.add('animate__animated');
        datosCliente.classList.add('animate__fadeInRight');
        datosCliente.classList.remove('animate__fadeOutRight');

        nuevoTurnoDatos.classList.add('invisible');
        cancelarTurnoDatos.classList.add('invisible');
        clienteTurnos.classList.add('invisible');
        clienteTurnosInfo.classList.add('invisible');
    } else {
        setTimeout (() => {
            datosCliente.classList.add('invisible');
            datosClienteInfo.classList.add('invisible');
        }, 1100);
        datosCliente.classList.add('animate__fadeOutRight');
        datosClienteInfo.classList.add('animate__fadeOutRight');
        datosCliente.classList.remove('animate__fadeInRight');
        datosClienteInfo.classList.remove('animate__fadeInRight');

        datosClienteTabla.innerHTML = ``
    }

    datosClienteDocumento.innerHTML = `${documentoCliente}`;

    let indiceCliente = clientes.findIndex(elemento => elemento.Documento === documentoCliente);

    if (indiceCliente != -1) {
        let categorias = Object.keys(clientes[indiceCliente])
        let valores = Object.values(clientes[indiceCliente])

        let filaHead = document.createElement("tr");
        filaHead.setAttribute("class", "cp__clienteDatos--categorias");
        document.querySelector("#cp__clienteDatos--tabla").append(filaHead);

        let datosHead2 = document.createElement("th");
        datosHead2.innerHTML = `ID`;
        document.querySelector(".cp__clienteDatos--categorias").append(datosHead2);

        categorias.forEach((elemento) => {
            let datosHead = document.createElement("th");
            datosHead.innerHTML = `${elemento}`;
            document.querySelector(".cp__clienteDatos--categorias").append(datosHead);
        })

        let filaDatos = document.createElement("tr");
        filaDatos.setAttribute("class", "cp__clienteDatos--valores");
        document.querySelector("#cp__clienteDatos--tabla").append(filaDatos);

        let datosFila2 = document.createElement("td");
        datosFila2.innerHTML = `${indiceCliente+1}`;
        document.querySelector(".cp__clienteDatos--valores").append(datosFila2);

        valores.forEach((elemento) => {
            let datosFila = document.createElement("td");
            datosFila.innerHTML = `${elemento}`;
            document.querySelector(".cp__clienteDatos--valores").append(datosFila);
        })
    }
}

btnClienteDatos.addEventListener('click', mostrarCliente);

/* ======================================================== */

const mostrarTurnos = () => {
    if ((clienteTurnos.classList[1] == 'invisible') || (clienteTurnos.classList[0] == 'invisible') || (clienteTurnos.classList[2] == 'invisible') || (clienteTurnosInfo.classList[1] == 'invisible') || (clienteTurnosInfo.classList[0] == 'invisible') || (clienteTurnosInfo.classList[2] == 'invisible')) {

        clienteTurnosTabla.innerHTML = ``;

        clienteTurnos.classList.remove('invisible');
        clienteTurnos.classList.add('animate__animated');
        clienteTurnos.classList.add('animate__fadeInRight');
        clienteTurnos.classList.remove('animate__fadeOutRight');
        clienteTurnosInfo.classList.remove('invisible');
        clienteTurnosInfo.classList.add('animate__animated');
        clienteTurnosInfo.classList.add('animate__fadeInRight');
        clienteTurnosInfo.classList.remove('animate__fadeOutRight');

        datosClienteInfo.classList.add('invisible');
        datosCliente.classList.add('invisible');
        nuevoTurnoDatos.classList.add('invisible');
        cancelarTurnoDatos.classList.add('invisible');
    } else {
        setTimeout (() => {
            clienteTurnos.classList.add('invisible');
            clienteTurnosInfo.classList.add('invisible');
        }, 1100);
        clienteTurnos.classList.add('animate__fadeOutRight');
        clienteTurnosInfo.classList.add('animate__fadeOutRight');
        clienteTurnos.classList.remove('animate__fadeInRight');
        clienteTurnosInfo.classList.remove('animate__fadeInRight');

        clienteTurnosTabla.innerHTML = ``;
    }

    clienteTurnosDocumento.innerHTML = `${documentoCliente}`;

    let categorias = Object.keys(turnosSolicitados[0])
    
    let tablaHead = document.createElement("tr");
    tablaHead.setAttribute("class", "cp__clienteTurnos--tablaHead");
    document.querySelector("#cp__clienteTurnos--tabla").append(tablaHead);


    categorias.forEach(elemento => {
        let datosHead = document.createElement("th");
        datosHead.innerHTML = `${elemento}`;
        document.querySelector(".cp__clienteTurnos--tablaHead").append(datosHead);
    })

    turnosSolicitados.forEach(elemento => {
        if ((elemento.Documento == documentoCliente)) {

            let datosFilas = document.createElement("tr");
            document.querySelector("#cp__clienteTurnos--tabla").append(datosFilas);
    
            datosFilas.innerHTML += `
            <td>${elemento.Documento}</td>
            <td>${elemento.Rama}</td>
            <td>${elemento.Abogado}</td>
            <td>${elemento.Año}</td>
            <td>${elemento.Mes}</td>
            <td>${elemento.Dia}</td>
            <td>${elemento.Hora}</td>
            `;
        }
    })
}

btnClienteTurnos.addEventListener('click', mostrarTurnos);