window.addEventListener('load', function() {
    let formulario = document.querySelector('form.formulario-crear')

    formulario.addEventListener('submit', function (e) {
        
        let errores = []
        
        let campoNombre = document.querySelector('input.titleEsp')
        if (campoNombre.value == '') {
            errores.push('Debes escribir un titulo del libro')
        }

        let campoColor = document.querySelector('select.color')
        if (campoColor.value === '') {
            errores.push('Debes seleccionar un color de encabezado')
        }

        let campoAutor = document.querySelector('input.autor')
        if (campoAutor.value == '') {
            errores.push('Debes escribir un autor del libro')
        }

        let campoCategoria = document.querySelector('select.categoria')
        if (campoCategoria.value === '') {
            errores.push('Debes seleccionar una categoria')
        }

        let campoDescripcion = document.querySelector('input.descripcion')
        if (campoDescripcion.value == '') {
            errores.push('Debes escribir una descripcion del libro')
        }

        let campoPrecio = document.querySelector('input.precio')
        if (campoPrecio.value == '') {
            errores.push('Debes escribir un precio del libro')
        }

        let campoImg = document.querySelector('input.img')
        if (campoImg.value === '') {
            errores.push('Debes seleccionar una imagen')
        }

        let campoStock = document.querySelector('input.stock')
        if (campoStock.value == '') {
            errores.push('Debes escribir un stock')
        }
        // console.log(errores)
        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector('.errores ul')
            // console.log(ulErrores)
            ulErrores.innerHTML = ''
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += '<li>' + errores[i] + '</li>'
            }
        }
    })
})