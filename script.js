const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaEjercicio = document.getElementById("pantalla-ejercicio");
const pantallaFinal = document.getElementById("pantalla-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnAudio = document.getElementById("btn-audio");
const btnReiniciar = document.getElementById("btn-reiniciar");

const tituloEjercicio = document.getElementById("titulo-ejercicio");
const descripcionEjercicio = document.getElementById("descripcion-ejercicio");
const imagenEjercicio = document.getElementById("imagen-ejercicio");

const progreso = document.getElementById("progreso");

let ejercicioActual = 0;

const mensajes = [
    "¡Excelente trabajo!",
    "¡Vas muy bien!",
    "Sigue así, lo estás haciendo genial",
    "Recuerda respirar lentamente",
    "Muy bien, continúa con calma"
];

function cambiarPantalla(pantalla){

    pantallaInicio.classList.remove("activa");
    pantallaEjercicio.classList.remove("activa");
    pantallaFinal.classList.remove("activa");

    pantalla.classList.add("activa");
}

function actualizarProgreso(){

    const porcentaje =
        ((ejercicioActual + 1) / ejercicios.length) * 100;

    progreso.style.width = porcentaje + "%";
}

function hablarTexto(texto){

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.9;

    speechSynthesis.speak(voz);
}

function mostrarMensajeMotivacional(){

    const mensajeAnterior =
        document.querySelector(".mensaje");

    if(mensajeAnterior){

        mensajeAnterior.remove();
    }

    const indice =
        Math.floor(Math.random() * mensajes.length);

    const divMensaje =
        document.createElement("div");

    divMensaje.classList.add("mensaje");

    divMensaje.textContent = mensajes[indice];

    pantallaEjercicio.appendChild(divMensaje);
}

function iniciarTemporizador(){

    let tiempo = 15;

    let temporizadorExistente =
        document.getElementById("temporizador");

    if(!temporizadorExistente){

        temporizadorExistente =
            document.createElement("p");

        temporizadorExistente.id = "temporizador";

        pantallaEjercicio.appendChild(temporizadorExistente);
    }

    temporizadorExistente.textContent =
        `Tiempo de descanso: ${tiempo} segundos`;

    const intervalo = setInterval(() => {

        tiempo--;

        temporizadorExistente.textContent =
            `Tiempo de descanso: ${tiempo} segundos`;

        if(tiempo <= 0){

            clearInterval(intervalo);

            temporizadorExistente.textContent =
                "¡Continuemos!";
        }

    },1000);
}

function guardarProgreso(){

    localStorage.setItem(
        "progresoEasyfit",
        ejercicioActual
    );
}

function cargarProgreso(){

    const progresoGuardado =
        localStorage.getItem("progresoEasyfit");

    if(progresoGuardado !== null){

        ejercicioActual = parseInt(progresoGuardado);
    }
}

function mostrarEjercicio(){

    const ejercicio =
        ejercicios[ejercicioActual];

    tituloEjercicio.textContent =
        ejercicio.nombre;

    descripcionEjercicio.textContent =
        ejercicio.descripcion;

    imagenEjercicio.src =
        ejercicio.imagen;

    actualizarProgreso();

    guardarProgreso();

    mostrarMensajeMotivacional();

    iniciarTemporizador();

    hablarTexto(
        ejercicio.audioTexto
    );
}

btnIniciar.addEventListener("click", () => {

    cambiarPantalla(
        pantallaEjercicio
    );

    mostrarEjercicio();
});

btnSiguiente.addEventListener("click", () => {

    ejercicioActual++;

    if(ejercicioActual < ejercicios.length){

        mostrarEjercicio();

    }else{

        cambiarPantalla(
            pantallaFinal
        );

        speechSynthesis.cancel();

        localStorage.removeItem(
            "progresoEasyfit"
        );
    }
});

btnAudio.addEventListener("click", () => {

    hablarTexto(
        ejercicios[ejercicioActual].audioTexto
    );
});

btnReiniciar.addEventListener("click", () => {

    ejercicioActual = 0;

    cambiarPantalla(
        pantallaInicio
    );
});

cargarProgreso();

