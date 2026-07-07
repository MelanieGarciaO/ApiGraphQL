// Helper para mantener un formato de respuesta consistente en las rutas REST
// (health check, etc.). El CRUD principal vive en GraphQL, esto es solo
// para los endpoints auxiliares.

export const respuestaExitosa = (res, datos, status = 200) => {
  return res.status(status).json({
    ok: true,
    datos,
  });
};

export const respuestaError = (res, mensaje, status = 400) => {
  return res.status(status).json({
    ok: false,
    mensaje,
  });
};
