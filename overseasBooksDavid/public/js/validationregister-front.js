window.addEventListener('load', function() {
    let formulario = document.querySelector('form.formulario')

    formulario.addEventListener('submit', function (e) {
        
        let errores = []
        
        let campoNombre = document.querySelector('input.nombre')
        if (campoNombre.value == '') {
            errores.push('Debes escribir tu nombre')
        }

        let campoApellido = document.querySelector('input.apellido')
        if (campoApellido.value == '') {
            errores.push('Debes escribir tu apellido')
        }

        let campoMail = document.querySelector('input.mail')
        if (campoMail.value == '') {
            errores.push('Debes escribir tu mail')
        }

        let campoPassword = document.querySelector('input.password')
        if (campoPassword.value == '') {
            errores.push('Debes escribir tu contraseña')
        }
        /* La validación de abajo sirve para solicitar imagen al momento de registrarse */
        // let campoImg = document.querySelector('input.img')
        // if (campoImg.value === '') {
        //     errores.push('Debes seleccionar una imagen')
        // }
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