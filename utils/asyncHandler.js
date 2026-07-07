// Envuelve funciones async de controllers para que cualquier error
// caiga automáticamente en errorHandler.js, sin try/catch repetido en todos lados.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
