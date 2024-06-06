const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'localhost',
    database: 'tu_base_de_datos',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

sql.connect(config, err => {
    if (err) console.log(err);
    else console.log('Conectado a la base de datos');
});

app.post('/enviar-consulta', (req, res) => {
    const { nombre, correo_electronico, telefono, comentario } = req.body;

    const request = new sql.Request();
    request.query(`INSERT INTO Consultas (nombre, correo_electronico, telefono, comentario, fecha_envio) VALUES ('${nombre}', '${correo_electronico}', '${telefono}', '${comentario}', GETDATE())`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al enviar la consulta');
        } else {
            res.send('Consulta enviada correctamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
