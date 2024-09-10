/* Activación de alto contraste */
const botonContraste = document.getElementById('alto-contraste');
const body = document.body;

botonContraste.addEventListener('click', function() {
    body.classList.toggle('high-contrast');
});

/* Formulario */
const datos  = {
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    pais: ''
};

const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const correoInput = document.querySelector('#correo');
const fechaNacimientoInput = document.querySelector('#fechaNacimiento');
const paisInput = document.querySelector('#pais');
const formulario = document.querySelector(".formulario");

nombreInput.addEventListener('input', leerTexto);
apellidoInput.addEventListener('input', leerTexto);
correoInput.addEventListener('input', leerTexto);
fechaNacimientoInput.addEventListener('input', leerTexto);
paisInput.addEventListener('input', leerTexto);

// Evento submit
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    datos.pais = capitalizacionPrimerLetra(datos.pais);

    // Validación del formulario
    const { nombre, apellido, correo, pais, fechaNacimiento } = datos;

    if (nombre === '' || correo === '' || pais === '') {
        mostrarAlerta('Nombre, correo y país son obligatorios', 'error');
        return;
    } else if (!/^[a-zA-Z\s]+$/.test(nombre) || nombre.length < 3) {
        mostrarAlerta('Debe poner un nombre válido (solo letras y espacios)', 'error');
        return;
    } else if (!/^[a-zA-Z\s]+$/.test(apellido) || apellido.length < 3) {
        mostrarAlerta('Debe poner un apellido válido (solo letras y espacios)', 'error');
        return;
    } else if (!esFechaValida(fechaNacimiento)) {
        mostrarAlerta('Debe ser mayor de edad', 'error');
        return;
    } else if (pais === '' || !esPaisValido(pais)) {
        mostrarAlerta('Ingrese un país válido', 'error');
        return;
    } else {
        mostrarAlerta('Formulario enviado correctamente');
    }
});

function leerTexto(e) {
    datos[e.target.id] = e.target.value;
    console.log(datos);
}

// Función para mostrar la alerta en pantalla
function mostrarAlerta(mensaje, error = null) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;

    if (error) {
        alerta.classList.add('error');
    } else {
        alerta.classList.add('correcto');
    }

    formulario.appendChild(alerta);

    // Eliminación de alerta
    setTimeout(() => {
        alerta.remove();
    }, 2000);
}

// Validación de país
function esPaisValido(pais) {
    const paisesValidos = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Peru'];
    return paisesValidos.includes(pais);
}

// Validación de fecha
function esFechaValida(fecha) {
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    // Verificación para ver si cumplió este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }
    // Retorno si es mayor de 18 años
    return edad > 17;
}

function capitalizacionPrimerLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
