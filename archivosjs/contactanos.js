function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Crear objeto con los datos del formulario
        const data = {
            nombre: name,
            correo_electronico: email,
            telefono: phone,
            comentario: message
        };

        // Enviar datos al servidor usando fetch
        fetch('/enviar-consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            // Limpiar los campos del formulario
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';

            // Mostrar el mensaje de éxito
            document.getElementById('success-message').style.display = 'block';
            
            // Redirigir a la página de éxito después de 2 segundos
            setTimeout(() => {
                window.location.href = 'mensaje_exito.html'; // Cambia esta ruta si es necesario
            }, 2000);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, rellena todos los campos obligatorios.');
    }
}

function goToInicio() {
    window.location.href = "index.html"; // Cambia esta ruta si es necesario
}
