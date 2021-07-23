// Se crea un objeto con el usuario administrador
const admin = {
    nombre: 'Admin',
    contraseña :'admin',
    email:'none'
}
// Se piden los datos de los usuarios del local storage, si estos no existen, asignamos el valor de un array con el usuario administrador
const usuarios = JSON.parse(localStorage.getItem('usuariosKey')) || [admin]

// Funcion para iniciar sesion
const iniciarSesion = (e) => {
     // Prevenimos que se recargue la pagina
    e.preventDefault()

    // Obtenemos los datos de los input
    let nombre = document.getElementById('nombre').value
    let contraseña = document.getElementById('contraseña').value

    // Consultamos si los datos de los inputs coinciden con algun usuario en nuestro array de usuarios en el localStorage
    if(nombre !== '' && contraseña !== ''){
        for(const usuario of usuarios){
            if(usuario.nombre === nombre && usuario.contraseña === contraseña){
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
                if(usuario.nombre === 'Admin'){
                    // Si el usuario logueado es el administrador, redirigir a la pagina de administracion
                    window.location.replace('admin.html')
                }else{
                    // Si es un usuario comun, redirigir al home
                    window.location.replace('/')
                }
            }
        }
    }
}