let actualizar = document.getElementsByClassName("btn-update");
let idAlumno = 0;
let btnActualizar = document.getElementById("actualizar");

function validarContenido(campo1, campo2) {
    return campo1.trim() == "" || campo2 == "";
}

function recogerDatos(id, nombre, nota) {
    let campoNombre = document.getElementById("txtNombreUp");
    let campoNota = document.getElementById("txtNotaUp");
    idAlumno = id;
    campoNombre.value = nombre;
    campoNota.value = nota;
}

$(document).ready(cargarAlumnosCrud());
async function cargarAlumnosCrud() {
    let alumnoHTML = "";
    let HTML;
    const request = await fetch('/listar', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const alumnos = await request.json();
    for (let alumno of alumnos) {
        HTML = "<tr><td>" + alumno.id + "</td><td>" + alumno.nombre + "</td><td>" + alumno.nota + "</td><td><button onclick='eliminar(" + alumno.id + ")'>Eliminar</button><button onclick='recogerDatos(" + alumno.id + ", \"" + alumno.nombre + "\" ," + alumno.nota + ")'>Actualizar</button></td></tr>";
        alumnoHTML = alumnoHTML + HTML;
    }
    document.querySelector("#alumnos tbody").outerHTML = alumnoHTML;
}

async function eliminar(id) {
    const request = await fetch('/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    location.reload();
}

async function update() {
    let datos = {};
    datos.id = idAlumno;
    datos.nombre = document.getElementById("txtNombreUp").value;
    datos.nota = document.getElementById("txtNotaUp").value;

    if (!validarContenido(datos.nombre, datos.nota) & datos.id != 0) {
        const request = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        location.reload();
    } else {
        alert("Los campos estan vacios o no se ha seleccionado un alumno a editar");
    }

}

async function add() {
    let datos = {};
    datos.nombre = document.getElementById("txtAlumno").value;
    datos.nota = document.getElementById("txtNota").value;

    if (!validarContenido(datos.nombre, datos.nota)) {
        const request = await fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        location.reload();
    } else {
        alert("Los campos deben tener contenido");
    }

}

btnActualizar.addEventListener("click", update)