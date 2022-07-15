async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    "mysql://root:@localhost:3306/practica_sql"
  );
  console.log("Connected to MySQL!");
  global.connection = connection;
  return connection;
}

async function selectCategorias() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM CATEGORIA;");
  return rows;
}
async function createCategorias(nombre, descripcion) {
  const conn = await connect();
  const [rows] = await conn.query(
    "INSERT INTO CATEGORIA (NOMBRE, DESCRIPCION) VALUES (?,?)",
    [nombre, descripcion]
  );
  return rows;
}
async function updateCategoria(id, nombre) {
  const conn = await connect();
  const [rows] = await conn.query(
    "UPDATE CATEGORIA SET nombre = ? WHERE id = ?",
    [nombre, id]
  );
  return rows;
}
async function deleteCategorias(id) {
  const conn = await connect();
  const [rows] = await conn.query("DELETE FROM CATEGORIA WHERE id = ?", [id]);
  return rows;
}

async function selectProductos() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM PRODUCTO;");
  return rows;
}

async function createProductos(nombre, precio, categoria, descripcion, images) {
  const conn = await connect();
  const [rows] = await conn.query(
    "INSERT INTO PRODUCTO (NOMBRE, PRECIO, CATEGORIA, DESCRIPCION, IMAGES) VALUES (?, ?, ?, ?, ?)",
    [nombre, precio, categoria, descripcion, images]
  );
  return rows;
}
async function updateProductos(
  id,
  nombre,
  precio,
  categoria,
  descripcion,
  images
) {
  const conn = await connect();
  const [rows] = await conn.query(
    "UPDATE PRODUCTO SET nombre = ?, precio = ?, categoria = ?, stock = ?, images = ? WHERE id = ?",
    [nombre, precio, categoria, descripcion, images, id]
  );

  return rows;
}
async function deleteProductos(id) {
  const conn = await connect();
  const [rows] = await conn.query("DELETE FROM PRODUCTO WHERE id = ?", [id]);
  return rows;
}

module.exports = {
  selectCategorias,
  selectProductos,
  createCategorias,
  updateCategoria,
  deleteCategorias,
  createProductos,
  updateProductos,
  deleteProductos,
};
