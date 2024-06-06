function sendMessage() {
    // Obtener los valores de los campos del formulario por sus IDs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Verificar que los campos obligatorios (nombre, correo electrónico y mensaje) no estén vacíos
    if (name && email && message) {
        // Crear un objeto con los datos del formulario
        const data = {
            nombre: name,
            correo_electronico: email,
            telefono: phone,
            comentario: message
        };

        // Enviar los datos al servidor utilizando la API Fetch con método POST
        fetch('/enviar-consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que los datos se envían en formato JSON
            },
            body: JSON.stringify(data) // Convertir el objeto data a una cadena JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text();
        })
        .then(data => {
            // Limpiar los campos del formulario después de enviar los datos
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';

            // Mostrar un mensaje de éxito
            document.getElementById('success-message').style.display = 'block';

            // Ocultar el mensaje de éxito después de 10 segundos
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 10000);
        })
        .catch(error => console.error('Error:', error)); // Manejar cualquier error que ocurra durante el fetch
    } else {
        // Mostrar una alerta si los campos obligatorios no están completos
        alert('Por favor, rellena todos los campos obligatorios.');
    }
}

function goToInicio() {
    window.location.href = "../archivoshtml/parte1.html"; // Cambia esta ruta si es necesario
}

// Función para consultar la base de datos y mostrar los resultados
function fetchConsultas() {
    fetch('/consultar-consultas')
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('consulta-resultados'); // Asegúrate de que este ID coincida con tu HTML
        resultDiv.innerHTML = ''; // Limpiar resultados anteriores
        if (data.length > 0) {
            const table = document.createElement('table');
            const header = table.insertRow();
            header.insertCell().innerText = 'Nombre';
            header.insertCell().innerText = 'Correo Electrónico';
            header.insertCell().innerText = 'Teléfono';
            header.insertCell().innerText = 'Comentario';
            header.insertCell().innerText = 'Fecha Envío';

            data.forEach(consulta => {
                const row = table.insertRow();
                row.insertCell().innerText = consulta.nombre;
                row.insertCell().innerText = consulta.correo_electronico;
                row.insertCell().innerText = consulta.telefono;
                row.insertCell().innerText = consulta.comentario;
                row.insertCell().innerText = consulta.fecha_envio;
            });

            resultDiv.appendChild(table);
        } else {
            resultDiv.innerText = 'No hay consultas registradas.';
        }
    })
    .catch(error => console.error('Error:', error));
}
