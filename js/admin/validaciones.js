function campoRequerido(elemento){
    console.log("en la funcion campo requerido");
    if(elemento.value === ``){
        elemento.className = `form-control is-invalid`;
        return false;
    } else{
        elemento.className = `form-control is-valid`;
        return true;
    }
}

function validarCodigo(codigo){
    console.log("dentro de la funcion validarCodigo");
    let expresion = /\d$/;
    if(expresion.test(codigo.value) && codigo.value.length >=1){
        console.log("salio todo bien");
        codigo.value = codigo.value.slice(0,10);
        codigo.className=`form-control is-valid`;
        return true;
    }
    else{
        console.log("hubo un error");
        codigo.className=`form-control is-invalid`;
        return false;
    }
}


function validarGeneral(){
    if(validarCodigo(document.getElementById(`codigoJuego`))       
    && campoRequerido(document.getElementById(`nombreJuego`))
    && campoRequerido(document.getElementById(`imagenesJuego`))
    && campoRequerido(document.getElementById(`categoriaJuego`))
    && campoRequerido(document.getElementById(`descripcionJuego`))
    && campoRequerido(document.getElementById(`codigoEmbedJuego`))){
        console.log(`Validacion correcta`);
        return true;
    }
}