const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'localhost',
    database: 'proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const createDatabaseAndTable = async () => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const createDbQuery = `
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO')
            BEGIN
                CREATE DATABASE proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO
            END
        `;
        await request.query(createDbQuery);

        const useDbQuery = `
            USE proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO
        `;
        await request.query(useDbQuery);

        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Consultas')
            BEGIN
                CREATE TABLE Consultas (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    nombre NVARCHAR(100) NOT NULL,
                    correo_electronico NVARCHAR(100) NOT NULL,
                    telefono NVARCHAR(15),
                    comentario NVARCHAR(MAX) NOT NULL,
                    fecha_envio DATETIME DEFAULT GETDATE()
                )
            END
        `;
        await request.query(createTableQuery);

        console.log('Base de datos y tabla creadas correctamente');
    } catch (err) {
        console.error('Error al crear la base de datos o la tabla:', err);
    }
};

app.post('/enviar-formulario', (req, res) => {
    const { nombre, correo_electronico, telefono, comentario } = req.body;

    sql.connect(config, err => {
        if (err) {
            console.error('Error de conexión:', err);
            res.status(500).json({ message: 'Error de conexión a la base de datos' });
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
                res.status(500).json({ message: 'Error al insertar datos en la base de datos' });
                return;
            }
            res.json({ message: 'Datos insertados correctamente en la base de datos' });
        });
    });
});

app.get('/consultar-consultas', (req, res) => {
    sql.connect(config, err => {
        if (err) {
            console.error('Error de conexión:', err);
            res.status(500).json({ message: 'Error de conexión a la base de datos' });
            return;
        }

        const request = new sql.Request();
        request.query('SELECT * FROM Consultas ORDER BY nombre', (err, result) => {
            if (err) {
                console.error('Error al consultar datos:', err);
                res.status(500).json({ message: 'Error al consultar datos en la base de datos' });
                return;
            }
            res.json(result.recordset);
        });
    });
});

app.listen(port, () => {
    createDatabaseAndTable(); // Crear base de datos y tabla al iniciar el servidor
    console.log(`Servidor corriendo en http://localhost:${port}`);
});