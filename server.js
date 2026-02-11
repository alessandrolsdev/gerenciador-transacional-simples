const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const { schemaString } = require('./schema');
const { rootResolver } = require('./resolvers');

/**
 * Compila a string do schema GraphQL em um objeto Schema.
 */
const schema = buildSchema(schemaString);

/**
 * Inicializa a aplicação Express.
 */
const app = express();

/**
 * Configuração de CORS com origem controlada.
 * Em produção, configure a variável de ambiente FRONTEND_URL.
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

/**
 * Configura o endpoint GraphQL.
 * Define o schema, o resolver raiz e habilita o GraphiQL para testes.
 */
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));

/**
 * Inicia o servidor na porta 4000 apenas se não estiver rodando no Vercel.
 * No Vercel, exportamos o app para ser tratado como Serverless Function.
 */
if (process.env.NODE_ENV !== 'production') {
  app.listen(4000, () => {
    console.log('Backend Server (API) running at http://localhost:4000/graphql');
  });
}

module.exports = app;