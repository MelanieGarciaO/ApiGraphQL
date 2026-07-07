import pool from "../config/db.js";

// Crea la tabla si no existe. Debe correr ANTES que la de productos
// porque productos tiene una foreign key hacia categorias.
const crearTabla = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS categorias (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL UNIQUE
    );
  `;

  try {
    await pool.query(query);
    console.log("Tabla 'categorias' verificada/creada correctamente");
  } catch (error) {
    console.error("Error al crear la tabla 'categorias':", error.message);
  }
};

const obtenerCategorias = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM categorias ORDER BY id ASC"
  );
  return rows;
};

const obtenerCategoriaPorId = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM categorias WHERE id = $1",
    [id]
  );
  return rows[0];
};

const crearCategoria = async ({ nombre }) => {
  const { rows } = await pool.query(
    "INSERT INTO categorias (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );
  return rows[0];
};

const actualizarCategoria = async (id, { nombre }) => {
  const { rows } = await pool.query(
    "UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *",
    [nombre, id]
  );
  return rows[0];
};

const eliminarCategoria = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM categorias WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

export default {
  crearTabla,
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
