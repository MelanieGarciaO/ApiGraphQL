import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "../graphql/schema.js";
import resolvers from "../graphql/resolvers.js";

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// Middleware de Apollo Server para Express. Al entrar a /graphql desde el
// navegador se abre Apollo Sandbox (la interfaz de peticiones).
const graphqlRoute = expressMiddleware(server);

export default graphqlRoute;
