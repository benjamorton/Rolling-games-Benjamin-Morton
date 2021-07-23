// Se crea un objeto con el usuario administrador
const admin = {
    nombre: 'Admin',
    contraseña :'admin',
    email:'none'
}
// Se piden los datos de los usuarios del local storage, si estos no existen, asignamos el valor de un array con el usuario administrador
const usuarios = JSON.parse(localStorage.getItem('usuariosKey')) || [admin]

// Seteamos el localstorage
localStorage.setItem('usuariosKey', JSON.stringify(usuarios))

// Creamos una clase para nuestros usuarios
class Usuario{
    constructor(nombre, email, contraseña){
        this.nombre=nombre,
        this.email=email,
        this.contraseña=contraseña
    }
}

// Funcion de creacion de usuarios
const crearUsuario = (e) => {
    // Prevenimos que se recargue la pagina
    e.preventDefault()

    // Obtenemos los datos de los inputs
    let nombre = document.getElementById('nombre').value
    let email = document.getElementById('email').value
    let contraseña = document.getElementById('contraseña').value
    
    // Consultamos si los datos no estan vacios y creamos el usuario
    if(
        nombre!== '' &&
        email!== '' &&
        email!== '' 
    ){
        const usuario = new Usuario(nombre, email, contraseña)
    
        // Pusheamos el usuario al array de usuarios y lo guardamos en el localStorage
        usuarios.push(usuario)
        localStorage.setItem('usuariosKey', JSON.stringify(usuarios))

        // Redirigimos al login
        window.location.replace('/pages/login.html')
    }else{
        console.error('Faltan datos')
    }
}