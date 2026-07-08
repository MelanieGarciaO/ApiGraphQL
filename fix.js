import pool from "./config/db.js";

const fix = async () => {
  try {
    await pool.query(
      "ALTER TABLE productos ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL"
    );
    console.log("✅ Columna categoria_id agregada correctamente");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await pool.end();
  }
};

fix();