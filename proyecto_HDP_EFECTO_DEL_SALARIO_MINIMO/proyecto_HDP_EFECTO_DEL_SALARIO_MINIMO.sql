CREATE DATABASE proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO;

USE proyecto_HDP_EFECTO_DEL_SALARIO_MINIMO;

CREATE TABLE Consultas (
  id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255),
    correo_electronico NVARCHAR(255),
    telefono NVARCHAR(20),
    comentario NVARCHAR(MAX),
    fecha_envio DATETIME DEFAULT GETDATE()
);

