const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const { schemaString } = require('./schema');
const { rootResolver } = require('./resolvers');

/**
 * Compila a string dde definição do schema GraphQL em um objeto executável.
 * @type {GraphQLSchema}
 */
const schema = buildSchema(schemaString);

/**
 * Inicializa a aplicação Express.
 * @type {Express}
 */
const app = express();

/**
 * Configuração de CORS (Cross-Origin Resource Sharing).
 * Permite requisições da origem definida na variável de ambiente FRONTEND_URL
 * ou 'http://localhost:3000' por padrão para desenvolvimento.
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

/**
 * Configura o endpoint GraphQL na rota '/graphql'.
 * Define o schema, o resolver raiz e habilita a interface GraphiQL para facilitar testes.
 */
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));

/**
 * Inicializa o servidor HTTP.
 * Se o ambiente não for de produção, escuta na porta 4000.
 * Em ambientes serverless (como Vercel), o app é exportado para ser tratado pela plataforma.
 */
if (process.env.NODE_ENV !== 'production') {
  app.listen(4000, () => {
    console.log('Servidor Backend (API) rodando em http://localhost:4000/graphql');
  });
}

module.exports = app;
