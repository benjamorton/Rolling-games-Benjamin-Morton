// Obtenemos los links a modificar y nuestro usuario logueado
const linkSistemaUsuario=(document.getElementById('linkSistemaUsuario'))
const linkAdministracion=(document.getElementById('linkAdministrador'))
const usuarioLogueado=JSON.parse(localStorage.getItem('usuarioLogueado'))

// Funcion para cerrar sesion
const cerrarSesion = () => {
    // Eliminamos la key del localStorage y redirigimos al index
    localStorage.removeItem('usuarioLogueado')
    window.location.replace('/')
}

// Consultamos si existe la key Usuario logueado
if(usuarioLogueado){
    // Si existe remplazamos el link Registrate/Login a un link para cerrar la sesion
    linkSistemaUsuario.innerHTML= `<a class="nav-link tBlack" onclick="cerrarSesion()" aria-current="page">Cerrar sesión</a>`

    {usuarioLogueado.nombre === 'Admin' ? linkAdministracion.className='nav-item mx-2 my-1' : linkAdministracion.className='d-none'}
}else{
    // Si la key no existe dejamos los links como estaban 
    linkSistemaUsuario.innerHTML=
    `<a class="nav-link tBlack ${window.location.pathname.includes('registro') ?
    'btn-link disabled active' : window.location.pathname.includes('login') ?
    'btn-link disabled active' : ''}" aria-current="page" href="/pages/login.html">
    ${window.location.pathname.includes('registro') ? 'Registro' : 'Login'}</a>`
    linkAdministracion.className='d-none'
}