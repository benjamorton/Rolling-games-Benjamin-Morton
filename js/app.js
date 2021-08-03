const juegos = JSON.parse(localStorage.getItem('juegosKey')) || [];
const destacado = JSON.parse(localStorage.getItem('juegosDestKey'));
const aventura = juegos.filter(juego => juego.categoriaJuego === 'aventura');
const accion = juegos.filter(juego => juego.categoriaJuego === 'accion');
const deporte = juegos.filter(juego => juego.categoriaJuego === 'deporte');
const estrategia = juegos.filter(juego => juego.categoriaJuego === 'estrategia');
localStorage.removeItem('idJuego')

const obtenerId = (id) => {
  console.log(id)
  localStorage.setItem('idJuego', JSON.stringify(id))
}

if (juegos.length <= 0) {
  let main = document.getElementById('main')
  main.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <img src="../assets/images/server-caido.svg" class="w-50" alt='Dibujo de servidor caido'>
      <h3 class="text-light text-center my-5">Aun no se cargaron juegos en la plataforma</h3>
    </div>
   
    `
}


const renderizarDatos = () => {
  let divAventura = document.getElementById('aventura');
  divAventura.innerHTML += aventura.map(juego => (
    juego.publicado === true ?
      `<div class="juego" id="${juego.codigoJuego}">
        <a onclick="obtenerId(${juego.codigoJuego})" href="/pages/detalle.html"><img src="${juego.imagenesJuego}" class="w-100 h-100" alt=${juego.nombreJuego}></a>
        </div>` : null
  ))

  let divDeporte = document.getElementById('deporte');
  divDeporte.innerHTML += deporte.map(juego => (
    juego.publicado === true ?
      `<div class="juego" id="${juego.codigoJuego}">
        <a onclick="obtenerId(${juego.codigoJuego})" href="/pages/detalle.html"><img src="${juego.imagenesJuego}" class="w-100 h-100" alt=${juego.nombreJuego}></a>
        </div>` : null
  ))

  let divAccion = document.getElementById('accion');
  divAccion.innerHTML += accion.map(juego => (
    juego.publicado === true ?
      `<div class="juego" id="${juego.codigoJuego}">
        <a onclick="obtenerId(${juego.codigoJuego})" href="/pages/detalle.html"><img src="${juego.imagenesJuego}" class="w-100 h-100" alt=${juego.nombreJuego}></a>
        </div>` : null
  ))

  let divEstrategia = document.getElementById('estrategia');
  divEstrategia.innerHTML += estrategia.map(juego => (
    juego.publicado === true ?
      `<div class="juego" id="${juego.codigoJuego}">
        <a onclick="obtenerId(${juego.codigoJuego})" href="/pages/detalle.html"><img src="${juego.imagenesJuego}" class="w-100 h-100" alt=${juego.nombreJuego}></a>
        </div>` : null
  ))

  let divPortada = document.getElementById('portada');
  divPortada.innerHTML = `
    <div class="d-flex flex-lg-row flex-column">
    <img src="${destacado.imagenesJuego}" class="destacada" alt=${destacado.nombreJuego}>
    <div class="p-5 datosDestacada">
      <h1>${destacado.nombreJuego}</h1>
      <h3>${destacado.categoriaJuego}</h3>
      <p>${destacado.descripcionJuego}</p>
      <a onclick="obtenerId(${destacado.codigoJuego})" class="btn btn-purple" href="/pages/detalle.html">Ver más</a>
    </div>
  </div>
   
    `
}
renderizarDatos()