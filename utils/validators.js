// Valida los datos de un producto antes de insertar/actualizar en la BD.
// Si algo falla, lanza un Error con todos los mensajes juntos.
// Apollo Server captura ese error automáticamente y lo regresa en "errors".
const validarProducto = ({ nombre, precio, stock, categoriaId }) => {
  const errores = [];

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.trim().length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres.");
  } else if (nombre.trim().length > 100) {
    errores.push("El nombre no puede superar los 100 caracteres.");
  }

  if (precio === undefined || precio === null) {
    errores.push("El precio es obligatorio.");
  } else if (typeof precio !== "number" || isNaN(precio)) {
    errores.push("El precio debe ser un número.");
  } else if (precio <= 0) {
    errores.push("El precio debe ser mayor a 0.");
  }

  if (stock === undefined || stock === null) {
    errores.push("El stock es obligatorio.");
  } else if (!Number.isInteger(stock)) {
    errores.push("El stock debe ser un número entero.");
  } else if (stock < 0) {
    errores.push("El stock no puede ser negativo.");
  }

  if (categoriaId === undefined || categoriaId === null) {
    errores.push("La categoria es obligatoria.");
  } else if (!Number.isInteger(Number(categoriaId)) || Number(categoriaId) <= 0) {
    errores.push("El id de categoria debe ser un número entero positivo.");
  }

  if (errores.length > 0) {
    throw new Error(errores.join(" "));
  }
};

// Valida los datos de una categoria
const validarCategoria = ({ nombre }) => {
  const errores = [];

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    errores.push("El nombre de la categoria es obligatorio.");
  } else if (nombre.trim().length < 2) {
    errores.push("El nombre de la categoria debe tener al menos 2 caracteres.");
  } else if (nombre.trim().length > 100) {
    errores.push("El nombre de la categoria no puede superar los 100 caracteres.");
  }

  if (errores.length > 0) {
    throw new Error(errores.join(" "));
  }
};

// Valida que el id recibido sea un entero positivo
const validarId = (id) => {
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum <= 0) {
    throw new Error("El id debe ser un número entero positivo.");
  }
};

export { validarProducto, validarCategoria, validarId };
