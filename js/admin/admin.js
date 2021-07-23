let juegos= JSON.parse(localStorage.getItem('juegosKey')) || [];

// Pedimos los datos del usuario logueado
const usuarioLogueado=JSON.parse(localStorage.getItem('usuarioLogueado'))

// Si no hay un usuario logueado, redirigir al home
if(usuarioLogueado){
    // Si existe un usuario logueado, preguntar si es el administrador, de lo contrario redirigir al home
    {usuarioLogueado.nombre === 'Admin' ? '' : window.location.replace('/')}
}else{
    window.location.replace('/')
}
// Agregar funcionalidad para abrir el modal
var modalJuego = new bootstrap.Modal(document.getElementById('modal-agregar'))
let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', ()=>{
  limpiarFormulario();  
  modalJuego.show();
})

class Juego{
    constructor(codigoJuego, nombreJuego, categoriaJuego, descripcionJuego, imagenesJuego, codigoEmbedJuego){
        this.codigoJuego=codigoJuego,
        this.nombreJuego=nombreJuego,
        this.categoriaJuego=categoriaJuego,
        this.descripcionJuego=descripcionJuego,
        this.imagenesJuego=imagenesJuego,
        this.codigoEmbedJuego=codigoEmbedJuego,
        this.destacada= false,
        this.publicado= true
    }
}
let existeJuego= false


// funcion para agregar Juegos
window.agregarJuegos = () => {
    let codigoJuego= document.getElementById('codigoJuego').value
    let nombreJuego= document.getElementById('nombreJuego').value
    let categoriaJuego= document.getElementById('categoriaJuego').value
    let descripcionJuego= document.getElementById('descripcionJuego').value
    let imagenesJuego= document.getElementById('imagenesJuego').value
    let codigoEmbedJuego= document.getElementById('codigoEmbedJuego').value
    if(validarGeneral()){
        let juego= new Juego(codigoJuego, nombreJuego, categoriaJuego, descripcionJuego, imagenesJuego, codigoEmbedJuego)
    
        juegos.push(juego)
        localStorage.setItem('juegosKey', JSON.stringify(juegos))
    
        modalJuego.hide();
        renderizarDatos();
    }
}

// funcion para renderizar Juegos

const renderizarDatos = () =>{
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
        <td><input onclick="ocultarJuego(this)" ${juego.publicado === false ? '' : 'checked'} id="${juego.codigoJuego}" type='checkbox'/></td>
        <td>
        <a onclick="editJuego(this)" id="${juego.codigoJuego}"><i class="far fa-edit"></i></a></a>
        <a onclick="elimJuego(this)" id="${juego.codigoJuego}"><i class="fas fa-trash-alt"></i></a></a>
        <a onclick="destJuego(this)" id="${juego.codigoJuego}"><i class="${juego.destacada === true ? 'fas fa-star' : 'far fa-star'}"></i></a></a>
        </td>
      </tr>`;
      tablaBody.innerHTML += codigoHtml;
    }
    // si juego.publicada igual true ? escribi esto : sino, esto
    // ${juego.publicada === true ? 'checked' : ''}
}
renderizarDatos()

// funcion para limpiar el formulario
const limpiarFormulario = () => {
    let formulario = document.getElementById('formulario');
    formulario.reset();

    let codigoJuego = document.getElementById('codigoJuego');
    codigoJuego.className="form-control";

    let nombreJuego = document.getElementById('nombreJuego');
    nombreJuego.className="form-control";

    let categoriaJuego = document.getElementById('categoriaJuego');
    categoriaJuego.className="form-control";

    let descripcionJuego = document.getElementById('descripcionJuego');
    descripcionJuego.className="form-control";

    let imagenesJuego = document.getElementById('imagenesJuego');
    imagenesJuego.className="form-control";

    let codigoEmbedJuego = document.getElementById('codigoEmbedJuego');
    codigoEmbedJuego.className="form-control";
    existeJuego= false;
}

// funcion para eliminar juegos 
window.elimJuego = (juego) => {
    Swal.fire({
        title: '¿Estas seguro de eliminar el juego seleccionado?',
        text: "No hay posibilidades de revertir esta accion!",
        icon: 'warning',
        iconColor:'white',
        background: '#03081d',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
          if (result.isConfirmed){
               // se borra el juego 
               let juegosFiltrados = juegos.filter((juegos) => {
                   return juegos.codigoJuego != juego.id;
               })
            // pasamos los juegos filtrados al arreglo principal
            juegos = juegosFiltrados;
            // guardar los nuevos datos en local storage
            localStorage.setItem('juegosKey', JSON.stringify(juegos));
            renderizarDatos()

            Swal.fire({
                icon: 'success',
                title: '¡Eliminado!',
                text: 'El juego se elimino correctamente.',
                iconColor:'white',
                background: '#03081d',
              })
          }
      })
      
}

// funcion para destacar juegos
window.destJuego = (juego) => {
    for(let element of juegos){
        if(juego.id===element.codigoJuego){
            
            element.destacada=!element.destacada
            localStorage.setItem('juegosDestKey', JSON.stringify(element));
            
        }else{
            element.destacada=false
        }
        localStorage.setItem('juegosKey', JSON.stringify(juegos))
    }
    renderizarDatos();
}

// funcion para destacar juegos
window.ocultarJuego = (juego) => {
    for(let element of juegos){
        if(juego.id===element.codigoJuego){
            element.publicado=!element.publicado          
        }
        localStorage.setItem('juegosKey', JSON.stringify(juegos))
    }
    renderizarDatos();
}

// funcion para editar juego

window.editJuego = (juego) => {
    // busca el objeto a modificar
    let objetoEncontrado = juegos.find((element) => {
        return element.codigoJuego===juego.id;
    });
    // cargar el objeto a modificar
    document.getElementById('codigoJuego').value=objetoEncontrado.codigoJuego;
    document.getElementById('nombreJuego').value=objetoEncontrado.nombreJuego;
    document.getElementById('categoriaJuego').value=objetoEncontrado.categoriaJuego;
    document.getElementById('descripcionJuego').value=objetoEncontrado.descripcionJuego;
    document.getElementById('imagenesJuego').value=objetoEncontrado.imagenesJuego;
    document.getElementById('codigoEmbedJuego').value=objetoEncontrado.codigoEmbedJuego;
    existeJuego= true;
    modalJuego.show();
}

// esta funcion guarda en localstorage con los datos modificados
const actualizarDatosJuego = () => {
    // validar los campos
    if(validarGeneral()){
        let codigoJuego= document.getElementById('codigoJuego').value;
        let nombreJuego= document.getElementById('nombreJuego').value;
        let categoriaJuego= document.getElementById('categoriaJuego').value;
        let descripcionJuego= document.getElementById('descripcionJuego').value;
        let imagenesJuego= document.getElementById('imagenesJuego').value;
        let codigoEmbedJuego= document.getElementById('codigoEmbedJuego').value;
        //buscar el objeto que quiero modificar y cambiar sus valores
        for (let juego of juegos){
            if(juego.codigoJuego===codigoJuego){
                console.log(juego)
                // encontre por id la pelicula a editar
                juego.nombreJuego=nombreJuego;
                juego.categoriaJuego=categoriaJuego;
                juego.descripcionJuego=descripcionJuego;
                juego.imagenesJuego=imagenesJuego;
                juego.codigoEmbedJuego=codigoEmbedJuego;
            }
        }
        // guardar el array en localstorage
        localStorage.setItem('juegosKey', JSON.stringify(juegos));
        // cerrar ventana
        modalJuego.hide();
        // mostrar mensaje de operacion con exito
        Swal.fire(
        'Perfecto!',
        'Editaste una pelicula correctamente',
        'success'
        )
        // renderizar datos
        renderizarDatos()
    }
}

window.guardarJuego = (event) => {
    event.preventDefault();
    if(existeJuego===true){
        actualizarDatosJuego();
    }else{
        agregarJuegos();
    }
}

