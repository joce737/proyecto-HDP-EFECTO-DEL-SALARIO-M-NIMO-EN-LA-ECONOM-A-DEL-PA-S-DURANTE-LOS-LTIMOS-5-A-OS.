document.addEventListener('DOMContentLoaded', () => {
    fetch('/consultar-consultas')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#consultas-table tbody');
        tbody.innerHTML = '';

        if (data.length > 0) {
            data.forEach(consulta => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${consulta.nombre}</td>
                    <td>${consulta.correo_electronico}</td>
                    <td>${consulta.telefono || ''}</td>
                    <td>${consulta.comentario}</td>
                    <td>${new Date(consulta.fecha_envio).toLocaleString()}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5">No hay consultas registradas.</td>';
            tbody.appendChild(row);
        }
    })
    .catch(error => console.error('Error:', error));
});
