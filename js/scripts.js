/* Activación de alto contraste */
const botonContraste = document.getElementById('alto-contraste');
const body = document.body;

botonContraste.addEventListener('click', function() {
    body.classList.toggle('high-contrast');
});

/* Formulario */
const datos = {
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    pais: '',
    comentarios: '' // Asegúrate de que la propiedad coincida con el id del textarea
};

const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const correoInput = document.querySelector('#correo');
const fechaNacimientoInput = document.querySelector('#fechaNacimiento');
const paisInput = document.querySelector('#pais');
const comentariosInput = document.querySelector('#comentarios'); // Cambié 'comments' por 'comentarios'
const formulario = document.querySelector(".formulario");

nombreInput.addEventListener('input', leerTexto);
apellidoInput.addEventListener('input', leerTexto);
correoInput.addEventListener('input', leerTexto);
fechaNacimientoInput.addEventListener('input', leerTexto);
paisInput.addEventListener('input', leerTexto);
comentariosInput.addEventListener('input', leerTexto); // Event listener para textarea

// Evento submit
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    datos.pais = capitalizacionPrimerLetra(datos.pais);

    // Validación del formulario
    const { nombre, apellido, correo, pais, fechaNacimiento, comentarios } = datos;

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
    } else if (comentarios.trim().length < 10 || comentarios.trim().length > 500) { // Validación de longitud del comentario
        mostrarAlerta('Los comentarios deben tener entre 10 y 500 caracteres', 'error');
        return;
    } else {
        mostrarAlerta('Formulario enviado correctamente');
        // Aquí puedes agregar lógica para enviar el formulario si es necesario.
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

let paisesValidos = [];

// Hacemos un fetch al archivo JSON para obtener la lista de países válidos
fetch('paises.json')
    .then(response => response.json())
    .then(data => {
        paisesValidos = data.paisesValidos;
        console.log('Paises cargados:', paisesValidos); // Verificar si los países se cargan correctamente
    })
    .catch(error => {
        console.error('Error al cargar los países:', error);
    });

// Función para validar si el país ingresado es válido
function esPaisValido(pais) {
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
