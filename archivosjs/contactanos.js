
function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Aquí puedes añadir la lógica para enviar el mensaje a un servidor o procesar la información de otra manera
        
        // Limpiar los campos del formulario
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';

        // Mostrar el mensaje de éxito
        document.getElementById('success-message').style.display = 'block';
    } else {
        alert('Por favor, rellena todos los campos obligatorios.');
    }
}
function goToInicio() {
    window.location.href = "../archivoshtml/parte1.html"; // Cambia esta ruta si es necesario
}