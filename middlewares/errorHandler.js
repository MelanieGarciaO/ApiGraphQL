// Middleware de manejo de errores. Va SIEMPRE al final de la cadena en server.js
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error no controlado:", err.message);

  res.status(err.status || 500).json({
    ok: false,
    mensaje: err.message || "Error interno del servidor",
  });
};

export default errorHandler;
