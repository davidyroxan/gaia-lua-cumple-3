/*
====================================================
ANIMATIONS.JS
Invitación Gaia Lua
====================================================
*/

document.addEventListener("DOMContentLoaded", iniciarAnimaciones);
function iniciarIntroCuento(){

    const intro = document.getElementById("introCuento");
    const botonOmitir = document.getElementById("introOmitir");

    if(!intro) return;

    /*
    Siempre comenzamos desde arriba
    */
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });

    document.body.classList.add("intro-activa");

    const cerrarIntro = () => {

        if(intro.classList.contains("ocultar-intro")) return;

        intro.classList.add("ocultar-intro");

        document.body.classList.remove("intro-activa");

        setTimeout(() => {

            intro.remove();

document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

requestAnimationFrame(() => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

});
        }, 850);

    };

    botonOmitir?.addEventListener("click", cerrarIntro);

    setTimeout(cerrarIntro, 4600);

}

function iniciarAnimaciones() {

    iniciarIntroCuento();

    animacionHero();

    botonesInteractivos();

    efectoScroll();

    efectoTarjetas();

    imagenFlotante();

    crearParticulas();

    brilloBotones();

    crearDestellos();

    crearMariposas();

}



/*
====================================================
HERO
====================================================
*/

function animacionHero(){

    const hero = document.querySelector(".hero-content");

    if(!hero) return;

    hero.animate(

        [

            {

                opacity:0,

                transform:"translateY(80px)"

            },

            {

                opacity:1,

                transform:"translateY(0px)"

            }

        ],

        {

            duration:1800,

            easing:"ease-out",

            fill:"forwards"

        }

    );

}
/*
====================================================
BOTONES
====================================================
*/

function botonesInteractivos(){

    const botones=document.querySelectorAll(".btn,.btn-confirmar,.btn-whatsapp");

    botones.forEach(boton=>{

        boton.addEventListener("mouseenter",()=>{

            boton.animate([

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(1.05)"

                }

            ],{

                duration:250,

                fill:"forwards"

            });

        });

        boton.addEventListener("mouseleave",()=>{

            boton.animate([

                {

                    transform:"scale(1.05)"

                },

                {

                    transform:"scale(1)"

                }

            ],{

                duration:250,

                fill:"forwards"

            });

        });

    });

}
/*
====================================================
PARALLAX DEL BOSQUE
====================================================
*/

function efectoScroll(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    window.addEventListener("scroll",()=>{

        const y = window.scrollY;

        hero.style.backgroundPosition = `center ${y*0.35}px`;

    });

}
/*
====================================================
FOTO FLOTANTE DE GAIA
====================================================
*/

function imagenFlotante(){

    const imagen = document.querySelector(".gaia");

    if(!imagen) return;

    let tiempo = 0;

    setInterval(()=>{

        tiempo += 0.03;

        const mover = Math.sin(tiempo)*8;

        imagen.style.transform =
        `translateY(${mover}px)`;

    },16);

}
/*
====================================================
ANIMACIÓN DE TARJETAS
====================================================
*/

function efectoTarjetas(){

    const tarjetas=document.querySelectorAll(".card,.confirmacion-card,.tiempo");

    if(!tarjetas.length) return;

    const observador=new IntersectionObserver(

        (entradas)=>{

            entradas.forEach((entrada)=>{

                if(entrada.isIntersecting){

                    entrada.target.classList.add("mostrar");

                }

            });

        },

        {

            threshold:.15

        }

    );

    tarjetas.forEach(tarjeta=>{

        observador.observe(tarjeta);

    });

}
/*
====================================================
PARTÍCULAS DORADAS
====================================================
*/

function crearParticulas(){

    const hero = document.querySelector(".hero");

    if(!hero) return;
    hero.style.overflow = "hidden";

    for(let i=0;i<25;i++){

        const particula=document.createElement("span");

        particula.className="particula";

        particula.style.left=Math.random()*100+"%";

        particula.style.animationDelay=Math.random()*8+"s";

        particula.style.animationDuration=(6+Math.random()*6)+"s";

        particula.style.opacity=Math.random();

        hero.appendChild(particula);

    }

}
/*
====================================================
BRILLO EN BOTONES
====================================================
*/

function brilloBotones(){

    const botones=document.querySelectorAll(

        ".btn,.btn-confirmar,.btn-whatsapp"

    );

    botones.forEach(boton=>{

        setInterval(()=>{

            boton.classList.add("brillo");

            setTimeout(()=>{

                boton.classList.remove("brillo");

            },900);

        },4500);

    });

}
/*
====================================================
DESTELLOS ALREDEDOR DE GAIA
====================================================
*/

function crearDestellos(){

    const hero=document.querySelector(".hero");

    if(!hero) return;

    for(let i=0;i<15;i++){

        const estrella=document.createElement("div");

        estrella.className="estrella";

        estrella.style.left=(20+Math.random()*60)+"%";

        estrella.style.top=(10+Math.random()*70)+"%";

        estrella.style.animationDelay=(Math.random()*5)+"s";

        hero.appendChild(estrella);

    }

}

/*
====================================================
MARIPOSAS
====================================================
*/

function crearMariposas(){

    const hero=document.querySelector(".hero");

    if(!hero) return;

    setInterval(()=>{

        const mariposa=document.createElement("div");

        mariposa.className="mariposa";

        mariposa.innerHTML="🦋";

        mariposa.style.top=(20+Math.random()*60)+"%";

        mariposa.style.left="-50px";

        hero.appendChild(mariposa);

        setTimeout(()=>{

            mariposa.remove();

        },12000);

    },5000);

}/*
====================================================
INTRODUCCIÓN DEL CUENTO
====================================================
*/

function iniciarIntroCuento(){

    const intro = document.getElementById("introCuento");

    const botonOmitir = document.getElementById("introOmitir");

    if(!intro) return;

    const introVista = sessionStorage.getItem("introGaiaVista");

    if(introVista === "si"){

        intro.remove();

        return;

    }

    document.body.classList.add("intro-activa");

    const cerrarIntro = ()=>{

        if(intro.classList.contains("ocultar-intro")) return;

        intro.classList.add("ocultar-intro");

        document.body.classList.remove("intro-activa");

        sessionStorage.setItem("introGaiaVista","si");

        setTimeout(()=>{

            intro.remove();

        },850);

    };

    botonOmitir?.addEventListener("click",cerrarIntro);

    intro.addEventListener("click",(evento)=>{

        if(evento.target === intro){

            cerrarIntro();

        }

    });

    setTimeout(cerrarIntro,4600);

}
/*
====================================================
REINICIAR POSICIÓN DE LA PÁGINA
====================================================
*/

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}

window.addEventListener("beforeunload", () => {

    window.scrollTo(0, 0);

});
/*
====================================================
BOTÓN PARA COMENZAR
====================================================
*/

const btnComenzar = document.getElementById("btnComenzar");

btnComenzar?.addEventListener("click", () => {

    const historia = document.getElementById("historia");

    historia?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

/*
====================================================
INICIAR SIEMPRE DESDE ARRIBA
====================================================
*/

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {

    history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
    );

    window.scrollTo(0, 0);

});