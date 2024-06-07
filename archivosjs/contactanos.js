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
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';

            document.getElementById('success-message').style.display = 'block';

            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 10000);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, rellena todos los campos obligatorios.');
    }
}

function goToInicio() {
    window.location.href = "../archivoshtml/parte1.html";
}

// Función para consultar la base de datos y mostrar los resultados
function fetchConsultas() {
    fetch('/consultar-consultas')
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('consulta-resultados');
        resultDiv.innerHTML = '';
        if (data.length > 0) {
            const table = document.createElement('table');
            const header = table.insertRow();
            header.innerHTML = `
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Comentario</th>
                <th>Fecha Envío</th>
            `;

            data.forEach(consulta => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${consulta.nombre}</td>
                    <td>${consulta.correo_electronico}</td>
                    <td>${consulta.telefono || ''}</td>
                    <td>${consulta.comentario}</td>
                    <td>${consulta.fecha_envio}</td>
                `;
            });

            resultDiv.appendChild(table);
        } else {
            resultDiv.innerText = 'No hay consultas registradas.';
        }
    })
    .catch(error => console.error('Error:', error));
    window.location.href = "../archivoshtml/datosdebase.html";
}
function fetchConsultas(){
    window.location.href = "../archivoshtml/datosdebase.html";

}