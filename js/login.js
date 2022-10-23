/* ============================ Sentencias para login.html============================ */

let botonLogin = document.querySelector(".login__main--loginButton")

const datoLogin = document.querySelector(".login__main--loginInput")

const errorLogin = document.querySelector(".login__main--errorLogin");

const baseClientes = JSON.parse(localStorage.getItem("baseClientes"));

botonLogin.addEventListener("click", ()=> {
    if ((baseClientes.some((elemento) => elemento.Documento == datoLogin.value)) == true) {
        for (const cliente of baseClientes) {
            if (cliente.Documento == datoLogin.value) {
                sessionStorage.setItem("nombreSesion", cliente.Nombre);
                sessionStorage.setItem("apellidoSesion", cliente.Apellido);
            }
        }
        sessionStorage.setItem("documentoSesion", datoLogin.value);
        window.location.replace('./cp.html');
    } else {
        errorLogin.classList.remove('invisible');
        errorLogin.classList.add('animate__animated');
        errorLogin.classList.add('animate__zoomIn');
        setTimeout (() => {
            errorLogin.classList.remove('animate__animated');
            errorLogin.classList.remove('animate__zoomIn');
            errorLogin.classList.add('invisible');
        }, 3000);
        errorLogin.style.color = "#ff3860";
        errorLogin.innerHTML = `<p>No verificamos ningún cliente con dicho número de documento, debes registrarte primero.</p>`;
    }
})

datoLogin.addEventListener("keydown", (e)=> {
    if (e.keyCode == 13) {
        if ((baseClientes.some((elemento) => elemento.Documento == datoLogin.value)) == true) {
            for (const cliente of baseClientes) {
                if (cliente.Documento == datoLogin.value) {
                    sessionStorage.setItem("nombreSesion", cliente.Nombre);
                    sessionStorage.setItem("apellidoSesion", cliente.Apellido);
                }
            }
            sessionStorage.setItem("documentoSesion", datoLogin.value);
            window.location.replace('./cp.html');
        } else {
            errorLogin.classList.remove('invisible');
            errorLogin.classList.add('animate__animated');
            errorLogin.classList.add('animate__zoomIn');
            setTimeout (() => {
                errorLogin.classList.remove('animate__animated');
                errorLogin.classList.remove('animate__zoomIn');
                errorLogin.classList.add('invisible');
            }, 3000);
            errorLogin.style.color = "#ff3860";
            errorLogin.innerHTML = `<p>No verificamos ningún cliente con dicho número de documento, debes registrarte primero.</p>`;
        }
    }
})