app.post('/enviar-consulta', (req, res) => {
    const { nombre, correo_electronico, telefono, comentario } = req.body;
    const request = new sql.Request();
    const query = `INSERT INTO Consultas (nombre, correo_electronico, telefono, comentario) VALUES (@nombre, @correo_electronico, @telefono, @comentario)`;

    request.input('nombre', sql.NVarChar, nombre);
    request.input('correo_electronico', sql.NVarChar, correo_electronico);
    request.input('telefono', sql.NVarChar, telefono);
    request.input('comentario', sql.NVarChar, comentario);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error al enviar la consulta');
            return;
        }
        res.send('Consulta enviada con éxito');
    });
});
