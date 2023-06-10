let btnLogin = document.querySelector(".btn-login");


function validarContenido(username, passwd) {
    return username == "" || passwd == "";
}

async function login() {
    let respuesta;
    let username = document.getElementById("usrName").value;
    let passwd = document.getElementById("passwd").value;

    if (!validarContenido(username, passwd)) {
        const request = await fetch(`/login/${username}/${passwd}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        respuesta = await request.json();
        switch (respuesta) {
            case 1:
                location.replace("/crud.html");
                break;
            case 0:
                location.replace("/list.html");
                break;
            default:
                alert("Los datos introducidos no son correctos");
                break;
        }
    } else {
        alert("Todos los campos deben tener contenido");
    }
}

btnLogin.addEventListener("click", login);