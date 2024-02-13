// Solo se actualizan el elemento inner text una vez se vuelve a cargar la página

function productosEnCarrito() {
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;
  }
  
  function actualizarContadorCarrito() {
    let numProductosEnCarrito = document.getElementById('productosEnCarrito');
    numProductosEnCarrito.innerText = productosEnCarrito(); 
  }
  
  window.addEventListener("load", function () {
    actualizarContadorCarrito();
  });
  
  // Agregar un event listener para el evento 'storage' en el localStorage
  window.addEventListener('storage', function (event) {
    if (event.key === 'carrito') {
      actualizarContadorCarrito();
    }
  });

  