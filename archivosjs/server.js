const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const app = express();
const port = 3000;

// Configuración de body-parser para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'localhost',
    database: 'proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO',
    options: {
        encrypt: true, // Usar esto si estás en Azure
        trustServerCertificate: true // Cambiar a true para certificados autofirmados o desarrollo local
    }
};

// Ruta para manejar el envío del formulario
app.post('/enviar-formulario', (req, res) => {
    const { nombre, correo_electronico, telefono, comentario } = req.body;

    sql.connect(config, err => {
        if (err) {
            console.error('Error de conexión:', err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        const request = new sql.Request();
        const query = `INSERT INTO Consultas (nombre, correo_electronico, telefono, comentario) VALUES (@nombre, @correo_electronico, @telefono, @comentario)`;

        request.input('nombre', sql.NVarChar, nombre);
        request.input('correo_electronico', sql.NVarChar, correo_electronico);
        request.input('telefono', sql.NVarChar, telefono);
        request.input('comentario', sql.NVarChar, comentario);

        request.query(query, (err, result) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                res.status(500).send('Error al insertar datos en la base de datos');
                return;
            }
            console.log('Datos insertados correctamente:', result);
            res.send('Datos insertados correctamente en la base de datos');
        });
    });
});

// Ruta para consultar las consultas
app.get('/consultar-consultas', (req, res) => {
    sql.connect(config, err => {
        if (err) {
            console.error('Error de conexión:', err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        const request = new sql.Request();
        request.query('SELECT * FROM Consultas ORDER BY nombre', (err, result) => {
            if (err) {
                console.error('Error al consultar datos:', err);
                res.status(500).send('Error al consultar datos en la base de datos');
                return;
            }
            res.json(result.recordset);
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
