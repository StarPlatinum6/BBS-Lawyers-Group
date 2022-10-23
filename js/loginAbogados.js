/* ================== Sentencias para loginAbogados.html ================== */

let botonLoginAb = document.querySelector(".login__main--loginButtonAb")

const datoLoginAb = document.querySelector(".login__main--loginInputAb")

const errorLoginAb = document.querySelector(".login__main--errorLoginAb");

botonLoginAb.addEventListener("click", ()=> {
    if ((abogadosBBS.some((elemento) => elemento.contrasenia == datoLoginAb.value)) == true) {
        for (const abogado of abogadosBBS) {
            if (abogado.contrasenia == datoLoginAb.value) {
                sessionStorage.setItem("ramaSesion", abogado.areaEspecialidad);
                sessionStorage.setItem("nombreAbSesion", abogado.nombre);
            }
        }
        window.location.replace('./cpAbogados.html');
    } else {
        errorLoginAb.classList.remove('invisible');
        errorLoginAb.classList.add('animate__animated');
        errorLoginAb.classList.add('animate__zoomIn');
        setTimeout (() => {
            errorLoginAb.classList.remove('animate__animated');
            errorLoginAb.classList.remove('animate__zoomIn');
            errorLoginAb.classList.add('invisible');
        }, 2000);
        errorLoginAb.style.color = "#ff3860";
        errorLoginAb.innerHTML = `<p>Contraseña incorrecta</p>`;
    }
});

datoLoginAb.addEventListener("keydown", (e)=> {
    if (e.keyCode === 13) {
        if ((abogadosBBS.some((elemento) => elemento.contrasenia == datoLoginAb.value)) == true) {
            for (const abogado of abogadosBBS) {
                if (abogado.contrasenia == datoLoginAb.value) {
                    sessionStorage.setItem("ramaSesion", abogado.areaEspecialidad);
                    sessionStorage.setItem("nombreAbSesion", abogado.nombre);
                }
            }
            window.location.replace('./cpAbogados.html');
            } else {
                errorLoginAb.classList.remove('invisible');
                errorLoginAb.classList.add('animate__animated');
                errorLoginAb.classList.add('animate__zoomIn');
                setTimeout (() => {
                    errorLoginAb.classList.remove('animate__animated');
                    errorLoginAb.classList.remove('animate__zoomIn');
                    errorLoginAb.classList.add('invisible');
                }, 2000);
                errorLoginAb.style.color = "#ff3860";
                errorLoginAb.innerHTML = `<p>Contraseña incorrecta</p>`;
            }
    }
});