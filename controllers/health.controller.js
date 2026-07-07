import pool from "../config/db.js";
import { respuestaExitosa, respuestaError } from "../utils/response.js";

// GET /health -> confirma que la API responde y que hay conexión a la BD
const healthCheck = async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return respuestaExitosa(res, {
      api: "activa",
      base_de_datos: "conectada",
    });
  } catch (error) {
    return respuestaError(res, "Sin conexión a la base de datos", 500);
  }
};

export default { healthCheck };
