window.addEventListener('load', function() {
    let formulario = document.querySelector('form.formulario')

    formulario.addEventListener('submit', function (e) {
        
        let errores = []
        
        let campoEmail = document.querySelector('input.mail')
        if (campoEmail.value == '') {
            errores.push('Debes escribir tu mail')
        }

        let campoPassword = document.querySelector('input.password')
        if (campoPassword.value == '') {
            errores.push('Debes escribir tu contraseña')
        }
        console.log(errores)
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