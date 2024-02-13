


let stockDisponible = document.querySelector('.stockDisponible p');
let divCantidad = document.querySelector('div.divCantidadArticulosDisponibles span');
let divBotonCompra = document.querySelector('div.divBotonCompra');
let books = JSON.parse(document.currentScript.getAttribute('data-books'));
let cantidadInput = document.querySelector('div.cantidad input');
let stock = divBotonCompra.getAttribute('data-stock');





if (stockDisponible.classList.contains('outOfStockP')) {
    stockDisponible.innerText = 'Sin Stock';
    stockDisponible.style.color = 'red';
} else {
    stockDisponible.style.color = 'green';
}


if (divCantidad.classList.contains('sinArticulosDisponibles')) {
    divCantidad.innerText = '(Sin artículos disponibles)';
}




// Validando que no se seleccione más stock del que hay disponible


// console.log(cantidadInput.value);

// cantidadInput.addEventListener('focus', function(e) {
//     if(cantidadInput.value > stock) {
//         console.log('NO HAY STOCK!!')
//     }
// })

// divBotonCompra.addEventListener('click', function (event) {
//     if (stock < cantidadInput.value) {
//         console.log(cantidadInput.value);
//         event.preventDefault();
//         console.log('NO HAY STOCK')
//         alert('No hay stock disponible');
//     }
// })
