// typeDefs para Apollo Server. El comentario #graphql es solo para que
// el editor resalte la sintaxis, no afecta la ejecución.
const typeDefs = `#graphql
  type Categoria {
    id: ID!
    nombre: String!
    productos: [Producto]
  }

  type Producto {
    id: ID!
    nombre: String!
    precio: Float!
    stock: Int!
    creado_en: String
    categoria: Categoria
  }

  input ProductoInput {
    nombre: String!
    precio: Float!
    stock: Int!
    categoriaId: ID!
  }

  input CategoriaInput {
    nombre: String!
  }

  type Query {
    productos(categoriaId: ID, precioMin: Float, precioMax: Float): [Producto]
    producto(id: ID!): Producto
    categorias: [Categoria]
    categoria(id: ID!): Categoria
  }

  type Mutation {
    crearProducto(input: ProductoInput!): Producto
    actualizarProducto(id: ID!, input: ProductoInput!): Producto
    eliminarProducto(id: ID!): Producto

    crearCategoria(input: CategoriaInput!): Categoria
    actualizarCategoria(id: ID!, input: CategoriaInput!): Categoria
    eliminarCategoria(id: ID!): Categoria
  }
`;

export default typeDefs;
