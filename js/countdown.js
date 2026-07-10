/*
====================================================
COUNTDOWN.JS
Invitación Gaia Lua
====================================================
*/

document.addEventListener("DOMContentLoaded", iniciarCuentaRegresiva);

function iniciarCuentaRegresiva() {

    if (typeof CONFIG === "undefined") return;

    const fechaEvento = new Date(CONFIG.fechaEvento).getTime();

    actualizarContador();

    setInterval(actualizarContador,1000);

    function actualizarContador(){

        const ahora = new Date().getTime();

        let diferencia = fechaEvento - ahora;

       if (diferencia <= 0) {

    eventoComenzado();

    return;

}
        const dias = Math.floor(
            diferencia / (1000*60*60*24)
        );

        const horas = Math.floor(

            (diferencia %

            (1000*60*60*24))

            /

            (1000*60*60)

        );

        const minutos = Math.floor(

            (diferencia %

            (1000*60*60))

            /

            (1000*60)

        );

        const segundos = Math.floor(

            (diferencia %

            (1000*60))

            /

            1000

        );

        escribirNumero("dias",dias);

        escribirNumero("horas",horas);

        escribirNumero("minutos",minutos);

        escribirNumero("segundos",segundos);

    }

}
/*
====================================================
FUNCIONES AUXILIARES
====================================================
*/

function escribirNumero(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    const texto = valor.toString().padStart(2, "0");

    if (elemento.textContent !== texto) {

        elemento.classList.remove("cambiar");

        void elemento.offsetWidth;

        elemento.classList.add("cambiar");

        elemento.textContent = texto;

    }

}

/*
====================================================
MENSAJE CUANDO LLEGUE EL EVENTO
====================================================
*/

function eventoComenzado() {

    const titulo = document.querySelector(".countdown h2");

    if (titulo) {

        titulo.innerHTML = "🎉 ¡Hoy es el gran día! 🎉";

    }

    escribirNumero("dias", 0);
    escribirNumero("horas", 0);
    escribirNumero("minutos", 0);
    escribirNumero("segundos", 0);

}