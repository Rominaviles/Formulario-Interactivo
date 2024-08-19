/*Activacion de alto contaste*/

const botonContraste = document.getElementById('alto-contraste');
const body = document.body;

botonContraste.addEventListener('click', function() {
    body.classList.toggle('high-contrast');
});


/*Fromulario*/
const datos  = {
    nombre:'',
    apellido:'',
    correo:'',
    fechaNacimiento:'',
    pais:''
}
const nombre= document.querySelector('#nombre');
const apellido= document.querySelector('#apellido');
const correo= document.querySelector('#correo');
const fechaNacimiento= document.querySelector('#fechaNacimiento');
const pais= document.querySelector('#pais');
const formulario=document.querySelector(".formulario");

nombre.addEventListener('input', leerTexto);
apellido.addEventListener('input', leerTexto);
correo.addEventListener('input', leerTexto);
fechaNacimiento.addEventListener('input', leerTexto);
pais.addEventListener('input', leerTexto);


//Evento submit
formulario.addEventListener('submit',function(evento){
    evento.preventDefault();

    datos.pais= capitalizacionPrimerLetra(datos.pais);

    //Validacion del formulario

    const{nombre, correo, pais, fechaNacimiento} =datos;

    if(nombre===''|| correo === ''|| pais === ''){
        mostrarAlerta('Nombre, correo y pais son obligatorios', 'error');
        return;
    }else if(nombre.length < 3) {
        mostrarAlerta('Debe poner un nombre valido', 'error'); return;
    } else if (!esFechaValida(fechaNacimiento)) {
        mostrarAlerta('Debe ser mayor de edad', 'error'); return;
    } else if (pais === '' || !esPaisValido(pais)) {
        mostrarAlerta('Ingrese un país válido', 'error'); return;
    } else {
        mostrarAlerta('Formulario enviado correctamente');
    }

});




function leerTexto(e){
    datos[e.target.id] = e.target.value;

    console.log(datos);
}

//Funcion para que muestre el error en pantalla

function mostrarAlerta(mensaje, error=null){
    const alerta= document.createElement('P');
    alerta.textContent = mensaje;

    if(error){
        alerta.classList.add('error');
    }else{
        alerta.classList.add('correcto')
    }
        
    formulario.appendChild(alerta);

    //Eliminacion de alerta
    setTimeout(() => {
        alerta.remove();
    }, 2000);
}

//Validacion de pais
function esPaisValido(pais) {
    const paisesValidos = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Peru','Colombia'];
    return paisesValidos.includes(pais);
}


//Validacion de fecha
function esFechaValida(fecha) {
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    // Verificacion para ver si cumplio este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }
    //Retorno si es mayor de 18 años
    return edad > 17;
}

function capitalizacionPrimerLetra(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
