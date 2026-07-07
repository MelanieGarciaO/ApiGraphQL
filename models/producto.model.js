import pool from "../config/db.js";

// Convierte el campo creado_en (Date) a texto ISO legible para GraphQL.
// Sin esto, el tipo String de GraphQL usa Date.valueOf() y muestra el
// timestamp numérico en vez de una fecha.
const formatearFila = (fila) => {
  if (!fila) return fila;
  return {
    ...fila,
    creado_en: fila.creado_en ? fila.creado_en.toISOString() : null,
  };
};

// Crea la tabla si no existe. Debe correr DESPUES de crearTabla() de categorias
// porque categoria_id referencia a categorias(id).
const crearTabla = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      precio NUMERIC(10, 2) NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
      creado_en TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log("Tabla 'productos' verificada/creada correctamente");
  } catch (error) {
    console.error("Error al crear la tabla 'productos':", error.message);
  }
};

// Obtener productos, con filtros opcionales por categoria y rango de precio
const obtenerProductos = async ({ categoriaId, precioMin, precioMax } = {}) => {
  const condiciones = [];
  const valores = [];

  if (categoriaId !== undefined && categoriaId !== null) {
    valores.push(categoriaId);
    condiciones.push(`categoria_id = $${valores.length}`);
  }
  if (precioMin !== undefined && precioMin !== null) {
    valores.push(precioMin);
    condiciones.push(`precio >= $${valores.length}`);
  }
  if (precioMax !== undefined && precioMax !== null) {
    valores.push(precioMax);
    condiciones.push(`precio <= $${valores.length}`);
  }

  const where = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";

  const { rows } = await pool.query(
    `SELECT * FROM productos ${where} ORDER BY id ASC`,
    valores
  );
  return rows.map(formatearFila);
};

const obtenerProductoPorId = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM productos WHERE id = $1",
    [id]
  );
  return formatearFila(rows[0]);
};

// Usado por el resolver Categoria.productos (relacion 1 a muchos)
const obtenerProductosPorCategoria = async (categoriaId) => {
  const { rows } = await pool.query(
    "SELECT * FROM productos WHERE categoria_id = $1 ORDER BY id ASC",
    [categoriaId]
  );
  return rows.map(formatearFila);
};

const crearProducto = async ({ nombre, precio, stock, categoriaId }) => {
  const { rows } = await pool.query(
    `INSERT INTO productos (nombre, precio, stock, categoria_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, precio, stock, categoriaId]
  );
  return formatearFila(rows[0]);
};

const actualizarProducto = async (id, { nombre, precio, stock, categoriaId }) => {
  const { rows } = await pool.query(
    `UPDATE productos
     SET nombre = $1, precio = $2, stock = $3, categoria_id = $4
     WHERE id = $5 RETURNING *`,
    [nombre, precio, stock, categoriaId, id]
  );
  return formatearFila(rows[0]);
};

const eliminarProducto = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM productos WHERE id = $1 RETURNING *",
    [id]
  );
  return formatearFila(rows[0]);
};

export default {
  crearTabla,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
