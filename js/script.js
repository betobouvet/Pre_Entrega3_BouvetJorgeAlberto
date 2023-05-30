document.addEventListener('DOMContentLoaded', function () {
    acceso();
    obtenerNombre();
    mostrarInformacionProductos();

    let productoPrecio5000 = buscarProductoPorPrecio('5000');
    console.log(productoPrecio5000);

    let productosDescuento25 = filtrarProductosPorDescuento(25);
    console.log(productosDescuento25);
});

function acceso() {
    let main = document.getElementById('acceso');
    let resultado = document.getElementById('resultado');

    let confirmacionElement = document.getElementById('confirmacion');

    let confirmacion = JSON.parse(localStorage.getItem('confirmacion'));

    if (confirmacion === null) {
        confirmacion = confirm('Hola, estás por ingresar a una página de venta de repuestos varios. Si deseas ver los productos, haz click en "Aceptar"; en caso contrario, en "Cancelar".');
        localStorage.setItem('confirmacion', JSON.stringify(confirmacion));
    }

    if (confirmacion) {
        resultado.textContent = "Clickeaste Aceptar. Se mostrará la tienda.";
        main.style.display = 'block';
        confirmacionElement.textContent = 'Aceptar';
    } else {
        resultado.textContent = "Haz click en Cancelar. ¡Qué pena, te pierdes la gran variedad de productos de nuestra tienda!";
        main.style.display = 'none';
        confirmacionElement.textContent = 'Cancelar';
    }

    confirmacionElement.addEventListener('click', function () {
        if (confirm('¿Estás seguro/a de cambiar tu elección?')) {
            confirmacion = !confirmacion;
            localStorage.setItem('confirmacion', JSON.stringify(confirmacion));
            if (confirmacion) {
                resultado.textContent = "Clickeaste Aceptar. Se mostrará la tienda.";
                main.style.display = 'block';
                confirmacionElement.textContent = 'Aceptar';
            } else {
                resultado.textContent = "Haz click en Cancelar. ¡Qué pena, te pierdes la gran variedad de productos de nuestra tienda!";
                main.style.display = 'none';
                confirmacionElement.textContent = 'Cancelar';
            }
        }
    });
}

function obtenerNombre() {
    let nombreElement = document.getElementById('nombre');
    let nombreInput = document.getElementById('nombreInput');
    let enviarNombreBtn = document.getElementById('enviarNombre');

    enviarNombreBtn.addEventListener('click', function () {
        let nombre = nombreInput.value;
        nombreElement.textContent = `Hola ${nombre}, bienvenido/a a la página. ¡Es un gusto tenerte aquí!`;

        // almacena nombre 
        localStorage.setItem('nombre', nombre);
    });

    // recupera nombre almacenado
    let nombreAlmacenado = localStorage.getItem('nombre');
    if (nombreAlmacenado) {
        nombreElement.textContent = `Hola ${nombreAlmacenado}, bienvenido/a de nuevo a la página. ¡Es un gusto tenerte aquí!`;
        nombreInput.value = nombreAlmacenado;
    }
}

function mostrarInformacionProductos() {
    let enlaces = document.querySelectorAll('.producto-enlace');

    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (event) {
            event.preventDefault();
            let precio = enlace.dataset.precio;
            let descuento = enlace.dataset.descuento;
            let precioTotal = calcularPrecioTotal(precio, descuento);
            let cardBody = enlace.parentElement;
            let precioElement = cardBody.querySelector('.precio-con-descuento');
            if (!precioElement) {
                precioElement = document.createElement('p');
                precioElement.classList.add('precio-con-descuento');
                cardBody.appendChild(precioElement);
            }
            precioElement.textContent = `Precio con descuento: ${precioTotal}`;

            let precioTexto = cardBody.querySelector('.precio');
            if (!precioTexto) {
                precioTexto = document.createElement('p');
                precioTexto.classList.add('precio');
                cardBody.appendChild(precioTexto);
            }
            precioTexto.textContent = `Precio: ${precio}`;

            let descuentoTexto = cardBody.querySelector('.descuento');
            if (!descuentoTexto) {
                descuentoTexto = document.createElement('p');
                descuentoTexto.classList.add('descuento');
                cardBody.appendChild(descuentoTexto);
            }
            descuentoTexto.textContent = `Descuento: ${descuento}%`;

            if (precioTotal > 50000) {
                if (confirm('Estás por comprar este producto. ¿Deseas continuar?')) {
                    mostrarMensaje('¡Compra realizada con éxito!');
                } else {
                    mostrarMensaje('Has cancelado la compra.');
                }
            } else {
                mostrarMensaje('Puedes seguir comprando. Estás gastando menos de $50000.');
            }
        });
    });
}

function calcularPrecioTotal(precio, descuento) {
    return precio - (precio * descuento) / 100;
}

function buscarProductoPorPrecio(precio) {
    let enlaces = document.querySelectorAll('.producto-enlace');
    return Array.from(enlaces).find(function (enlace) {
        return enlace.dataset.precio == precio;
    });
}

function filtrarProductosPorDescuento(descuento) {
    let enlaces = document.querySelectorAll('.producto-enlace');
    return Array.from(enlaces).filter(function (enlace) {
        return enlace.dataset.descuento >= descuento;
    });
}

function mostrarMensaje(mensaje) {
    let mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    document.body.appendChild(mensajeElement);
}
