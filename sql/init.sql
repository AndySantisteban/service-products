CREATE DATABASE practica_sql;

use practica_sql;

CREATE TABLE CATEGORIA (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PRODUCTO (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    categoria INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    images VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES CATEGORIA(id)
);