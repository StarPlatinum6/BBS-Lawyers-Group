const formularioContacto = document.querySelector("#formularioContacto");

const formularioNombre = document.getElementById("formularioContacto__nombre");
const formularioApellido = document.getElementById("formularioContacto__apellido");
const formularioMail = document.getElementById("formularioContacto__mail");
const formularioTelefono = document.getElementById("formularioContacto__telefono");
const formularioGenero = document.getElementsByName('sexo');
const formularioNoticias = document.getElementById("formularioContacto__noticias");
const formularioConsulta = document.getElementById("formularioContacto__consulta");

const enviarForm = () => {

    let nombreForm = formularioNombre.value.trim();
    let apellidoForm = formularioApellido.value.trim();
    let mailForm = formularioMail.value.trim();
    let telefonoForm = formularioTelefono.value.trim();

    let generoForm;
    for(i = 0; i < formularioGenero.length; i++) {
        if(formularioGenero[i].checked)
        generoForm = formularioGenero[i].value;
    }

    let noticiasForm = formularioNoticias.value.trim();
    if (noticiasForm == 'yes') {
        noticiasForm = 'Si'
    } else {
        noticiasForm = 'No'
    }

    let consultaForm = formularioConsulta.value.trim();

    datosForm = `
    <br><br><ul style="text-align: left;">
        <li>Nombre: ${nombreForm}</li>
        <li>Apellido: ${apellidoForm}</li>
        <li>E-Mail: ${mailForm}</li>
        <li>Teléfono: ${telefonoForm}</li>
        <li>Género: ${generoForm}</li>
        <li>Desea recibir noticias: ${noticiasForm}</li>
        <li>Consulta: ${consultaForm}</li>
    </ul>
    `

    Swal.fire({
        title: '¡Recibido!',
        icon: 'success',
        html: 'En unos segundos se abrirá tu correo. Copia estos datos en el cuerpo del mensaje.' + datosForm,
        focusConfirm: false,
        confirmButtonText: '¡Entendido!',
        timer: 10000,
        showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
        }
    })
}

formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarForm();
    setTimeout (() => {
        window.open('mailto:bbslawyersgroup@gmail.com?subject=Consulta Legal&body=Mis datos y consulta a continuación:');
    }, 12000);
});