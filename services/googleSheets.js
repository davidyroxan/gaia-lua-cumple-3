/*
====================================================
GOOGLESHEETS.JS
Confirmaciones de Gaia Lua
====================================================
*/

const GoogleSheets = {

    URL: "https://script.google.com/macros/s/AKfycbxr9leWhzUs4DrfQx-Y8AccJBi9vwFEWa0h-IVNbd3PyCgBL4N1rhTkBRWlJnj3A-x5AQ/exec",

    async enviar(datos) {

        if (
            !this.URL ||
            !this.URL.endsWith("/exec") ||
            this.URL.includes("PEGA_AQUI")
        ) {
            console.error(
                "La URL de Apps Script no está configurada."
            );

            return false;
        }

        const contenido = new URLSearchParams({
            nombre: datos.nombre,
            adultos: String(datos.adultos),
            ninos: String(datos.ninos),
            misa: datos.misa,
            mensaje: datos.mensaje || ""
        });

        try {
            await fetch(this.URL, {
                method: "POST",
                mode: "no-cors",
                body: contenido
            });

            return true;

        } catch (error) {
            console.error(
                "Error enviando la confirmación:",
                error
            );

            return false;
        }
    },

    async probarConexion() {

        if (
            !this.URL ||
            !this.URL.endsWith("/exec") ||
            this.URL.includes("PEGA_AQUI")
        ) {
            return false;
        }

        try {
            await fetch(this.URL, {
                method: "GET",
                mode: "no-cors"
            });

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }
};