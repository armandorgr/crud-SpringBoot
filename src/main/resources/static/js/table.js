$(document).ready(cargarAlumnos());
async function cargarAlumnos() {
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
        HTML = "<tr><td>" + alumno.id + "</td><td>" + alumno.nombre + "</td><td>" + alumno.nota + "</td></tr>";
        alumnoHTML = alumnoHTML + HTML;
    }
    document.querySelector("#alumnos tbody").outerHTML = alumnoHTML;
}