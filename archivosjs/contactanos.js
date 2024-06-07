function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const data = {
            nombre: name,
            correo_electronico: email,
            telefono: phone,
            comentario: message
        };

        fetch('/enviar-formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('success-message').style.display = 'block';
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 10000);
            // Limpiar campos después de enviar
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, rellena todos los campos obligatorios.');
    }
}
function goToInicio() {
    window.location.href = "../archivoshtml/parte1.html";
}
function fetchConsultas(){
    window.location.href = "../archivoshtml/datosdebase.html";

}