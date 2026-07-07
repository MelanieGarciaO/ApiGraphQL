import productoModel from "../models/producto.model.js";
import categoriaModel from "../models/categoria.model.js";
import { validarProducto, validarCategoria, validarId } from "../utils/validators.js";

const resolvers = {
  Query: {
    // productos(categoriaId, precioMin, precioMax) -> filtros opcionales
    productos: async (_, { categoriaId, precioMin, precioMax }) => {
      return await productoModel.obtenerProductos({ categoriaId, precioMin, precioMax });
    },

    producto: async (_, { id }) => {
      validarId(id);
      const producto = await productoModel.obtenerProductoPorId(id);
      if (!producto) throw new Error(`No existe un producto con id ${id}.`);
      return producto;
    },

    categorias: async () => {
      return await categoriaModel.obtenerCategorias();
    },

    categoria: async (_, { id }) => {
      validarId(id);
      const categoria = await categoriaModel.obtenerCategoriaPorId(id);
      if (!categoria) throw new Error(`No existe una categoria con id ${id}.`);
      return categoria;
    },
  },

  Mutation: {
    crearProducto: async (_, { input }) => {
      validarProducto(input);
      const categoria = await categoriaModel.obtenerCategoriaPorId(input.categoriaId);
      if (!categoria) throw new Error(`No existe una categoria con id ${input.categoriaId}.`);
      return await productoModel.crearProducto(input);
    },

    actualizarProducto: async (_, { id, input }) => {
      validarId(id);
      validarProducto(input);

      const existente = await productoModel.obtenerProductoPorId(id);
      if (!existente) throw new Error(`No existe un producto con id ${id}.`);

      const categoria = await categoriaModel.obtenerCategoriaPorId(input.categoriaId);
      if (!categoria) throw new Error(`No existe una categoria con id ${input.categoriaId}.`);

      return await productoModel.actualizarProducto(id, input);
    },

    eliminarProducto: async (_, { id }) => {
      validarId(id);
      const existente = await productoModel.obtenerProductoPorId(id);
      if (!existente) throw new Error(`No existe un producto con id ${id}.`);
      return await productoModel.eliminarProducto(id);
    },

    crearCategoria: async (_, { input }) => {
      validarCategoria(input);
      return await categoriaModel.crearCategoria(input);
    },

    actualizarCategoria: async (_, { id, input }) => {
      validarId(id);
      validarCategoria(input);
      const existente = await categoriaModel.obtenerCategoriaPorId(id);
      if (!existente) throw new Error(`No existe una categoria con id ${id}.`);
      return await categoriaModel.actualizarCategoria(id, input);
    },

    eliminarCategoria: async (_, { id }) => {
      validarId(id);
      const existente = await categoriaModel.obtenerCategoriaPorId(id);
      if (!existente) throw new Error(`No existe una categoria con id ${id}.`);
      return await categoriaModel.eliminarCategoria(id);
    },
  },

  // Resolver de relacion: cuando piden { categoria { ... } } dentro de un Producto
  Producto: {
    categoria: async (parent) => {
      if (!parent.categoria_id) return null;
      return await categoriaModel.obtenerCategoriaPorId(parent.categoria_id);
    },
  },

  // Resolver de relacion: cuando piden { productos { ... } } dentro de una Categoria
  Categoria: {
    productos: async (parent) => {
      return await productoModel.obtenerProductosPorCategoria(parent.id);
    },
  },
};

export default resolvers;
