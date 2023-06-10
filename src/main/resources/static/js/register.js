let radios = document.querySelectorAll("input[type='radio']");
let btnRegister = document.querySelector(".btn-register");
let rol = false;
let respuesta;


function validarContenido() {
    let username = document.getElementById("usrName").value;
    let passwd = document.getElementById("passwd").value;
    let rolAux = rol;
    let confirmPasswd = document.getElementById("confirmPasswd").value;
    let resultado = true;

    if (username == "" || passwd == "" || rol === false) {
        resultado = false;
        alert("Todos los campos deben tener contenido");
    } else {
        if (passwd !== confirmPasswd) {
            resultado = false;
            alert("Las contraseñas no coinciden");
        }
    }
    return resultado;
}

async function register() {
    let datos = {};
    datos.username = document.getElementById("usrName").value;
    datos.passwd = document.getElementById("passwd").value;
    datos.rol = rol;


    if (validarContenido()) {
        const request = await fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        respuesta = await request.json();
        if (respuesta) {
            location.replace("/index.html");
        } else {
            alert("El nombre de usuario introducido ya esta registrado.");
        }
    }
}

for (let i = 0; i < 2; i++) {
    radios[i].addEventListener("change", () => {
        rol = radios[i].getAttribute("id") == "adm" ? 1 : 0;
    });
}

btnRegister.addEventListener("click", register)
