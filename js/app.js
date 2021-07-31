const juegos = JSON.parse(localStorage.getItem('juegosKey')) || [];
const destacado = JSON.parse(localStorage.getItem('juegosDestKey'));
const aventura = juegos.filter(juego => juego.categoriaJuego === 'aventura');
const accion = juegos.filter(juego => juego.categoriaJuego === 'accion');
const deporte = juegos.filter(juego => juego.categoriaJuego === 'deporte');
const estrategia = juegos.filter(juego => juego.categoriaJuego === 'estrategia');



const renderizarDatos = () => {
    let divAventura = document.getElementById('aventura');
    divAventura.innerHTML += aventura.map(juego => (
        `<div class="juego" id="${juego.codigoJuego}">
        <a href="#"><img src="${juego.imagenesJuego}" class="w-100" alt=${juego.nombreJuego}></a>
        </div>`
    ))

    let divDeporte = document.getElementById('deporte');
    divDeporte.innerHTML = deporte.map(juego => (
        `<div class="juego" id="${juego.codigoJuego}">
        <a href="#"><img src="${juego.imagenesJuego}" class="w-100" alt=${juego.nombreJuego}></a>
        </div>`
    ))

    let divAccion = document.getElementById('accion');
    divAccion.innerHTML = accion.map(juego => (
        `<div class="juego" id="${juego.codigoJuego}">
        <a href="#"><img src="${juego.imagenesJuego}" class="w-100" alt=${juego.nombreJuego}></a>
        </div>`
    ))

    let divEstrategia = document.getElementById('estrategia');
    divEstrategia.innerHTML = estrategia.map(juego => (
        `<div class="juego" id="${juego.codigoJuego}">
        <a href="#"><img src="${juego.imagenesJuego}" class="w-100" alt=${juego.nombreJuego}></a>
        </div>`
    ))

    let divPortada = document.getElementById('portada');
    divPortada.innerHTML = `
    <div class="d-flex flex-md-row flex-column">
    <img src="${destacado.imagenesJuego}" class="destacada" alt=${destacado.nombreJuego}>
    <div class="p-5">
      <h1>${destacado.nombreJuego}</h1>
      <h3>${destacado.categoriaJuego}</h3>
      <p>${destacado.descripcionJuego}</p>
    </div>
  </div>
   
    `
}
renderizarDatos()