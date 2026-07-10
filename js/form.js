/*
====================================================
FORM.JS
Confirmación de asistencia — Gaia Lua
====================================================
*/

document.addEventListener("DOMContentLoaded", iniciarFormulario);

function iniciarFormulario() {

    const formulario = document.getElementById("formInvitados");

    if (!formulario) return;

    iniciarContadores();

    formulario.addEventListener("submit", enviarFormulario);

}

/*
====================================================
CONTADORES DE ADULTOS Y NIÑOS
====================================================
*/

function iniciarContadores() {

    document.querySelectorAll(".mas").forEach((boton) => {

        boton.addEventListener("click", () => {

            const input = document.getElementById(
                boton.dataset.target
            );

            if (!input) return;

            input.value = Number(input.value) + 1;

        });

    });

    document.querySelectorAll(".menos").forEach((boton) => {

        boton.addEventListener("click", () => {

            const input = document.getElementById(
                boton.dataset.target
            );

            if (!input) return;

            const minimo =
                boton.dataset.target === "adultos" ? 1 : 0;

            input.value = Math.max(
                minimo,
                Number(input.value) - 1
            );

        });

    });

}

/*
====================================================
ENVIAR FORMULARIO
====================================================
*/

async function enviarFormulario(evento) {

    evento.preventDefault();

    const formulario = evento.currentTarget;

    const boton = formulario.querySelector(".btn-confirmar");

    const datos = obtenerDatosFormulario();

    if (!validarDatos(datos)) return;

    boton.disabled = true;
    boton.textContent = "Guardando confirmación...";

    const guardado = await guardarAsistencia(datos);

    if (!guardado) {

        alert(
            "No fue posible guardar la confirmación. " +
            "Por favor inténtalo nuevamente."
        );

        boton.disabled = false;
        boton.textContent = "✨ Confirmar asistencia ✨";

        return;

    }

    mostrarConfirmacion(datos.nombre);

    formulario.reset();

    document.getElementById("adultos").value = 1;
    document.getElementById("ninos").value = 0;

    boton.disabled = false;
    boton.textContent = "✨ Confirmar asistencia ✨";

}

/*
====================================================
RECOPILAR DATOS
====================================================
*/

function obtenerDatosFormulario() {

    const opcionMisa = document.querySelector(
        'input[name="misa"]:checked'
    );

    const adultos = Number(
        document.getElementById("adultos").value
    );

    const ninos = Number(
        document.getElementById("ninos").value
    );

    return {

        fechaRegistro: new Date().toLocaleString("es-MX"),

        nombre: document
            .getElementById("nombre")
            .value
            .trim(),

        adultos: adultos,

        ninos: ninos,

        totalAsistentes: adultos + ninos,

        misa: opcionMisa ? opcionMisa.value : "Sin respuesta",

        mensaje: document
            .getElementById("mensaje")
            .value
            .trim()

    };

}

/*
====================================================
VALIDACIÓN
====================================================
*/

function validarDatos(datos) {

    if (datos.nombre.length < 3) {

        alert("Por favor escribe el nombre del invitado.");

        document.getElementById("nombre").focus();

        return false;

    }

    if (datos.adultos < 1) {

        alert("Debe registrarse al menos un adulto.");

        return false;

    }

    return true;

}

/*
====================================================
GUARDAR EN GOOGLE SHEETS
====================================================
*/

async function guardarAsistencia(datos) {

    if (typeof GoogleSheets === "undefined") {

        console.log(
            "Google Sheets aún no está configurado.",
            datos
        );

        return true;

    }

    return await GoogleSheets.enviar(datos);

}

/*
====================================================
MENSAJE FINAL
====================================================
*/

function mostrarConfirmacion(nombre) {

    const adultos = Number(
        document.getElementById("adultos").value
    );

    const ninos = Number(
        document.getElementById("ninos").value
    );

    const total = adultos + ninos;

    alert(

`✨ ¡Muchas gracias ${nombre}! ✨

Tu asistencia quedó registrada correctamente.

👨 Adultos: ${adultos}
🧒 Niños: ${ninos}

🎉 Total de asistentes: ${total}

Nos vemos el 8 de agosto para celebrar el cumpleaños de Gaia Lua 💛`

    );

}