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
            
            // Ocultar el mensaje de éxito después de 2 segundos
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 2000);
        })
        .catch(error => console.error('Error:', error));
    } else {
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
        const resultDiv = document.getElementById('consulta-result');
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
