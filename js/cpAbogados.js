/* ================== Sentencias para cpAbogados.html ================== */

let nombreAbogado = sessionStorage.getItem("nombreAbSesion");
let ramaAbogado = sessionStorage.getItem("ramaSesion");
let documentoCliente = sessionStorage.getItem("documentoSesion");

let cantidadTurnos = 0;

turnosSolicitados.forEach((elemento) => {
    if (elemento.Rama == ramaAbogado) {
        cantidadTurnos++;
    }
    return cantidadTurnos;
})

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
bienvenida.innerHTML = `¡Hola ${nombreAbogado}! ¡Hace ${bienvenidaHora} hoy!<br>Tenés ${cantidadTurnos} turnos pendientes.`
document.querySelector(".cp__main").prepend(bienvenida);

// BOTONES //
const btnTurnos = document.getElementById("cp_turnosTodos");
const btnTurnosAbogado = document.getElementById("cp_turnosRama");
const btnCancelarTurno = document.getElementById("cp__cancelarTurno");
const btnCancelarTurnoNo = document.getElementById("cp__cancelarTurno--no");
const btnClienteDatos = document.getElementById("cp__clienteDatos");
const btnOrdenarTurnos = document.getElementById("cp__ordenarTurnos");

// NODOS VER TURNOS //
const clienteTurnos = document.getElementById("cp__turnos--todos");
const clienteTurnosTabla = document.getElementById("cp__clienteTurnos--tabla");
const clienteTurnosTablaDiv = document.getElementById("cp__clienteTurnos--tablaDiv");

// NODOS MIS TURNOS //
const turnosAbogado = document.getElementById("cp__turnos--rama");
const turnosAbogadoTabla = document.getElementById("cp__turnos--tabla");
const turnosAbogadoTablaDiv = document.getElementById("cp__turnos--tablaDiv");

// NODOS CANCELAR TURNOS //
const cancelarTurnoInput = document.getElementById("cp__cancelarTurno--input");
const cancelarTurnoForm = document.querySelector(".cp__main--formularioCancel");
const cancelarTurnoDatos = document.getElementById("cp__cancelarTurno--datos");
const cancelarTurnoResultado = document.getElementById("cp__cancelarTurno--resultado");

// NODOS MOSTRAR CLIENTES //
const datosCliente = document.getElementById("cp__clienteDatos--datos");
const datosClienteDocumento = document.getElementById("cp__clienteDatos--documento");
const datosClienteInfo = document.getElementById("cp__clienteDatos--informe");
const datosClienteInfoTabla = document.getElementById("cp__clienteDatos--informeTabla");

/* ======================================================== */

cancelarTurnoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cancelarTurno();
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

/* ======================================================== */

// Fn para btn "Ver Turnos"

const mostrarTurnos = () => {
    if ((clienteTurnos.classList[1] == 'invisible') || (clienteTurnos.classList[0] == 'invisible') || (clienteTurnos.classList[2] == 'invisible') || (clienteTurnosTablaDiv.classList[1] == 'invisible') || (clienteTurnosTablaDiv.classList[0] == 'invisible') || (clienteTurnosTablaDiv.classList[2] == 'invisible')) {

        clienteTurnosTabla.innerHTML = ``;

        clienteTurnos.classList.remove('invisible');
        clienteTurnos.classList.add('animate__animated');
        clienteTurnos.classList.add('animate__fadeInRight');
        clienteTurnos.classList.remove('animate__fadeOutRight');
        clienteTurnosTablaDiv.classList.remove('invisible');
        clienteTurnosTablaDiv.classList.add('animate__animated');
        clienteTurnosTablaDiv.classList.add('animate__fadeInRight');
        clienteTurnosTablaDiv.classList.remove('animate__fadeOutRight');

        turnosAbogado.classList.add('invisible');
        turnosAbogadoTablaDiv.classList.add('invisible');
        datosClienteInfo.classList.add('invisible');
        datosCliente.classList.add('invisible');
        cancelarTurnoDatos.classList.add('invisible');
    } else {
        setTimeout (() => {
            clienteTurnos.classList.add('invisible');
            clienteTurnosTablaDiv.classList.add('invisible');
        }, 1100);
        clienteTurnos.classList.add('animate__fadeOutRight');
        clienteTurnosTablaDiv.classList.add('animate__fadeOutRight');
        clienteTurnos.classList.remove('animate__fadeInRight');
        clienteTurnosTablaDiv.classList.remove('animate__fadeInRight');

        clienteTurnosTabla.innerHTML = ``;
    }

    let categorias = Object.keys(turnosSolicitados[0])
    
    let tablaHead = document.createElement("tr");
    tablaHead.setAttribute("class", "cp__clienteTurnos--tablaHead");
    document.querySelector("#cp__clienteTurnos--tabla").append(tablaHead);

    let datosHead2 = document.createElement("th");
    datosHead2.innerHTML = `ID`;
    document.querySelector(".cp__clienteTurnos--tablaHead").append(datosHead2);

    categorias.forEach((elemento) => {
        let datosHead = document.createElement("th");
        datosHead.innerHTML = `${elemento}`;
        document.querySelector(".cp__clienteTurnos--tablaHead").append(datosHead);
    })

    turnosSolicitados.forEach((elemento, index) => {
        let datosFilas = document.createElement("tr");
        document.querySelector("#cp__clienteTurnos--tabla").append(datosFilas);
    
        datosFilas.innerHTML += `
        <td>${index+1}</td>
        <td>${elemento.Documento}</td>
        <td>${elemento.Rama}</td>
        <td>${elemento.Abogado}</td>
        <td>${elemento.Año}</td>
        <td>${elemento.Mes}</td>
        <td>${elemento.Dia}</td>
        <td>${elemento.Hora}</td>
        `;
    })
}

btnTurnos.addEventListener('click', mostrarTurnos);

/* ======================================================== */

// Fn para btn "Mis Turnos" (Segun abogado logueado)

const mostrarTurnosRama = () => {
    if ((turnosAbogado.classList[1] == 'invisible') || (turnosAbogado.classList[0] == 'invisible') || (turnosAbogado.classList[2] == 'invisible') || (turnosAbogadoTablaDiv.classList[1] == 'invisible') || (turnosAbogadoTablaDiv.classList[0] == 'invisible') || (turnosAbogadoTablaDiv.classList[2] == 'invisible')) {

        turnosAbogadoTabla.innerHTML = ``;

        turnosAbogado.classList.remove('invisible');
        turnosAbogado.classList.add('animate__animated');
        turnosAbogado.classList.add('animate__fadeInRight');
        turnosAbogado.classList.remove('animate__fadeOutRight');
        turnosAbogadoTablaDiv.classList.remove('invisible');
        turnosAbogadoTablaDiv.classList.add('animate__animated');
        turnosAbogadoTablaDiv.classList.add('animate__fadeInRight');
        turnosAbogadoTablaDiv.classList.remove('animate__fadeOutRight');

        clienteTurnos.classList.add('invisible');
        clienteTurnosTablaDiv.classList.add('invisible');
        datosClienteInfo.classList.add('invisible');
        datosCliente.classList.add('invisible');
        cancelarTurnoDatos.classList.add('invisible');
    } else {
        setTimeout (() => {
            turnosAbogado.classList.add('invisible');
            turnosAbogadoTablaDiv.classList.add('invisible');
        }, 1100);
        turnosAbogado.classList.add('animate__fadeOutRight');
        turnosAbogadoTablaDiv.classList.add('animate__fadeOutRight');
        turnosAbogado.classList.remove('animate__fadeInRight');
        turnosAbogadoTablaDiv.classList.remove('animate__fadeInRight');

        turnosAbogadoTabla.innerHTML = ``;
    }

    let categorias = Object.keys(turnosSolicitados[0])
    
    let tablaHead2 = document.createElement("tr");
    tablaHead2.setAttribute("class", "cp__clienteTurnos--tablaHead2");
    document.querySelector("#cp__turnos--tabla").append(tablaHead2);

    let datosHead2 = document.createElement("th");
    datosHead2.innerHTML = `ID`;
    document.querySelector(".cp__clienteTurnos--tablaHead2").append(datosHead2);

    categorias.forEach(elemento => {
        let datosHead = document.createElement("th");
        datosHead.innerHTML = `${elemento}`;
        document.querySelector(".cp__clienteTurnos--tablaHead2").append(datosHead);
    })

    turnosSolicitados.forEach((elemento, index) => {
        if ((elemento.Rama == ramaAbogado)) {
            let datosFilas = document.createElement("tr");
            document.querySelector("#cp__turnos--tabla").append(datosFilas);
        
            datosFilas.innerHTML += `
            <td>${index+1}</td>
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

btnTurnosAbogado.addEventListener('click', mostrarTurnosRama);

/* ======================================================== */

// Formulario para cancelar turnos según ID

const mostrarCancelacion = () => {
    if ((cancelarTurnoDatos.classList[1] == 'invisible') || (cancelarTurnoDatos.classList[0] == 'invisible') || (cancelarTurnoDatos.classList[2] == 'invisible')) {

        cancelarTurnoDatos.classList.remove('invisible');
        cancelarTurnoDatos.classList.add('animate__animated');
        cancelarTurnoDatos.classList.add('animate__fadeInRight');
        cancelarTurnoDatos.classList.remove('animate__fadeOutRight');

        datosCliente.classList.add('invisible');
        datosClienteInfo.classList.add('invisible');
        turnosAbogado.classList.add('invisible');
        turnosAbogadoTablaDiv.classList.add('invisible');
        clienteTurnos.classList.add('invisible');
        clienteTurnosTablaDiv.classList.add('invisible');
    } else {
        setTimeout (() => {
            cancelarTurnoDatos.classList.add('invisible');
        }, 1100);
        cancelarTurnoDatos.classList.add('animate__fadeOutRight');
        cancelarTurnoDatos.classList.remove('animate__fadeInRight');
    }

}

// Fn del btn "Cancelar Turnos"

const cancelarTurno = () => {

    let val1 = false;
    let identificadorTurno = cancelarTurnoInput.value.trim();

    if (identificadorTurno === '') {
        estadoIncorrecto(cancelarTurnoInput, 'El identificador es obligatorio');
        val1 = false;
    } else if (isNaN(identificadorTurno)) {
        estadoIncorrecto(cancelarTurnoInput, 'El identificador ingresado no es correcto')
        val1 = false;
    } else if ((turnosSolicitados[identificadorTurno-1] === undefined)) {
        estadoIncorrecto(cancelarTurnoInput, 'No registramos ningún turno con dicho identificador')
        val1 = false;
    } else {
        estadoCorrecto(cancelarTurnoInput);
        val1 = true;
    } 

    if (val1 == true) {
        identificadorTurno--;
        turnosSolicitados.splice(identificadorTurno, 1);
        localStorage.setItem("baseTurnos", JSON.stringify(turnosSolicitados));
        cancelarTurnoResultado.classList.remove('invisible');
        cancelarTurnoResultado.innerHTML =
        `
        Listo, se eliminó el turno elegido.
        `
        setTimeout (() => {
            cancelarTurnoDatos.classList.add('invisible');
            cancelarTurnoResultado.classList.add('invisible');
        }, 4000);
    }
};

btnCancelarTurno.addEventListener('click', mostrarCancelacion);
btnCancelarTurnoNo.addEventListener('click', mostrarCancelacion);

/* ======================================================== */

const mostrarClientes = () => {
    if ((datosCliente.classList[1] == 'invisible') || (datosCliente.classList[0] == 'invisible') || (datosCliente.classList[2] == 'invisible') || (datosClienteInfo.classList[1] == 'invisible') || (datosClienteInfo.classList[0] == 'invisible') || (datosClienteInfo.classList[2] == 'invisible')) {
        
        datosClienteInfoTabla.innerHTML = ``;

        datosClienteInfo.classList.remove('invisible');
        datosClienteInfo.classList.add('animate__animated');
        datosClienteInfo.classList.add('animate__fadeInRight');
        datosClienteInfo.classList.remove('animate__fadeOutRight');
        datosCliente.classList.remove('invisible');
        datosCliente.classList.add('animate__animated');
        datosCliente.classList.add('animate__fadeInRight');
        datosCliente.classList.remove('animate__fadeOutRight');

        cancelarTurnoDatos.classList.add('invisible');
        clienteTurnos.classList.add('invisible');
        clienteTurnosTablaDiv.classList.add('invisible');
        turnosAbogado.classList.add('invisible');
        turnosAbogadoTablaDiv.classList.add('invisible');
    } else {
        setTimeout (() => {
            datosCliente.classList.add('invisible');
            datosClienteInfo.classList.add('invisible');
        }, 1100);
        datosCliente.classList.add('animate__fadeOutRight');
        datosClienteInfo.classList.add('animate__fadeOutRight');
        datosCliente.classList.remove('animate__fadeInRight');
        datosClienteInfo.classList.remove('animate__fadeInRight');

        datosClienteInfoTabla.innerHTML = ``;
    }

    let categorias = Object.keys(clientes[0])
    
    let tablaHead = document.createElement("tr");
    tablaHead.setAttribute("class", "cp__clienteTurnos--tablaHeadClientes");
    document.querySelector("#cp__clienteDatos--informeTabla").append(tablaHead);

    let datosHead2 = document.createElement("th");
    datosHead2.innerHTML = `ID`;
    document.querySelector(".cp__clienteTurnos--tablaHeadClientes").append(datosHead2);

    categorias.forEach((elemento) => {
        let datosHead = document.createElement("th");
        datosHead.innerHTML = `${elemento}`;
        document.querySelector(".cp__clienteTurnos--tablaHeadClientes").append(datosHead);
    })

    clientes.forEach((elemento, index) => {
        let datosFilas = document.createElement("tr");
        document.querySelector("#cp__clienteDatos--informeTabla").append(datosFilas);
    
        datosFilas.innerHTML += `
        <td>${index+1}</td>
        <td>${elemento.Nombre}</td>
        <td>${elemento.Apellido}</td>
        <td>${elemento.Documento}</td>
        <td>${elemento.Telefono}</td>
        <td>${elemento.Mail}</td>
        <td>${elemento.Direccion}</td>
        <td>${elemento.Genero}</td>
        <td>${elemento.Provincia}</td>
        <td>${elemento.Localidad}</td>
        <td>${elemento.CPostal}</td>
        `;
    })
}

btnClienteDatos.addEventListener('click', mostrarClientes);


/* ======================================================== */

const ordenarTurnos = () => {

    turnosSolicitados.forEach((dato) => {
        if (dato.Mes == 'Enero') { dato.Mes = 0;}
        if (dato.Mes == 'Febrero') { dato.Mes = 1}
        if (dato.Mes == 'Marzo') { dato.Mes = 2}
        if (dato.Mes == 'Abril') { dato.Mes = 3}
        if (dato.Mes == 'Mayo') { dato.Mes = 4}
        if (dato.Mes == 'Junio') { dato.Mes = 5}
        if (dato.Mes == 'Julio') { dato.Mes = 6}
        if (dato.Mes == 'Agosto') { dato.Mes = 7}
        if (dato.Mes == 'Septiembre') { dato.Mes = 8}
        if (dato.Mes == 'Octubre') { dato.Mes = 9}
        if (dato.Mes == 'Noviembre') { dato.Mes = 10}
        if (dato.Mes == 'Diciembre') { dato.Mes = 11}
    })

    const multipleSort = (turnosSolicitados = []) => {
        turnosSolicitados.sort((a, b) => {
            return a.Año - b.Año || a.Mes - b.Mes || a.Dia - b.Dia || a.Hora - b.Hora;
        });
    };

    multipleSort(turnosSolicitados);

    turnosSolicitados.forEach((dato) => {
        if (dato.Mes == 0) { dato.Mes = 'Enero';}
        if (dato.Mes == 1) { dato.Mes = 'Febrero'}
        if (dato.Mes == 2) { dato.Mes = 'Marzo'}
        if (dato.Mes == 3) { dato.Mes = 'Abril'}
        if (dato.Mes == 4) { dato.Mes = 'Mayo'}
        if (dato.Mes == 5) { dato.Mes = 'Junio'}
        if (dato.Mes == 6) { dato.Mes = 'Julio'}
        if (dato.Mes == 7) { dato.Mes = 'Agosto'}
        if (dato.Mes == 8) { dato.Mes = 'Septiembre'}
        if (dato.Mes == 9) { dato.Mes = 'Octubre'}
        if (dato.Mes == 10) { dato.Mes = 'Noviembre'}
        if (dato.Mes == 11) { dato.Mes = 'Diciembre'}
    })

    localStorage.setItem("baseTurnos", JSON.stringify(turnosSolicitados));

    Swal.fire({
        title: '¡Perfecto!',
        icon: 'success',
        html: 'Los turnos fueron ordenados por fecha.',
        focusConfirm: false,
        confirmButtonText: '¡Entendido!',
        timer: 3000,
        showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
        }
    })

};

btnOrdenarTurnos.addEventListener('click', ordenarTurnos);