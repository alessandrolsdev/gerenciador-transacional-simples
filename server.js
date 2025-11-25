// server.js

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// --- IMPORTAÇÕES REFATORADAS ---
const { schemaString } = require('./schema'); // O contrato
const { rootResolver } = require('./resolvers'); // A lógica

// --- CONFIGURAÇÃO ---
const schema = buildSchema(schemaString);
const app = express();
app.use(cors());

// --- INICIAÇÃO DO ENDPOINT ---
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Servidor Backend (API) rodando em http://localhost:4000/graphql');
});