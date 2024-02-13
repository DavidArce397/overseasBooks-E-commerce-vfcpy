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
  
  
  // Creo función para contar la cantidad de productos en el carrito
  function productosEnCarrito() {
      return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;
    }
    
    
  
  
    window.addEventListener("load", function () {
        let numProductosEnCarrito  = document.getElementById('productosEnCarrito');
        numProductosEnCarrito.innerText = productosEnCarrito();  
     
  
      fetch(`/api/products`)
          .then((res) => res.json())
          .then((products) => {
              // console.log(products.data.stock);
              let productosConStock = products.data.filter((producto) => producto.stock > 0);
  
              /* LÓGICA BOTON CARRITO HOME */
              let botonesCarrito = document.querySelectorAll('.botonCarrito');
              botonesCarrito.forEach((boton) => {
                  boton.addEventListener("click", (e) => {
                  let id = boton.id;
                  let producto = productosConStock.find((p) => p.id == id);
                  let productoAgregado = false;
  
                      if (!producto) {
                      e.preventDefault();
                      showPopupWarning('No hay stock disponible');
                      } else {
                      if (localStorage.carrito) {
                          let carrito = JSON.parse(localStorage.carrito);
                          var index = carrito.findIndex((producto) => producto.id == id);
                          if (index != -1) {
                          let cantDisponibleCompra = producto.stock - carrito[index].quantity;
                          if (parseFloat(carrito[index].quantity) + 1 > producto.stock) {
                              e.preventDefault();
                              showPopupWarning('No hay stock disponible');
                          } else {
                              carrito[index].quantity += 1;
                              productoAgregado = true;
                          }
                          } else {
                          carrito.push({ id: id, quantity: 1 });
                          productoAgregado = true;
                          }
                          localStorage.setItem('carrito', JSON.stringify(carrito));
                      } else {
                          localStorage.setItem('carrito', JSON.stringify([{ id: id, quantity: 1 }]));
                          productoAgregado = true;
                      }
                      
  
                      if (productoAgregado) {
                      showPopupSuccess('Se añadió un producto al carrito');
                      numProductosEnCarrito.innerText = productosEnCarrito();
                      }
                  }
                  });
              });
  
              /* LÓGICA BOTON DE COMPRA HOME */
              let botonesCompra = document.querySelectorAll('.botonCompra');
              botonesCompra.forEach((botonCompra) => {
                  botonCompra.addEventListener("click", (e) => {
                  let idCompra = botonCompra.id;
                  let productoCompra = productosConStock.find((p) => p.id == idCompra);
                  let productoAgregado = false;
  
                      if (!productoCompra) {
                      e.preventDefault();
                      showPopupWarning('No hay stock disponible');
                      } else {
                      if (localStorage.carrito) {
                          let carrito = JSON.parse(localStorage.carrito);
                          var index = carrito.findIndex((producto) => producto.id == idCompra);
  
                          if (index != -1) {
                          if (parseFloat(carrito[index].quantity) + 1 > productoCompra.stock) {
                              e.preventDefault();
                              showPopupWarning('No hay stock disponible');
                          } else {
                              carrito[index].quantity += 1;
                              productoAgregado = true;
                          }
                          } else {
                          carrito.push({ id: idCompra, quantity: 1 });
                          productoAgregado = true;
                          }
                          localStorage.setItem('carrito', JSON.stringify(carrito));
                      } else {
                          localStorage.setItem('carrito', JSON.stringify([{ id: idCompra, quantity: 1 }]));
                          productoAgregado = true;
                      }
                      if (productoAgregado) {
                          this.location.href = '/products/cart';
                          numProductosEnCarrito.innerText = productosEnCarrito();
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