// Code Simulador Interactivo Proyecto Final Entrega 2:

/* ============================ Inicialización de Variables ============================ */

const hoy = new Date();
const diasMeses = [31,28,31,30,31,30,31,31,30,31,30,31];
const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const nombreProvincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago Del Estero", "Tierra Del Fuego", "Tucuman"];


const abogadosBBS = [
    {id: 1, nombre: "Jesica Brusco", areaEspecialidad: "Civil", contrasenia: "JesicaBBS2022"},
    {id: 2, nombre: "Natalia Simonetta", areaEspecialidad: "Familia", contrasenia: "NataliaBBS2022"},
    {id: 3, nombre: "Pablo Martinic", areaEspecialidad: "Penal", contrasenia: "PabloBBS2022"},
    {id: 4, nombre: "Lourdes Ledesma", areaEspecialidad: "Laboral", contrasenia: "LourdesBBS2022"},
    {id: 5, nombre: "Maximiliano Mazzaccaro", areaEspecialidad: "Accidentes", contrasenia: "MaxiBBS2022"}
];

let clientes = [];
let turnosSolicitados = [];

/* ============================ Declaracion de Clases ============================ */

class Cliente {
    constructor (nombre, apellido, telefono, mail, direccion, documento, genero, provincia, localidad, codigoPostal) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.mail = mail;
        this.direccion = direccion;
        this.documento = documento;
        this.genero = genero;
        this.provincia = provincia;
        this.localidad = localidad;
        this.codigoPostal = codigoPostal;
    }
}

class Turno {
    constructor (documento, ramaDerecho, abogadoAsignado, anio, mes, dia, hora) {
        this.documento = documento;
        this.ramaDerecho = ramaDerecho;
        this.abogadoAsignado = abogadoAsignado;
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
    }
}

/* ============================ Funciones de creación de objetos ============================ */

const nuevoCliente = () => {
    let nombre = validarNombre();
    let apellido = validarApellido();
    let telefono = validarTelefono ();
    let mail = validarMail();
    let direccion = parsearDireccion(); 
    let documento = validarDocumento(); 
    let genero = validarGenero(); 
    let provincia = validarProvincia(); 
    let localidad = parsearLocalidad(); 
    let codigoPostal = validarCP(); 

    let nuevoCliente = new Cliente (nombre, apellido, telefono, mail, direccion, documento, genero, provincia, localidad, codigoPostal);
    clientes.push(nuevoCliente);

    alert(`¡El registro se realizó con éxito!`);

};

const nuevoTurno = () => {
    let documento = validarDocumento();
    if ((clientes.some((elemento) => elemento.documento == documento)) == true) {
        let documentoCliente = documento;
        let ramaDerecho = validarRama();
        let abogadoAsignado = asignarAbogado(ramaDerecho);
        let anio = validarAnio();
        let mes = validarMes(anio);
        let dia = validarDia(mes, anio);
        let hora = Math.round(Math.random()*10+8);

        let nuevoTurno = new Turno (documentoCliente, ramaDerecho, abogadoAsignado, anio, mes, dia, hora);
        turnosSolicitados.push(nuevoTurno);

        alert(`¡El turno se registró con éxito! A continuación te detallamos el mismo:`);

        alert(`Tu profesional asignado es ${abogadoAsignado}, especialista en derecho ${ramaDerecho}. La cita con el mismo tendrá lugar en la Av. Córdoba 1890 - Ciudad Autónoma de Buenos Aires, el ${dia} de ${nombreMeses[mes-1]} de ${anio} a las ${hora}:00hs.`);

        alert(`Por favor, ¡se puntual con el horario de llegada! El turno será de 1 hora.`);
        
        alert(`Si necesitas nuevamente los datos del turno, podrás solicitarlos con tu número de documento desde el menú principal.`);

    } else {
        alert (`No verificamos ningún cliente con dicho número de documento, debes registrarte primero.`);
    }

};

/* ================================== Funciones de parseo ================================== */

const parsearDireccion = () => {
    let direccion = prompt("Indicanos tu domicilio con numeración").toLowerCase();
    let direccionParseada = direccion.split(" ");

    for (let i = 0; i < direccionParseada.length; i++) {
        direccionParseada[i] = direccionParseada[i][0].toUpperCase() + direccionParseada[i].substr(1);
    }

    direccion = direccionParseada.join(" ");

    return direccion;

};

/* ================================================================================= */

const parsearLocalidad = () => {
    let localidad = prompt("Indicanos tu localidad").toLowerCase();
    let localidadParseada = localidad.split(" ");

    for (let i = 0; i < localidadParseada.length; i++) {
        localidadParseada[i] = localidadParseada[i][0].toUpperCase() + localidadParseada[i].substr(1);
    }
    localidad = localidadParseada.join(" ");

    return localidad;

};

/* ============================ Funciones de Validación ============================ */

const validarNombre = () => {
    let validarNombre = prompt("Indicanos tu nombre:");

    validarNombre = validarNombre.charAt(0).toUpperCase() + validarNombre.slice(1).toLowerCase();

    while (validarNombre.split(" ").length > 1) {
        alert ("El dato ingresado no es correcto, no se admiten espacios.");
        validarNombre = prompt("Indicanos sólo tu nombre:");
        validarNombre = validarNombre.charAt(0).toUpperCase() + validarNombre.slice(1).toLowerCase();
    }

    return validarNombre;

};

/* ================================================================================= */

const validarApellido = () => {
    let validarApellido = prompt("Indicanos tu apellido:");

    validarApellido = validarApellido.charAt(0).toUpperCase() + validarApellido.slice(1).toLowerCase();

    while (validarApellido.split(" ").length > 1) {
        alert ("El dato ingresado no es correcto, no se admiten espacios.");
        validarApellido = prompt("Indicanos sólo tu apellido:");
        validarApellido = validarApellido.charAt(0).toUpperCase() + validarApellido.slice(1).toLowerCase();
    }

    return validarApellido;

};

/* ================================================================================= */

const validarMail = () => {
    let correoElectronico = prompt("Indicanos tu dirección de correo electrónico:");

    correoElectronico = correoElectronico.toLowerCase();

    while ((correoElectronico.includes('@') == false) || (correoElectronico.includes('.') == false) || (correoElectronico.includes(' ') == true)){
        alert ("No es una dirección de correo electrónica válida.");
        correoElectronico = prompt("Indicanos nuevamente tu dirección de correo electrónico:");
    }

    return correoElectronico;

};

/* ================================================================================= */

const validarTelefono = () => {
    let validarTelefono = parseInt(prompt("Indicanos tu número de teléfono celular de Buenos Aires, sin guiones, espacios ni 0 al principio:"));

    while ((((validarTelefono < 1100000000) || (validarTelefono >= 1200000000)) && ((validarTelefono < 1500000000) || (validarTelefono >= 1600000000))) || (isNaN(validarTelefono))){
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        validarTelefono = parseInt(prompt("Indicanos nuevamente tu número telefónico, sin guiones ni espacios:"));
    }

    return validarTelefono;

};

/* ================================================================================= */

const validarRama = () => {
    let ramaConsultaDerecho = prompt("¿Sobre qué rama del derecho necesitás asesoramiento? Podes elegir entre Civil, Laboral, Familia, Penal o Accidentes.");

    ramaConsultaDerecho = ramaConsultaDerecho.charAt(0).toUpperCase() + ramaConsultaDerecho.slice(1).toLowerCase();

    while ((ramaConsultaDerecho != "Civil") && (ramaConsultaDerecho != "Familia") && (ramaConsultaDerecho != "Penal") && (ramaConsultaDerecho != "Laboral") && (ramaConsultaDerecho != "Accidentes")) {
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        ramaConsultaDerecho = prompt("Indica nuevamente, podes elegir entre Civil, Laboral, Familia, Penal o Accidentes.");
        ramaConsultaDerecho = ramaConsultaDerecho.charAt(0).toUpperCase() + ramaConsultaDerecho.slice(1).toLowerCase();
    }

    return ramaConsultaDerecho;
    
};

/* ================================================================================= */

const validarRamaBis = () => {
    let ramaConsultaDerecho = prompt("¿A qué rama del derecho te dedicas? ¿Civil, Laboral, Familia, Penal o Accidentes?");

    ramaConsultaDerecho = ramaConsultaDerecho.charAt(0).toUpperCase() + ramaConsultaDerecho.slice(1).toLowerCase();

    while ((ramaConsultaDerecho != "Civil") && (ramaConsultaDerecho != "Familia") && (ramaConsultaDerecho != "Penal") && (ramaConsultaDerecho != "Laboral") && (ramaConsultaDerecho != "Accidentes")) {
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        ramaConsultaDerecho = prompt("Indica nuevamente, Civil, Laboral, Familia, Penal o Accidentes.");
        ramaConsultaDerecho = ramaConsultaDerecho.charAt(0).toUpperCase() + ramaConsultaDerecho.slice(1).toLowerCase();
    }

    return ramaConsultaDerecho;
    
};

/* ================================================================================= */

const validarDocumento = () => {
    let documento = parseInt(prompt("Indica el número de documento, sin puntos:"));

    while ((documento < 0) || (isNaN(documento))){
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        documento = parseInt(prompt("Indica nuevamente el número de documento, sin puntos:"));
    }

    return documento;

};

/* ================================================================================= */

const validarGenero = () => {
    let generoCliente = prompt("Indicanos tu género, masculino, femenino u otro");

    generoCliente = generoCliente.charAt(0).toUpperCase() + generoCliente.slice(1).toLowerCase();

    while ((generoCliente != "Masculino") && (generoCliente != "Femenino") && (generoCliente != "Otro")) {
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        generoCliente = prompt("Indica nuevamente, podes elegir entre masculino, femenino u otro.");
        generoCliente = generoCliente.charAt(0).toUpperCase() + generoCliente.slice(1).toLowerCase();
    }

    if (generoCliente == "Otro") {
        generoCliente = prompt("Indique su género no binario:");
        let generoClienteNB = generoCliente.split(" ");
        for (let i = 0; i < generoClienteNB.length; i++) {
            generoClienteNB[i] = generoClienteNB[i][0].toUpperCase() + generoClienteNB[i].substr(1);
        }
        generoCliente = generoClienteNB.join(" ");
    }

    return generoCliente;
    
};

/* ================================================================================= */

const validarProvincia = () => {
    let provincia = prompt("Indíquenos su provincia de residencia, sin tildes:");

    let provinciaParseada = provincia.split(" ");

    for (let i = 0; i < provinciaParseada.length; i++) {
        provinciaParseada[i] = provinciaParseada[i][0].toUpperCase() + provinciaParseada[i].substr(1);
    }

    provincia = provinciaParseada.join(" ");

    while (nombreProvincias.some((elemento) => elemento == provincia) == false) {
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        provincia = prompt("Indíquenos nuevamente su provincia de residencia, sin tildes:");
        provinciaParseada = provincia.split(" ");
        for (let i = 0; i < provinciaParseada.length; i++) {
            provinciaParseada[i] = provinciaParseada[i][0].toUpperCase() + provinciaParseada[i].substr(1);
        }
        provincia = provinciaParseada.join(" ");
    }

    return provincia;

};

/* ================================================================================= */

const validarCP = () => {
    let codigoPostal = parseInt(prompt("Indicanos tu código postal, sólo números:"));

    while ((codigoPostal < 0) || (isNaN(codigoPostal))){
        alert ("El dato ingresado no es correcto, ingréselo nuevamente");
        codigoPostal = parseInt(prompt("Indicanos nuevamente tu código postal, sólo números:"));
    }

    return codigoPostal;

};

/* ============================ Funcioes de validación de fecha ============================ */

const validarAnio = () => {
    let anioTurno = parseInt(prompt(`Indicá para qué año querrías solicitar el turno, 2022 o 2023:`));

    while (((anioTurno != 2022) && (anioTurno != 2023)) || (isNaN(anioTurno))) {
        alert ("El año ingresado es incorrecto.");
        anioTurno = parseInt(prompt("Indicá nuevamente para año qué querrías solicitar el turno, 2022 o 2023:"));
    }

    return anioTurno;

};

/* ================================================================================= */

const validarMes = (anio) => {
    let mesTurno = parseInt(prompt(`Indicá en qué mes del ${anio} querrías solicitar el turno, del 1 para enero hasta 12 para diciembre:`));

    while (((mesTurno < 1) || (mesTurno > 12)) || (isNaN(mesTurno))) {
        alert ("La fecha ingresada está fuera del rango de meses del año o ingresaste un dato incorrecto, intenta nuevamente");
        mesTurno = parseInt(prompt(`Indicá nuevamente en qué mes del ${anio} querrías solicitar el turno (1 a 12):`));
    }

    while (((anio == 2022) && (mesTurno - 1 < (hoy.getMonth())) || (isNaN(mesTurno)) || (mesTurno > 12))) {
        alert ("No podemos agendar turnos para el pasado, o ingresaste un valor incorrecto.");
        mesTurno = parseInt(prompt(`Indicá nuevamente en qué mes del ${anio} querrías solicitar el turno (${(hoy.getMonth())+1} a 12):`));
    }
    return mesTurno;

};

/* ================================================================================= */

const validarDia = (mes, anio) => {
    let diaTurno = parseInt(prompt(`Indicá en qué día de ${nombreMeses[mes-1]} querrías solicitar el turno:`));

    while (((diaTurno < 1) || (diaTurno > diasMeses[mes-1])) || (isNaN(diaTurno))) {
        alert (`La fecha ingresada está fuera del rango de días de ${nombreMeses[mes-1]} o ingresaste un dato incorrecto, intenta nuevamente`);
        diaTurno = parseInt(prompt(`Indicá nuevamente en qué día de ${nombreMeses[mes-1]} querrías solicitar el turno (1 a ${diasMeses[mes-1]}):`));
    }

    while ((anio == 2022) && (mes - 1 == (hoy.getMonth())) && (diaTurno <= hoy.getDate()) || (isNaN(diaTurno) || (diaTurno > diasMeses[mes-1]))) {
        alert ("No podemos agendar turnos para hoy o para el pasado, o ingresaste un valor incorrecto.");
        diaTurno = parseInt(prompt(`Indicá nuevamente en qué día de ${nombreMeses[mes-1]} querrías solicitar el turno (${hoy.getDate()+1} a ${diasMeses[mes-1]}):`));
    }
    
    return diaTurno;

};

/* ============================ Funciones de menú ============================ */

const menuPrincipal = () => {
    let opcionElegidaMenu;
    do {
        opcionElegidaMenu = parseInt(prompt(`Menú principal, selecciona la opción: 
        1) Registrarme como cliente.
        2) Solicitar un turno.
        3) Cancelar un turno.
        4) Buscar mi perfil.
        5) Buscar mis turnos.
        6) Acceso Abogados.
        7) Salir`));
        switch(opcionElegidaMenu) {
            case 1:
                nuevoCliente();
                break;
            case 2:
                nuevoTurno();
                break;
            case 3:
                cancelarTurno();
                break;
            case 4:
                buscarCliente();
                break;
            case 5:
                buscarTurnos();
                break;
            case 6:
                menuAbogados();
                break;
            case 7:
                break;
            default:
                alert("Si ves éste mensaje significa que se rompió el tejido del espacio-tiempo, busca a tu astrofísico de cabecera.");
                break;
        }
    } while (opcionElegidaMenu != 7);
};

/* ================================================================================= */

const menuAbogados = () => {
    let contrasenia = prompt("Ingresa la contraseña:");
    let opcionElegidaMenuAbogados;
    if ((abogadosBBS.some((elemento) => elemento.contrasenia == contrasenia)) == true) {
        do {
            opcionElegidaMenuAbogados = parseInt(prompt(`Menú Abogados, selecciona la opción: 
            1) Revisar todos los turnos.
            2) Buscar turnos por rama.
            3) Cancelar un turno.
            4) Ordenar turnos por rama.
            5) Salir`));
            switch(opcionElegidaMenuAbogados) {
                case 1:
                    console.log (turnosSolicitados);
                    alert (`Podrás ver todos los turnos cargados en la consola del navegador.`);
                    break;
                case 2:
                    let rama = validarRamaBis();
                    if ((turnosSolicitados.some((elemento) => elemento.ramaDerecho == rama)) == true) {
                        let listaTurnosRama = turnosSolicitados.filter((elemento) => elemento.ramaDerecho == rama);
                        console.log (listaTurnosRama);
                        alert (`Podrás ver los turnos cargados para esa rama del derecho en la consola del navegador.`);
                    } else {
                        alert (`No registramos ningún turno bajo esa rama del derecho.`);
                    }
                    break;
                case 3:
                    cancelarTurno();
                    break;
                case 4:
                    ordenarTurnos();
                    break;
                case 5:
                    break;
                default:
                    alert("Si ves éste mensaje significa que se rompió el tejido del espacio-tiempo, busca a tu astrofísico de cabecera.");
                    break;
            }
        } while (opcionElegidaMenuAbogados != 5);
    } else {
        alert (`Contraseña incorrecta.`);
    }
};

/* ============================ Funciones para operar los array ============================ */

const asignarAbogado = (ramaDerecho) => {
    let abogadoAsignado;
    switch (ramaDerecho) {
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

/* ================================================================================= */

const cancelarTurno = () => {
    let documento = validarDocumento();
    if ((turnosSolicitados.some((elemento) => elemento.documento == documento)) == true) {
        let turnoEliminar = turnosSolicitados.findIndex(elemento => elemento.documento === documento);
        turnosSolicitados.splice(turnoEliminar, 1);
        alert (`¡Listo, se eliminó el primer turno que fue registrado para el documento N° ${documento}`);
        alert (`Si hay otro turno con el mismo documento aparte del cancelado, realizá otra cancelación.`);
    } else {
        alert (`No registramos ningún turno con dicho número de documento.`);
    }

};

/* ================================================================================= */

const buscarCliente = () => {
    let documento = validarDocumento();
    if ((clientes.some((elemento) => elemento.documento == documento)) == true) {
        let clienteDocumento = clientes.filter((elemento) => elemento.documento == documento);
        alert (`¡Perfecto! Podes ver la información de tu perfil en la consola del navegador.`);
        console.log(clienteDocumento);
    } else {
        alert (`No registramos ningún cliente con dicho número de documento.`);
    }

};

/* ================================================================================= */

const buscarTurnos = () => {
    let documento = validarDocumento();
    if ((turnosSolicitados.some((elemento) => elemento.documento == documento)) == true) {
        let turnosDocumento = turnosSolicitados.filter((elemento) => elemento.documento == documento);
        alert (`¡Perfecto! Podes ver la información de tus turnos en la consola del navegador.`);
        console.log(turnosDocumento);
    } else {
        alert (`No registramos ningún turno con dicho número de documento.`);
    }

};

/* ================================================================================= */

const ordenarTurnos = () => {
    turnosSolicitados.sort((a, b) => {
        if (a.ramaDerecho > b.ramaDerecho) {
            return 1;
        }
        if (a.ramaDerecho < b.ramaDerecho) {
            return -1;
        }
        return 0;
    });
    alert (`Podrás ver los turnos cargados ordenados por rama en la consola del navegador.`);
    console.log (turnosSolicitados);
};

/* ================================================================================= */
/* ============================ Ejecución del simulador ============================ */
/* ================================================================================= */

alert (`¡Bienvenido a B&S Lawyers Group!`);

menuPrincipal();

alert (`¡Gracias por elegirnos! Si deseas usar nuevamente el asistente, refresca la página.`);