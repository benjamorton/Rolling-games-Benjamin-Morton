function store(){

    var name = document.getElementById('name');
    var pw = document.getElementById('pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(name.value.length == 0){
        alert('Por favor rellenar Email');

    }else if(pw.value.length == 0){
        alert('Por favor rellenar password');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Por favor rellenar email y password');

    }else if(pw.value.length > 8){
        alert('Maximo 8 caracteres');

    }else if(!pw.value.match(numbers)){
        alert('Debe contener 1 numero');

    }else if(!pw.value.match(upperCaseLetters)){
        alert('Debe contener 1 mayuscula');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('Debe contener 1 minuscula');

    }else{
        localStorage.setItem('name', name.value);
        localStorage.setItem('pw', pw.value);
        alert('Su cuenta ha sido creada con exito!');
    }
}

//checking
function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    var userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPw.value == storedPw){
        alert('Se ha logueado');
    }else{
        alert('Error al loguear');
    }
}