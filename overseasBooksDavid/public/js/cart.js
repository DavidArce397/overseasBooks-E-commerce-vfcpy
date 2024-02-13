let cartRows = document.querySelector('.cartRows');
let totalAmount = document.querySelector('.totalContainer span');
let products = [];
let productStock;

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



function guardarCarritoEnLocalStorage(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

function setCarritoVacio() {
  cartRows.innerHTML =
    `<tr>
      <td colspan="6" style="text-align: center;" class="textocarritocompras p">El carrito de compras está vacío</td>
    </tr>`;
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
}

function removerItem(index) {
  let carrito = JSON.parse(localStorage.carrito);
  carrito.splice(index, 1); // Remover el elemento del arreglo
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload(); // Recargar la página para actualizar el carrito
}

function agregarUnidad(index) {
  let carrito = JSON.parse(localStorage.carrito);
  carrito[index].quantity++; // Incrementar la cantidad del producto en 1
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload(); // Recargar la página para actualizar el carrito
}

function reducirUnidad(index) {
  let carrito = JSON.parse(localStorage.carrito);
  carrito[index].quantity--; // Disminuir la cantidad del producto en 1
  if (carrito[index].quantity === 0) {
    carrito.splice(index, 1); // Eliminar el producto del carrito si la cantidad llega a cero
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload(); // Recargar la página para actualizar el carrito
}

function calcularTotal(products) {
  const total = products.reduce((acum, product) => (
    acum += product.price * product.quantity
  ), 0);
  
  return total.toFixed(2);
}


function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 10000);
}

function actualizarStock(products) {
  products.forEach((product) => {
    const { productId, quantity } = product;
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((productData) => {
        const updatedStock = productData.data.stock - quantity;
        // console.log('productData.Stock ' + quantity);
        fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock: updatedStock }),
        })
          .then((res) => res.json())
          .then((updatedProduct) => {
            // Manejar la respuesta después de actualizar el stock si es necesario
            console.log(updatedProduct);
          })
          .catch((error) => {
            // Manejar el error en caso de que ocurra durante la actualización del stock
            console.log('No se pudo actualizar el stock');
          });
      })
      .catch((error) => {
        // Manejar el error en caso de que ocurra al obtener los datos del producto
        console.log('No se obtuvieron los datos del producto');
      });
  });
};

if (localStorage.carrito && JSON.parse(localStorage.carrito).length > 0) {
  let carrito = JSON.parse(localStorage.carrito);
  carrito.forEach((item, index) => {
    fetch(`/api/products/${item.id}`)
      .then((res) => res.json())
      .then((product) => {
        if (product) {
          cartRows.innerHTML += `
            <tr id="row${index}">
              <td style="padding: 8px; text-align: center;">${index + 1}</td>
              <td style="padding: 8px; text-align: center;">${product.data.title}</td>
              <td style="padding: 8px; text-align: center;">
                <a href="/products/details/${product.data.id}">
                  <img src="/images/products/${product.data.img}" alt="Product Image" style="max-width: 100px; max-height: 100px;">
                </a>
              </td>
              <td style="padding: 8px; text-align: center;">$${product.data.price}</td>
              <td style="padding: 8px; text-align: center;" class="quantitySet"><button style="margin-right: 10px" onclick="reducirUnidad(${index})" class="buttonReducirUnidad"><i class="fa-solid fa-minus"></i></button> ${item.quantity}  <button  style="margin-left: 10px" onclick="${item.quantity} < ${product.data.stock} ? agregarUnidad(${index}) : showPopupWarning('No hay stock disponible')" class="buttonAgregarUnidad"><i class="fa-solid fa-plus"></i></button></td>
              <td style="padding: 8px; text-align: center;">$${(product.data.price * item.quantity).toFixed(2)} </td>
              <td><button onclick="removerItem(${index})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;

          products.push({
            productId: product.data.id,
            title: product.data.title,
            price: product.data.price,
            quantity: item.quantity
          });

        } else {
          removerItem(index); // Borro el artículo si no lo encuentra en la base de datos
        }
      })
      .then(() => {
        totalAmount.innerText = `$${calcularTotal(products)}`;
      });
  });

  /* Comienzo lógica de checkout */
  let checkoutCart = document.querySelector('#checkoutCart');
  checkoutCart.addEventListener('submit',async (e) => {
    e.preventDefault();

    const shippingMethodSelect = document.querySelector('#shipping_method');
    const paymentMethodSelect = document.querySelector('#payment_method');

    if (shippingMethodSelect && paymentMethodSelect) {
      const shippingMethod = shippingMethodSelect.value;
      const paymentMethod = paymentMethodSelect.value;

      const formData = {
        orderItems: products,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        total: calcularTotal(products)
      };

      // if (products.length > 0) {
      /* Código para checkout con mercadoPago */

        let cartItems = formData.orderItems;

          // Crear un array de productos en el formato requerido por el método createPayment
          let items = cartItems.map(item => {
            return {
              title: item.title,
              unit_price: parseFloat(item.price),
              currency_id: "ARS",
              quantity: parseFloat(item.quantity)
            };
          });

          guardarCarritoEnLocalStorage(products);


          // Realizar una solicitud fetch para enviar los detalles de pago al método createPayment
          let response = await fetch('/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              items: items
            })
          });

          let data = await response.json();
          console.log(data);
          // Vaciamos el local storage antes de redirigir
          vaciarCarrito();
          window.location.href = data.init_point;


      
      // Actualizamos el stock al momento de realizar la compra
      actualizarStock(products);

      fetch('/orders', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            vaciarCarrito();
            showPopup('Procediendo al checkout. Por favor espere.');
            // console.log(data);
            // setCarritoVacio();
            // setTimeout(() => {
            //   location.reload();
            // }, 4000);
            // location.href = `/orders/${data.order.id}`;
          }
        });
    } else {
      setCarritoVacio();
    }
  });
} else {
  setCarritoVacio();
}

