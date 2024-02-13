function showPopupSuccess(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
};

function showPopupWarning(message) {
    const warningPopup = document.querySelector('.warning-popup');
    warningPopup.textContent = message;
    warningPopup.classList.add('show');

    setTimeout(() => {
        warningPopup.classList.remove('show');
    }, 2000);
};

function agregarUnidadInputDetail(event) {
    event.preventDefault();

    var inputCantidadProductos = document.querySelector('.inputCantidadProductos');

    inputCantidadProductos.value = parseInt(inputCantidadProductos.value) + 1;
};

function reducirUnidadInputDetail(event) {
    event.preventDefault();

    var inputCantidadProductos = document.querySelector('.inputCantidadProductos');

    if (inputCantidadProductos.value > 1) {
        inputCantidadProductos.value = parseInt(inputCantidadProductos.value) - 1;
    } else {
        event.preventDefault();
    }
};


// Creo función para contar la cantidad de productos en el carrito
function productosEnCarrito() {
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;
}

window.addEventListener("load", function () {
    // let numeroProductosCarrito = document.querySelector('.numeroProductosCarrito');
    // numeroProductosCarrito.innerText = productosEnCarrito();
    // console.log(idBook);

    let inputCantidadProductos = document.querySelector('.inputCantidadProductos'); // Para tomar valor de input de cantidad de productos que elija usuario
    let bookId = inputCantidadProductos.id;
    // console.log('soy bookId ' + bookId);

    

    fetch(`/api/products`)
        .then((res) => res.json())
        .then((products) => {
            // console.log(products.data.stock);
            let productosConStock = products.data.filter((producto) => producto.stock > 0);


            /* LÓGICA BOTON CARRITO PRODUCT DETAIL*/
            let botonesCarrito = document.querySelectorAll('.botonCarrito');
            botonesCarrito.forEach((boton) => {
                boton.addEventListener("click", (e) => {
                    let id = boton.id;
                    let producto = productosConStock.find((p) => p.id == id);
                    let productoAgregado = false;

                    if (!isNaN(parseFloat(inputCantidadProductos.value)) && inputCantidadProductos.value !== null) {
                        if (!producto || parseFloat(inputCantidadProductos.value) > producto.stock) {
                            e.preventDefault();
                            showPopupWarning('No hay stock disponible');
                        } else {
                            if (localStorage.carrito) {
                                let carrito = JSON.parse(localStorage.carrito);
                                var index = carrito.findIndex((producto) => producto.id == id);
                                if (index != -1) {
                                    let cantDisponibleCompra = producto.stock - carrito[index].quantity;
                                    if (parseFloat(carrito[index].quantity) + parseFloat(inputCantidadProductos.value) > producto.stock) {
                                        e.preventDefault();
                                        showPopupWarning('No hay stock disponible');
                                    } else {
                                        carrito[index].quantity += parseFloat(inputCantidadProductos.value);
                                        productoAgregado = true;
                                    }
                                } else {
                                    carrito.push({ id: id, quantity: parseFloat(inputCantidadProductos.value) });
                                    productoAgregado = true;
                                }
                                localStorage.setItem('carrito', JSON.stringify(carrito));
                            } else {
                                localStorage.setItem('carrito', JSON.stringify([{ id: id, quantity: parseFloat(inputCantidadProductos.value) }]));
                                productoAgregado = true;
                            }
                        }

                        if (productoAgregado) {
                            showPopupSuccess('Se añadió un producto al carrito');
                        }
                    }
                });
            });

            /* LÓGICA BOTON DE COMPRA PRODUCT DETAIL */
            let botonesCompra = document.querySelectorAll('.botonCompra');
            botonesCompra.forEach((botonCompra) => {
                botonCompra.addEventListener("click", (e) => {
                    let idCompra = botonCompra.id;
                    let productoCompra = productosConStock.find((p) => p.id == idCompra);
                    let productoAgregado = false;

                    if (!isNaN(parseFloat(inputCantidadProductos.value)) && inputCantidadProductos.value !== null) {
                        if (!productoCompra || parseFloat(inputCantidadProductos.value) > productoCompra.stock) {
                            e.preventDefault();
                            showPopupWarning('No hay stock disponible');
                        } else {
                            if (localStorage.carrito) {
                                let carrito = JSON.parse(localStorage.carrito);
                                var index = carrito.findIndex((producto) => producto.id == idCompra);

                                if (index != -1) {
                                    if (parseFloat(carrito[index].quantity) + parseFloat(inputCantidadProductos.value) > productoCompra.stock) {
                                        e.preventDefault();
                                        showPopupWarning('No hay stock disponible');
                                    } else {
                                        carrito[index].quantity += parseFloat(inputCantidadProductos.value);
                                        productoAgregado = true;
                                    }
                                } else {
                                    carrito.push({ id: idCompra, quantity: parseFloat(inputCantidadProductos.value) });
                                    productoAgregado = true;
                                }
                                localStorage.setItem('carrito', JSON.stringify(carrito));
                            } else {
                                localStorage.setItem('carrito', JSON.stringify([{ id: idCompra, quantity: parseFloat(inputCantidadProductos.value) }]));
                                productoAgregado = true;
                            }
                            if (productoAgregado) {
                                this.location.href = '/products/cart';
                            }
                        }
                    }
                });
            });
        })
        .catch((error) => {
            console.log(error);
            // alert('Ocurrió un error al obtener el stock de los productos');
        });
});