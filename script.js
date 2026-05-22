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

function mostrarEjercicio(){

    const ejercicio = ejercicios[ejercicioActual];

    tituloEjercicio.textContent = ejercicio.nombre;

    descripcionEjercicio.textContent = ejercicio.descripcion;

    imagenEjercicio.src = ejercicio.imagen;

    actualizarProgreso();

    guardarProgreso();
}

function actualizarProgreso(){

    const porcentaje = ((ejercicioActual + 1) / ejercicios.length) * 100;

    progreso.style.width = porcentaje + "%";
}

function cambiarPantalla(pantalla){

    pantallaInicio.classList.remove("activa");
    pantallaEjercicio.classList.remove("activa");
    pantallaFinal.classList.remove("activa");

    pantalla.classList.add("activa");
}

btnIniciar.addEventListener("click", () => {

    cambiarPantalla(pantallaEjercicio);

    mostrarEjercicio();

});

btnSiguiente.addEventListener("click", () => {

    ejercicioActual++;

    if(ejercicioActual < ejercicios.length){

        mostrarEjercicio();

    }else{

        cambiarPantalla(pantallaFinal);

        localStorage.removeItem("progresoEasyfit");
    }
});

btnAudio.addEventListener("click", () => {

    hablarTexto(ejercicios[ejercicioActual].audioTexto);

});

btnReiniciar.addEventListener("click", () => {

    ejercicioActual = 0;

    cambiarPantalla(pantallaInicio);

});

function hablarTexto(texto){

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

function guardarProgreso(){

    localStorage.setItem(
        "progresoEasyfit",
        ejercicioActual
    );
}

function cargarProgreso(){

    const progresoGuardado = localStorage.getItem("progresoEasyfit");

    if(progresoGuardado !== null){

        ejercicioActual = parseInt(progresoGuardado);
    }
}

cargarProgreso();
