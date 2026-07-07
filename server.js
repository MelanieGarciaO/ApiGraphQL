import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./config/db.js";
import categoriaModel from "./models/categoria.model.js";
import productoModel from "./models/producto.model.js";

import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

import healthRoutes from "./routes/health.routes.js";
import graphqlRoute from "./routes/graphql.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas REST auxiliares
app.use("/health", healthRoutes);

// Ruta GraphQL (interfaz Apollo Sandbox disponible en /graphql)
app.use("/graphql", graphqlRoute);

// Manejo de errores (siempre al final)
app.use(errorHandler);

const iniciarServidor = async () => {
  await categoriaModel.crearTabla();
  await productoModel.crearTabla();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🎮 Apollo Sandbox disponible en http://localhost:${PORT}/graphql`);
    console.log(`🩺 Health check en http://localhost:${PORT}/health`);
  });
};

iniciarServidor();
