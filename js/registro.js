/* ================== Sentencias para registro.html ================== */

const formulario = document.querySelector(".registro__main--formulario");

const nombre = document.getElementById("registro__nombre");
const apellido = document.getElementById("registro__apellido");
const documento = document.getElementById("registro__dni");
const telefono = document.getElementById("registro__telefono");
const mail = document.getElementById("registro__mail");
const direccion = document.getElementById("registro__direccion");
const genero = document.getElementById("registro__genero");
const provincia = document.getElementById("registro__provincia");
const localidad = document.getElementById("registro__localidad");
const codigoPostal = document.getElementById("registro__codPostal");

const resultado = document.querySelector(".registro__main--resultado");
resultado.style.textAlign = "center";

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarIngresos();
    localStorage.setItem("baseClientes", JSON.stringify(clientes));
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

const esMailValido = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validarIngresos = () => {

    let val1 = false;
    let val2 = false;
    let val3 = false;
    let val4 = false;
    let val5 = false;
    let val6 = false;
    let val7 = false;
    let val8 = false;
    let val9 = false;
    let val10 = false;

    let nombreValor = nombre.value.trim();
    let apellidoValor = apellido.value.trim();
    let documentoValor = documento.value.trim();
    let telefonoValor = parseInt(telefono.value.trim());
    let mailValor = mail.value.trim();
    let direccionValor = direccion.value.trim();
    let generoValor = genero.value.trim();
    let provinciaValor = provincia.value.trim();
    if (provinciaValor != '') {
        provinciaValor = provinciaValor.split(" ");

        for (let i = 0; i < provinciaValor.length; i++) {
            provinciaValor[i] = provinciaValor[i][0].toUpperCase() + provinciaValor[i].substr(1);
        }
    
        provinciaValor = provinciaValor.join(" ");
    }
    let localidadValor = localidad.value.trim();
    let codigoPostalValor = codigoPostal.value.trim();

/* ================== Validacion ================== */

    if (nombreValor === '') {
        estadoIncorrecto(nombre, 'El nombre es obligatorio');
        val1 = false;
    } else if (nombreValor.split(" ").length > 1) {
        estadoIncorrecto(nombre, 'El nombre ingresado no es correcto')
        val1 = false;
    } else {
        nombreValor = nombreValor.charAt(0).toUpperCase() + nombreValor.slice(1).toLowerCase();
        estadoCorrecto(nombre);
        val1 = true;
    }

    if (apellidoValor === '') {
        estadoIncorrecto(apellido, 'El apellido es obligatorio');
        val2 = false;
    } else if (apellidoValor.split(" ").length > 1) {
        estadoIncorrecto(apellido, 'El apellido ingresado no es correcto')
        val2 = false;
    } else {
        apellidoValor = apellidoValor.charAt(0).toUpperCase() + apellidoValor.slice(1).toLowerCase();
        estadoCorrecto(apellido);
        val2 = true;
    }

    if(documentoValor === '') {
        estadoIncorrecto(documento, 'El documento es obligatorio');
        val3 = false;
    } else if (documentoValor < 0) {
        estadoIncorrecto(documento, 'El documento debe ser un número mayor que cero, sin puntos');
        val3 = false;
    } else {
        estadoCorrecto(documento);
        val3 = true;
    }

    if(telefonoValor === '') {
        estadoIncorrecto(telefono, 'El teléfono es obligatorio');
        val4 = false;
    } else if ((((telefonoValor < 1100000000) || (telefonoValor >= 1200000000)) && ((telefonoValor < 1500000000) || (telefonoValor >= 1600000000))) || (isNaN(telefonoValor))) {
        estadoIncorrecto(telefono, 'Sólo celulares de Buenos Aires, sin guiones, espacios ni 0 al principio');
        val4 = false;
    } else {
        estadoCorrecto(telefono);
        val4 = true;
    }

    if(mailValor === '') {
        estadoIncorrecto(mail, 'El mail es obligatorio');
        val5 = false;
    } else if (!esMailValido(mailValor)) {
        estadoIncorrecto(mail, 'El mail ingresado no es correcto');
        val5 = false;
    } else {
        estadoCorrecto(mail);
        val5 = true;
    }

    if(direccionValor === '') {
        estadoIncorrecto(direccion, 'La dirección ingresada no es correcta');
        val6 = false;
    } else {
        direccionValor = direccionValor.split(" ");

        for (let i = 0; i < direccionValor.length; i++) {
            direccionValor[i] = direccionValor[i][0].toUpperCase() + direccionValor[i].substr(1);
        }
        direccionValor = direccionValor.join(" ");
        estadoCorrecto(direccion);
        val6 = true;
    }

    if(generoValor === '') {
        estadoIncorrecto(genero, 'El genero es obligatorio');
        val7 = false;
    } else if (((generoValor.charAt(0).toUpperCase() + generoValor.slice(1).toLowerCase()) != "Masculino") && ((generoValor.charAt(0).toUpperCase() + generoValor.slice(1).toLowerCase()) != "Femenino")) {
        estadoIncorrecto(genero, 'Ingrese Femenino o Masculino');
        val7 = false;
    } else {
        generoValor = generoValor.charAt(0).toUpperCase() + generoValor.slice(1).toLowerCase();
        estadoCorrecto(genero);
        val7 = true;
    }

    if(provinciaValor === '') {
        estadoIncorrecto(provincia, 'La provincia es obligatoria');
        val8 = false;
    } else if (nombreProvincias.some((elemento) => elemento == provinciaValor) == false) {
        estadoIncorrecto(provincia, 'La provincia ingresada no es correcta');
        val8 = false;
    } else {
        estadoCorrecto(provincia);
        val8 = true;
    }

    if(localidadValor === '') {
        estadoIncorrecto(localidad, 'La localidad ingresada no es correcta');
        val9 = false;
    } else {
        localidadValor = localidadValor.split(" ");

        for (let i = 0; i < localidadValor.length; i++) {
            localidadValor[i] = localidadValor[i][0].toUpperCase() + localidadValor[i].substr(1);
        }
        localidadValor = localidadValor.join(" ");
        estadoCorrecto(localidad);
        val9 = true;
    }

    if(codigoPostalValor === '') {
        estadoIncorrecto(codigoPostal, 'El código postal es obligatorio');
        val10 = false;
    } else if (codigoPostalValor < 0) {
        estadoIncorrecto(codigoPostal, 'El código debe ser un número mayor que cero, sin puntos');
        val10 = false;
    } else {
        estadoCorrecto(codigoPostal);
        val10 = true;
    }

    if ((val1 == true) && (val2 == true) && (val3 == true) && (val4 == true) && (val5 == true) && (val6 == true) && (val7 == true) && (val8 == true) && (val9 == true) && (val10 == true)) {
        let nuevoCliente = new Cliente (nombreValor, apellidoValor, documentoValor, telefonoValor, mailValor, direccionValor, generoValor, provinciaValor, localidadValor, codigoPostalValor);
        clientes.push(nuevoCliente);
    
        resultado.classList.remove('invisible');
        resultado.style.color = "#0ab96d";
        resultado.innerHTML = `<h5>¡El registro se realizó con éxito!</h5>`;
        setTimeout (() => {
            resultado.classList.add('invisible');
        }, 4000);
    } else {
        resultado.classList.remove('invisible');
        resultado.style.color = "#ff3860";
        resultado.innerHTML = `<h5>Mientras haya datos incorrectos, no se podrá llevar a cabo el registro.</h5>`;
        setTimeout (() => {
            resultado.classList.add('invisible');
        }, 4000);
    }
};