let juegos= JSON.parse(localStorage.getItem('juegosKey')) || [];
localStorage.removeItem('idJuego')

// Pedimos los datos del usuario logueado
const usuarioLogueado=JSON.parse(localStorage.getItem('usuarioLogueado'))

const customSwal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-purple mx-1',
      cancelButton: 'btn btn-purple mx-1',
      title: 'text-light',
      content: 'text-light',
    },
    buttonsStyling: false,
    background: '#283046',
  })

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

    let nombreJuego= document.getElementById('nombreJuego').value.length > 30 ?
    document.getElementById('nombreJuego').value.slice(0,30) : document.getElementById('nombreJuego').value
    
    let categoriaJuego= document.getElementById('categoriaJuego').value
    
    let descripcionJuego= document.getElementById('descripcionJuego').value.length > 400 ?
    document.getElementById('descripcionJuego').value.slice(0, 400) : document.getElementById('descripcionJuego').value

    let imagenesJuego= document.getElementById('imagenesJuego').value

    let codigoEmbedJuego= document.getElementById('codigoEmbedJuego').value

    if(validarGeneral()){
        let juego= new Juego(codigoJuego, nombreJuego, categoriaJuego, descripcionJuego, imagenesJuego, codigoEmbedJuego)
    
        juegos.push(juego)
        localStorage.setItem('juegosKey', JSON.stringify(juegos))
    
        modalJuego.hide();
        customSwal.fire({
            icon: 'success',
            title: '¡Agregado!',
            text: 'El juego se agregó correctamente.',
            iconColor:'white',
          })
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
        <td>${juego.descripcionJuego.length > 70 ? juego.descripcionJuego.slice(0, 70) + '...' : juego.descripcionJuego}</td>
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
    customSwal.fire({
        title: '¿Estas seguro de eliminar el juego seleccionado?',
        text: "No hay posibilidades de revertir esta accion!",
        icon: 'warning',
        iconColor:'white',
        showCancelButton: true,
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

            customSwal.fire({
                icon: 'success',
                title: '¡Eliminado!',
                text: 'El juego se elimino correctamente.',
                iconColor:'white',
              })
          }
      })
      
}

// funcion para destacar juegos
window.destJuego = (juego) => {
    for(let element of juegos){
        if(juego.id===element.codigoJuego){
            
            localStorage.setItem('juegosDestKey', JSON.stringify(element));
            element.destacada=!element.destacada

            if(!element.destacada){
             localStorage.removeItem('juegosDestKey');
            }
            
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

        let nombreJuego= document.getElementById('nombreJuego').value.length > 30 ?
        document.getElementById('nombreJuego').value.slice(0,30) : document.getElementById('nombreJuego').value;

        let categoriaJuego= document.getElementById('categoriaJuego').value;

        let descripcionJuego= document.getElementById('descripcionJuego').value.length > 400 ? 
        document.getElementById('descripcionJuego').value.slice(0, 400) : document.getElementById('descripcionJuego').value;

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
        customSwal.fire(
        'Perfecto!',
        'Editaste un juego correctamente',
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

// Base datos local para cargar los juegos por defecto

const datos = [
    {
        categoriaJuego: "accion",
        codigoEmbedJuego: "tCI396HyhbQ",
        codigoJuego: "1",
        descripcionJuego: "La trama de Death Stranding transcurre en un mundo postapocalíptico en el que un evento conocido como Death Stranding fusionó el mundo de los vivos y el de los muertos. La primera son los Entes Varados (o EV), almas de los muertos atrapadas en el mundo de los vivos que intentan arrastrar a los humanos al más allá.",
        destacada: false,
        imagenesJuego: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/11/death-stranding_15.jpg",
        nombreJuego: "Death stranding",
        publicado: true,
    },
    {

        categoriaJuego: "accion",
        codigoEmbedJuego: "FkklG9MA0vM",
        codigoJuego: "2",
        descripcionJuego: "Doom Eternal es un videojuego de acción y disparos en primera persona desarrollado por id Software y publicado por Bethesda Softworks.​ Es el quinto título principal de la serie Doom y la secuela directa del juego estrenado en 2016. El juego fue lanzado el 20 de marzo de 2020 para las plataformas PlayStation 4, Xbox One, Microsoft Windows, Stadia y Nintendo Switch3​, además de versiones planeadas para PlayStation 5 y Xbox Series X.",
        destacada: false,
        imagenesJuego: "https://i.blogs.es/b25956/doom-eternal/1366_2000.jpeg",
        nombreJuego: "Doom eternal",
        publicado: true,
    },
    {
        categoriaJuego: "accion",
        codigoEmbedJuego: "K0u_kAWLJOA",
        codigoJuego: "3",
        descripcionJuego: "Los ejércitos del infierno han invadido la Tierra. Ponte en la piel del Slayer en una épica campaña para un jugador y cruza dimensiones para detener la destrucción definitiva de la humanidad. No le tienen miedo a nada... salvo a ti.",
        destacada: false,
        imagenesJuego: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/ax0V5TYMax06mLzmkWeQMiwH.jpg",
        nombreJuego: "God of War",
        publicado: true,
    },
    {
        categoriaJuego: "accion",
        codigoEmbedJuego: "3DBrG2YjqQA",
        codigoJuego: "4",
        descripcionJuego: "Cuando un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor y más desquiciado del mundo criminal, del gobierno de los EE. UU. y de la industria del espectáculo, tendrán que llevar a cabo una serie de peligrosos golpes para sobrevivir en una ciudad implacable en la que no pueden confiar en nadie. Y mucho menos los unos en los otros.",
        destacada: false,
        imagenesJuego: "https://compass-ssl.xbox.com/assets/a0/4f/a04f2744-74d9-4668-8263-e0261fbea869.jpg?n=GTA-V_GLP-Page-Hero-1084_1920x1080.jpg",
        nombreJuego: "GTA V",
        publicado: true,
    },
    {
        categoriaJuego: "accion",
        codigoEmbedJuego: "NL4ZxDWLwpM",
        codigoJuego: "5",
        descripcionJuego: "The Phantom Pain marca la entrada de la franquicia en una nueva era gracias a la innovadora tecnología de Fox Engine y ofrece a los jugadores una experiencia de juego de máximo nivel y libertad táctica para llevar a cabo misiones en mundo abierto.",
        destacada: false,
        imagenesJuego: "https://store-images.s-microsoft.com/image/apps.43376.65636291532456667.5893b5ba-43c6-42b7-afce-10638cd992d8.1f1dc21e-bc18-40e0-9394-e8fd6f4a85d2?mode=scale&q=90&h=1080&w=1920",
        nombreJuego: "Metal gear solid V",
        publicado: true,
    },
    {
        categoriaJuego: "aventura",
        codigoEmbedJuego: "aQM8yWoiy5s",
        codigoJuego: "6",
        descripcionJuego: "Despiertas en la orilla de una isla misteriosa en la que debes aprender a sobrevivir. Usa tu astucia para matar o domar a las criaturas primitivas que vagan por el lugar. Encuéntrate con otros jugadores para sobrevivir, ejercer el dominio... ¡y escapar!",
        destacada: true,
        imagenesJuego: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/12/ark-survival-evolve-2166129.jpg",
        nombreJuego: "Ark survival evolved",
        publicado: true,
    },
    {
        categoriaJuego: "aventura",
        codigoEmbedJuego: "ssrNcwxALS4",
        codigoJuego: "7",
        descripcionJuego: "Conviértete en Eivor, un poderoso saqueador vikingo y lidera a tu clan desde las inclementes costas de Noruega a un nuevo hogar en medio de las exuberantes tierras de cultivo de la Inglaterra del siglo IX. Explora un hermoso y misterioso mundo abierto donde te enfrentarás a brutales enemigos, saquearás fortalezas, construirás el nuevo asentamiento de tu clan y forjarás alianzas para conseguir la gloria y obtener un lugar en el Valhalla. Inglaterra, en la época de los vikingos, es una nación fracturada llena de amos mezquinos y reinos en guerra. Debajo de todo el caos yace una tierra salvaje y llena de abundancia que espera a un nuevo conquistador. ¿Serás tú?",
        destacada: false,
        imagenesJuego: "https://as02.epimg.net/meristation/imagenes/2021/06/12/videos/1623527079_931214_1623527169_noticia_normal.jpg",
        nombreJuego: "Assassins creed valhalla",
        publicado: true,
    },
    {
        categoriaJuego: "aventura",
        codigoEmbedJuego: "CNpIfP4vtrE",
        codigoJuego: "8",
        descripcionJuego: "Situado unos años más tarde de los terroríficos acontecimientos del laureado Resident Evil 7 biohazard, esta nueva historia empieza con Ethan Winters y su mujer Mia viviendo en paz en un nuevo lugar, libres de las pesadillas del pasado. Pero, en el mismo momento en que empiezan a construir su nueva vida juntos, la tragedia se cierne de nuevo sobre ellos. Cuando su casa se ve atacada por Chris Redfield, el capitán de la BSAA, Ethan debe adentrarse en los infiernos una vez más para traer de vuelta a su hija secuestrada.",
        destacada: false,
        imagenesJuego: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/05/resident-evil-village-2325573.jpg",
        nombreJuego: "Resident evil village",
        publicado: true,
    },
    {

        categoriaJuego: "aventura",
        codigoEmbedJuego: "pMW_sycSs30",
        codigoJuego: "9",
        descripcionJuego: "Cuando un evento violento interrumpe esa paz, Ellie se embarca en un viaje incesante para obtener justicia y llegar a un cierre. A medida que caza a los responsables uno por uno, deberá enfrentarse a las devastadoras repercusiones físicas y emocionales de sus acciones.",
        destacada: false,
        imagenesJuego: "https://sm.ign.com/ign_latam/news/t/the-last-o/the-last-of-us-part-2-is-getting-a-ps5-exclusive-performance_abvm.jpg",
        nombreJuego: "The last of us part 2",
        publicado: true,
    },
    {
        categoriaJuego: "aventura",
        codigoEmbedJuego: "XYtyeqVQnRI",
        codigoJuego: "10",
        descripcionJuego: "En Shadow of the Tomb Raider Definitive Edition, descubre el capítulo final del origen de Lara mientras se convierte en la saqueadora de tumbas que está destinada a ser. Shadow of the Tomb Raider Definitive Edition es la mejor forma de experimentar el momento decisivo de Lara, ya que incluye el juego base, todas las armas descargables, atuendos y habilidades.",
        destacada: false,
        imagenesJuego: "https://sm.ign.com/ign_es/blogroll/r/rise-of-th/rise-of-the-tomb-raider-lets-you-weaponize-chicken_s2m1.jpg",
        nombreJuego: "Shadow Of The Tomb Raider",
        publicado: true,
    },
    {
        categoriaJuego: "deporte",
        codigoEmbedJuego: "tuLAn9adQpI",
        codigoJuego: "11",
        descripcionJuego: "Gana como equipo en EA SPORTS™ FIFA 21, de la mano de Frostbite™. Ya sea que el juego tenga lugar en calles o estadios, FIFA 21 ofrece más formas de jugar que antes, incluidas la Liga de Campeones de la UEFA y la copa CONMEBOL Libertadores.",
        destacada: false,
        imagenesJuego: "https://cdn2.unrealengine.com/dame-1920x1080-1920x1080-6005df88fd7e.jpg",
        nombreJuego: "Fifa 21",
        publicado: true,
    },
    {
        categoriaJuego: "deporte",
        codigoEmbedJuego: "Ib5ygUYjHZI",
        codigoJuego: "12",
        descripcionJuego: "NBA 2K21 es la nueva entrega de la famosa serie de baloncesto superventas NBA 2K. Gracias a las importantes mejoras realizadas en la jugabilidad, los gráficos, las funciones en línea comunitarias y competitivas, y con una gran variedad de modos de juego, NBA 2K21 ofrece una experiencia única llena de baloncesto y cultura de la NBA, donde 'este juego lo es todo'.",
        destacada: false,
        imagenesJuego: "https://i.blogs.es/5eddcc/nba-2k21/1366_2000.jpeg",
        nombreJuego: "NBA 2k21",
        publicado: true,
    },
    {
        categoriaJuego: "deporte",
        codigoEmbedJuego: "GSXViWOyEO4",
        codigoJuego: "13",
        descripcionJuego: "eFootball PES 2021 Season Update incluye todas las características que hicieron que PES fuera merecedor del premio \"Best Sports Game\" en el E3 de 2019 ¡y muchas más! La saga PES, nacida en 1995, cumple este año un cuarto de siglo. Te invitamos a que vuelvas a pisar el terreno de juego con nosotros en una nueva temporada que estará repleta de emociones.",
        destacada: false,
        imagenesJuego: "https://i.blogs.es/6fd8f7/pes-2021/1366_2000.jpeg",
        nombreJuego: "PES 2021",
        publicado: true,
    },
    {
        categoriaJuego: "deporte",
        codigoEmbedJuego: "SgSX3gOrj60",
        codigoJuego: "14",
        descripcionJuego: "Salta al campo en solitario o con amigos en los modos de juego online 1 contra 1, 2 contra 2 y 3 contra 3, o disfruta de los modos extra como Estruendo, Día nevado o Baloncesto. ¡Desbloquea objetos con el Rocket Pass, sube de rango competitivo, participa en torneos competitivos, supera desafíos, disfruta del progreso multiplataforma y mucho más! El campo te espera. ¡Haz el saque inicial!",
        destacada: false,
        imagenesJuego: "https://www.nintendo.com//content/dam/noa/es_LA/games/switch/r/rocket-league-switch/rocket-league-switch-hero.jpg",
        nombreJuego: "Rocket League",
        publicado: true,
    },
    {

        categoriaJuego: "deporte",
        codigoEmbedJuego: "GjugTk9ovcI",
        codigoJuego: "15",
        descripcionJuego: "En EA SPORTS UFC 4, el luchador en el que te conviertes depende de tu estilo de lucha, tus logros y tu personalidad. Desarrolla a tu personaje y personalízalo mediante un sistema de progreso unificado en todos los modos.",
        destacada: false,
        imagenesJuego: "https://sm.ign.com/t/ign_es/screenshot/default/ufc-4-new-levels_sefe.1200.jpg",
        nombreJuego: "UFC 4",
        publicado: true,
    },
    {
        categoriaJuego: "estrategia",
        codigoEmbedJuego: "fCcRNUlE7ek",
        codigoJuego: "16",
        descripcionJuego: "El Age 3 está ambientado en la época de la colonización europea de América, entre los siglos XVI y XIX, cuando el jugador debe escoger una de las ocho naciones del Viejo Mundo",
        destacada: false,
        imagenesJuego: "https://images8.alphacoders.com/532/thumb-1920-532305.jpg",
        nombreJuego: "Age of Empires III: Definitive Edition",
        publicado: true,
    },
    {
        categoriaJuego: "estrategia",
        codigoEmbedJuego: "5KdE0p2joJw",
        codigoJuego: "17",
        descripcionJuego: "Civilization IV es un videojuego de construcción de imperios histórico en el cual el objetivo del jugador es construir un imperio desde cero. ... Desde aquí, el jugador deberá expandir su imperio mientras compite con sus rivales, aprovechándose de la geografía y el desarrollo tecnológico.",
        destacada: false,
        imagenesJuego: "https://store-images.s-microsoft.com/image/apps.44011.13770061534167293.625888cc-8d42-414a-b342-29619e88556b.bd4c1e40-cb7a-471e-aef6-ca5788bffce6?mode=scale&q=90&h=720&w=1280&background=%23FFFFFF",
        nombreJuego: "Civilization VI",
        publicado: true,
    },
    {
        categoriaJuego: "estrategia",
        codigoEmbedJuego: "-cSFPIwMEq4",
        codigoJuego: "18",
        descripcionJuego: "Dota 2 es un juego multijugador de estrategia en tiempo real, distribuido por la plataforma Steam de Valve. En este, dos equipos de cinco jugadores tienen el objetivo de destruir las estructuras rivales controlando a personajes denominados héroes",
        destacada: false,
        imagenesJuego: "https://www.teahub.io/photos/full/10-104894_fondos-de-pantalla-dota-2-ursa.jpg",
        nombreJuego: "Dota 2",
        publicado: true,
    },
    {
        categoriaJuego: "estrategia",
        codigoEmbedJuego: "a8h1BTe45AU",
        codigoJuego: "19",
        descripcionJuego: "League of Legends es un juego de estrategia por equipos en el que dos equipos de cinco campeones se enfrentan para ver quién destruye antes la base del otro. Elige de entre un elenco de 140 campeones para realizar jugadas épicas, asesinar rivales y destruir la base enemiga.",
        destacada: false,
        imagenesJuego: "https://images8.alphacoders.com/102/1021166.jpg",
        nombreJuego: "League of legends",
        publicado: true,
    },
    {
        categoriaJuego: "estrategia",
        codigoEmbedJuego: "MVbeoSPqRs4",
        codigoJuego: "20",
        descripcionJuego: "StarCraft II es un juego de estrategia en tiempo real. Sus acontecimientos tienen lugar en un sector lejano de la galaxia Vía Láctea. Es el primer videojuego StarCraft y fue puesto a la venta para PC el 1 de abril de 1998. Una versión Mac OS del juego f",
        destacada: false,
        imagenesJuego: "https://www.wallpapertip.com/wmimgs/3-33729_starcraft-2-protoss-wallpaper-hd-hd-wallpaper-backgrounds.jpg",
        nombreJuego: "StarCraft II",
        publicado: true,
    }
]

window.cargarDatos = ()=>{
    localStorage.setItem('juegosKey', JSON.stringify(datos))
    juegos= JSON.parse(localStorage.getItem('juegosKey'))
    renderizarDatos()
}

