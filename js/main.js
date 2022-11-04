/* ================== Icono hamburguesa animado: ================== */

document.querySelector('.first-button').addEventListener('click', function () {
    document.querySelector('.animated-icon1').classList.toggle('open');
});

/* ================== Inicialización de Variables ================== */

const hoy = new Date();
const meses = [
    {nombre: "Enero", dias: 31},
    {nombre: "Febrero", dias: 28},
    {nombre: "Marzo", dias: 31},
    {nombre: "Abril", dias: 30},
    {nombre: "Mayo", dias: 31},
    {nombre: "Junio", dias: 30},
    {nombre: "Julio", dias: 31},
    {nombre: "Agosto", dias: 31},
    {nombre: "Septiembre", dias: 30},
    {nombre: "Octubre", dias: 31},
    {nombre: "Noviembre", dias: 30},
    {nombre: "Diciembre", dias: 31},
]

const nombreProvincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago Del Estero", "Tierra Del Fuego", "Tucuman"];

const abogadosBBS = [
    {id: 1, nombre: "Jesica Brusco", areaEspecialidad: "Civil", contrasenia: "JesicaBBS2022"},
    {id: 2, nombre: "Natalia Simonetta", areaEspecialidad: "Familia", contrasenia: "NataliaBBS2022"},
    {id: 3, nombre: "Pablo Martinic", areaEspecialidad: "Penal", contrasenia: "PabloBBS2022"},
    {id: 4, nombre: "Lourdes Ledesma", areaEspecialidad: "Laboral", contrasenia: "LourdesBBS2022"},
    {id: 5, nombre: "Maximiliano Mazzaccaro", areaEspecialidad: "Accidentes", contrasenia: "MaxiBBS2022"}
];

const clientes = JSON.parse(localStorage.getItem("baseClientes")) || [];
const turnosSolicitados = JSON.parse(localStorage.getItem("baseTurnos")) || [];

/* ================== Declaracion de Clases ================== */

class Cliente {
    constructor (nombre, apellido, documento, telefono, mail, direccion, genero, provincia, localidad, codigoPostal) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Documento = documento;
        this.Telefono = telefono;
        this.Mail = mail;
        this.Direccion = direccion;
        this.Genero = genero;
        this.Provincia = provincia;
        this.Localidad = localidad;
        this.CPostal = codigoPostal;
    }
}

class Turno {
    constructor (documento, ramaDerecho, abogadoAsignado, anio, mes, dia, hora) {
        this.Documento = documento;
        this.Rama = ramaDerecho;
        this.Abogado = abogadoAsignado;
        this.Año = anio;
        this.Mes = mes;
        this.Dia = dia;
        this.Hora = hora;
    }
}