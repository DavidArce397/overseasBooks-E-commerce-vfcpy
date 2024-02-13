const precio = parseFloat(document.querySelector('.precio').innerText)
const precioEnvio1 = parseFloat(document.querySelector('.precioenvio1').innerText)
const precioEnvio2 = parseFloat(document.querySelector('.precioenvio2').innerText)
const precioRetiro = parseFloat(document.querySelector('.precioretiro1').innerText)
const botonOpcion1 = document.querySelector('.botonopcion1')
const botonOpcion2 = document.querySelector('.botonopcion2')
const botonRetiro = document.querySelector('.retiro1')


botonOpcion1.addEventListener('click', function () {
    document.querySelector('.total1').innerHTML = precio + precioEnvio1
})

botonOpcion2.addEventListener('click', function () {
    document.querySelector('.total1').innerHTML = precio + precioEnvio2
})

botonRetiro.addEventListener('click', function () {
    document.querySelector('.total1').innerHTML = precio + precioRetiro
})
