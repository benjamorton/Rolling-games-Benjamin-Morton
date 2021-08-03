const idJuego = JSON.parse(localStorage.getItem('idJuego')) || ''
const juegos = JSON.parse(localStorage.getItem('juegosKey')) || [];

const juego = juegos.find(juego => juego.codigoJuego == idJuego)

  if(idJuego === ''){
    window.location.replace('/')
  }

const renderizarDatos = () => {
    let main = document.getElementById('main');
    main.innerHTML = `
    <div class='detalle'>
      <p>${juego.categoriaJuego.toUpperCase()}</p>
      <div class="d-md-flex justify-content-around align-items-center">
      <iframe class="frame" src="https://www.youtube.com/embed/${juego.codigoEmbedJuego}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div class="d-flex flex-column align-items-start detalle-wrapper">
          <img src='${juego.imagenesJuego}' class="imgDetalle my-2" alt="Imagen de ${juego.nombreJuego}">
          <h2 class="px-3">${juego.nombreJuego}</h2>
          <p class="px-3 descripcion">${juego.descripcionJuego}</p>
          <a href="/pages/error.html" class="btn-purple btn mx-3">Comprar</a>
        </div>
      </div>
    </div>
    `
}

renderizarDatos()

