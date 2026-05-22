const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaEjercicio = document.getElementById("pantalla-ejercicio");
const pantallaFinal = document.getElementById("pantalla-final");
const pantallaAjustes = document.getElementById("pantalla-ajustes");
const pantallaEstadisticas = document.getElementById("pantalla-estadisticas");

const btnIniciar = document.getElementById("btn-iniciar");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnAudio = document.getElementById("btn-audio");
const btnReiniciar = document.getElementById("btn-reiniciar");

const btnAjustes = document.getElementById("btn-ajustes");
const btnVolver = document.getElementById("btn-volver");

const btnEstadisticas = document.getElementById("btn-estadisticas");
const btnVolverEstadisticas = document.getElementById("btn-volver-estadisticas");

const btnAumentar = document.getElementById("btn-aumentar");
const btnDisminuir = document.getElementById("btn-disminuir");
const btnVoz = document.getElementById("btn-voz");
const btnContraste = document.getElementById("btn-contraste");

const tituloEjercicio = document.getElementById("titulo-ejercicio");
const descripcionEjercicio = document.getElementById("descripcion-ejercicio");
const imagenEjercicio = document.getElementById("imagen-ejercicio");

const progreso = document.getElementById("progreso");

const estadisticaRutinas =
    document.getElementById("estadistica-rutinas");

const estadisticaProgreso =
    document.getElementById("estadistica-progreso");

let ejercicioActual = 0;
let vozActiva =
    localStorage.getItem("vozActiva") !== "false";

let tamanioFuente = 22;
let intervaloTemporizador;

let rutinasCompletadas =
    parseInt(localStorage.getItem("rutinasCompletadas")) || 0;

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
    pantallaAjustes.classList.remove("activa");
    pantallaEstadisticas.classList.remove("activa");

    pantalla.classList.add("activa");
}

function actualizarProgreso(){

    const porcentaje =
        ((ejercicioActual + 1) / ejercicios.length) * 100;

    progreso.style.width =
        porcentaje + "%";
}

function hablarTexto(texto){

    if(!vozActiva) return;

    speechSynthesis.cancel();

    const voz =
        new SpeechSynthesisUtterance(texto);

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

    divMensaje.textContent =
        mensajes[indice];

    pantallaEjercicio.appendChild(divMensaje);
}

function iniciarTemporizador(){

    clearInterval(intervaloTemporizador);

    let tiempo = 15;

    let temporizadorExistente =
        document.getElementById("temporizador");

    if(!temporizadorExistente){

        temporizadorExistente =
            document.createElement("p");

        temporizadorExistente.id =
            "temporizador";

        pantallaEjercicio.appendChild(
            temporizadorExistente
        );
    }

    temporizadorExistente.textContent =
        `Tiempo de descanso: ${tiempo} segundos`;

    intervaloTemporizador =
        setInterval(() => {

        tiempo--;

        temporizadorExistente.textContent =
            `Tiempo de descanso: ${tiempo} segundos`;

        if(tiempo <= 0){

            clearInterval(intervaloTemporizador);

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

        ejercicioActual =
            parseInt(progresoGuardado);

        cambiarPantalla(
            pantallaEjercicio
        );

        mostrarEjercicio();
    }
}

function actualizarEstadisticas(){

    estadisticaRutinas.textContent =
        rutinasCompletadas;

    const porcentaje =
        Math.round(
            ((ejercicioActual + 1)
            / ejercicios.length) * 100
        );

    estadisticaProgreso.textContent =
        porcentaje + "%";
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

        rutinasCompletadas++;

        localStorage.setItem(
            "rutinasCompletadas",
            rutinasCompletadas
        );

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

btnAjustes.addEventListener("click", () => {

    cambiarPantalla(
        pantallaAjustes
    );
});

btnVolver.addEventListener("click", () => {

    cambiarPantalla(
        pantallaInicio
    );
});

btnEstadisticas.addEventListener("click", () => {

    actualizarEstadisticas();

    cambiarPantalla(
        pantallaEstadisticas
    );
});

btnVolverEstadisticas.addEventListener("click", () => {

    cambiarPantalla(
        pantallaInicio
    );
});

btnAumentar.addEventListener("click", () => {

    tamanioFuente += 2;

    document.body.style.fontSize =
        tamanioFuente + "px";
});

btnDisminuir.addEventListener("click", () => {

    if(tamanioFuente > 16){

        tamanioFuente -= 2;

        document.body.style.fontSize =
            tamanioFuente + "px";
    }
});

btnVoz.addEventListener("click", () => {

    vozActiva = !vozActiva;

    localStorage.setItem(
        "vozActiva",
        vozActiva
    );

    btnVoz.textContent = vozActiva
        ? "Desactivar voz"
        : "Activar voz";
});

btnContraste.addEventListener("click", () => {

    document.body.classList.toggle(
        "alto-contraste"
    );

    const contrasteActivo =
        document.body.classList.contains(
            "alto-contraste"
        );

    localStorage.setItem(
        "altoContraste",
        contrasteActivo
    );
});

const contrasteGuardado =
    localStorage.getItem("altoContraste");

if(contrasteGuardado === "true"){

    document.body.classList.add(
        "alto-contraste"
    );
}

btnVoz.textContent = vozActiva
    ? "Desactivar voz"
    : "Activar voz";

cargarProgreso();