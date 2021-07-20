let juegos= JSON.parse(localStorage.getItem('juegosKey')) || []

class Juego{
    constructor(codigoJuego, nombreJuego, categoriaJuego, descripcionJuego, imagenesJuego,codigoEmbedJuego){
        this.codigoJuego=codigoJuego,
        this.nombreJuego=nombreJuego,
        this.categoriaJuego=categoriaJuego,
        this.descripcionJuego=descripcionJuego,
        this.imagenesJuego=imagenesJuego,
        this.codigoEmbedPelicul=codigoEmbedJuego
    }
}

renderizarDatos()

function agregarJuegos(event){
    event.preventDefault()
    let codigoJuego= document.getElementById('codigoJuego').value
    let nombreJuego= document.getElementById('nombreJuego').value
    let categoriaJuego= document.getElementById('categoriaJuego').value
    let descripcionJuego= document.getElementById('descripcionJuego').value
    let imagenesJuego= document.getElementById('imagenesJuego').value
    let codigoEmbedJuego= document.getElementById('codigoEmbedJuego').value

    let juego= new Juego(codigoJuego, nombreJuego, categoriaJuego, descripcionJuego, imagenesJuego, codigoEmbedJuego)

    juegos.push(juego)
    localStorage.setItem('juegosKey', JSON.stringify(juegos))
    renderizarDatos()
}


function renderizarDatos (){
    let tablaBody = document.getElementById ('bodyt');
    tablaBody.innerHTML = '';
    let codigoHtml = '';
    for(let juego of juegos){
        codigoHtml = `    
        <tr>
        <th scope="row">${juego.codigoJuego}</th>
        <td>${juego.nombreJuego}</td>
        <td>${juego.categoriaJuego}</td>
        <td>${juego.descripcionJuego}</td>
        <td><input type='checkbox'/></td>
        <td>
        <a onclick="editJuego(this)" id="${juego.codigoJuego}"><i class="far fa-edit"></i></a></a>
        <a onclick="elimJuego(this)" id="${juego.codigoJuego}"><i class="fas fa-trash-alt"></i></a></a>
        <a onclick="destJuego(this)" id="${juego.codigoJuego}"><i class="far fa-star"></i></a></a>
        </td>
      </tr>`;
      tablaBody.innerHTML += codigoHtml;
    }

}