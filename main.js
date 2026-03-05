// importan las preguntas y respuestas
import { preguntasYRespuestas } from "./preguntas-y-respuestas.js";

// variables
let preguntasSeleccionadas = [];
let puntaje = 0;

// seleccionar los elementos del DOM
const contenedorPregunta = document.querySelector('#contenedor-pregunta');
const contenedorOpciones = document.querySelector('#contenedor-opciones');
const contenedorResultado = document.querySelector('#contenedor-resultado');

//punto de entrada del programa
mostrarTemas()

function mostrarTemas(){
    contenedorResultado.innerHTML = '';
    contenedorPregunta.innerHTML = '<center><h2 class="pregunta">Selecciona el tema</h2></center>'

    Object.keys(preguntasYRespuestas).forEach((opcion)=>{
       contenedorOpciones.innerHTML += `<p class="opcion">${opcion.toUpperCase()}</p>`
    })
   
    const opciones = contenedorOpciones.querySelectorAll('.opcion');

    opciones.forEach((opcion)=>{
      opcion.addEventListener('click', ()=>{
      const tema = opcion.innerHTML.toLowerCase()
      seleccionarTema(tema)
    })
})
}

// mostrar la primera pregunta dependiendo del tema que se ha seleccionado
function seleccionarTema(tema){
    preguntasSeleccionadas = preguntasYRespuestas[tema];
    mostrarPregunta(0)
}

function mostrarPregunta(indice){
    if(indice >= preguntasSeleccionadas.length){
        mostrarResultado()
        return;
    }

    const {pregunta, respuestaCorrecta, respuestas} = preguntasSeleccionadas[indice]
    contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;
    mostrarOpciones(respuestas, respuestaCorrecta, indice);
}

function mostrarOpciones(respuestas, respuestaCorrecta, indice){
    contenedorOpciones.innerHTML = '';
    respuestas.forEach((respuesta)=>{
        contenedorOpciones.innerHTML += `<p class="opcion">${respuesta}</p>`;
    })
    
    const opciones = contenedorOpciones.querySelectorAll('.opcion');
    opciones.forEach((opcion)=>{
        opcion.addEventListener('click', ()=>{
            // comparar lo que el usuario hizo clic con la respuesta correcta
            if(opcion.textContent === respuestaCorrecta){
                puntaje++;
                opcion.classList.add('CORRECTA');
            }else{
                opcion.classList.add('INCORRECTA');
            }

            setTimeout(()=>{
                mostrarPregunta(indice + 1);
            }, 500)
        })
    })
}

function mostrarResultado(){
    contenedorPregunta.innerHTML = '';
    contenedorOpciones.innerHTML = '';
    contenedorResultado.innerHTML = `<h2 class="total">Has acertado ${puntaje}
    de ${preguntasSeleccionadas.length} preguntas</h2>
    <div class="contenedor-boton">
     <botton id="reiniciarBtn">Reiniciar</botton>
    </div>
    `

    const butonReiniciar = contenedorResultado.querySelector('#reiniciarBtn');
    butonReiniciar.addEventListener('click', ()=>{
        puntaje=0;
        mostrarTemas()
    })
}