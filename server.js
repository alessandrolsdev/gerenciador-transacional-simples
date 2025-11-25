// =======================================================
// 🚀 IMPORTAÇÕES E CONFIGURAÇÃO BÁSICA DO SERVIDOR
// =======================================================

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

// Habilita CORS porque o frontend (React/Relay) fará requisições cross-origin.
app.use(cors());


// =======================================================
// 🧬 DEFINIÇÃO DO SCHEMA GRAPHQL
// =======================================================
// Aqui declaramos a "linguagem" do GraphQL: os tipos, queries e mutations.
// O Relay depende 100% de um schema formal bem definido.
const schemaString = `
  # -----------------------
  # 👤 Tipo User
  # -----------------------
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # -----------------------
  # 💸 Tipo Transaction
  # -----------------------
  type Transaction {
    id: ID!
    amount: Float!
    userId: ID!
    description: String!
  }

  # -----------------------
  # 🔍 Consultas (Query)
  # -----------------------
  type Query {
    user(id: ID!): User
    transactions(userId: ID!): [Transaction]
  }

  # -----------------------
  # ✏️ Mutations (CRUD)
  # -----------------------
  type Mutation {
    createUser(name: String!, email: String!): User!
    createTransaction(amount: Float!, userId: ID!, description: String!): Transaction!
    updateUser(id: ID!, name: String, email: String): User!
    updateTransaction(id: ID!, amount: Float, description: String): Transaction!
    deleteUser(id: ID!): User!
    deleteTransaction(id: ID!): Transaction!
  }
`;


// =======================================================
// 🧠 RESOLVERS (A LÓGICA DO BACKEND)
// =======================================================
// Aqui estão as funções que realmente executam o que o GraphQL pede.
// Os resolvers conectam QUERIES/MUTATIONS aos dados (mock, DB, API, etc.)
const rootResolver = {

  // -----------------------
  // 🔍 Query: Buscar usuário por ID
  // -----------------------
  user: (args) => {
    return mockUsers.find(user => user.id === args.id);
  },

  // -----------------------
  // 🔍 Query: Buscar transações por usuário
  // -----------------------
  transactions: (args) => {
    return mockTransactions.filter(tx => tx.userId === args.userId);
  },


  // -----------------------
  // ➕ createUser — Criar novo usuário
  // -----------------------
  // Aqui você valida, cria, salva no mock e retorna o objeto criado.
  createUser: (args) => {
    if (!args.name || !args.email) {
      throw new Error("Name and email are required.");
    }

    const newUser = {
      id: String(mockUsers.length + 1), // ID incremental simples
      name: args.name,
      email: args.email,
    };

    mockUsers.push(newUser); // Persistência em memória
    return newUser;
  },


  // -----------------------
  // ➕ createTransaction — Criar nova transação
  // -----------------------
  createTransaction: (args) => {
    if (!args.amount || !args.userId || !args.description) {
      throw new Error("Missing required transaction fields.");
    }

    const newTransaction = {
      id: 't' + (mockTransactions.length + 1),
      userId: args.userId,
      description: args.description,
      amount: args.amount,
    };

    mockTransactions.push(newTransaction);
    return newTransaction;
  },


  // -----------------------
  // 🔄 updateUser — Atualizar usuário existente
  // -----------------------
  // Uma característica ótima do GraphQL:
  // Campos opcionais dispensam validações desnecessárias.
  updateUser: (args) => {
    const user = mockUsers.find(u => u.id === args.id);
    if (!user) {
      throw new Error("User not found for ID: " + args.id);
    }

    // Atualiza somente os campos enviados — padrão ideal do GraphQL
    if (args.name) user.name = args.name;
    if (args.email) user.email = args.email;

    return user;
  },


  // -----------------------
  // 🔄 updateTransaction — Atualizar transação existente
  // -----------------------
  updateTransaction: (args) => {
    const tx = mockTransactions.find(t => t.id === args.id);
    if (!tx) {
      throw new Error("Transaction not found for ID: " + args.id);
    }

    if (args.amount) tx.amount = args.amount;
    if (args.description) tx.description = args.description;

    return tx;
  },


  // -----------------------
  // ❌ deleteUser — Deletar usuário por ID
  // -----------------------
  deleteUser: (args) => {
    const index = mockUsers.findIndex(u => u.id === args.id);

    if (index === -1) {
      throw new Error("User not found for ID: " + args.id);
    }

    const [deletedUser] = mockUsers.splice(index, 1);
    return deletedUser;
  },


  // -----------------------
  // ❌ deleteTransaction — Deletar transação por ID
  // -----------------------
  deleteTransaction: (args) => {
    const index = mockTransactions.findIndex(t => t.id === args.id);

    if (index === -1) {
      throw new Error("Transaction not found for ID: " + args.id);
    }

    const [deletedTransaction] = mockTransactions.splice(index, 1);
    return deletedTransaction;
  },
};


// =======================================================
// 🏗️ CONSTRUÇÃO DO SCHEMA
// =======================================================
// Converte a string do schema para um objeto que o GraphQL entende.
const schema = buildSchema(schemaString);


// =======================================================
// 🚀 CRIAÇÃO DO ENDPOINT /graphql
// =======================================================
// Interface gráfica (GraphiQL) ativada para inspeção manual das queries.
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));


// =======================================================
// ▶️ INICIAR SERVIDOR
// =======================================================
app.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql');
});


// =======================================================
// 🧪 MOCK DATA — BANCO DE DADOS EM MEMÓRIA
// =======================================================
// Em produção, isso seria substituído por PostgreSQL, Mongo, Redis etc.
const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com' },
];

const mockTransactions = [
  { id: 't1', userId: '1', description: 'Almoço', amount: 75.50 },
  { id: 't2', userId: '1', description: 'Gasolina', amount: 120.00 },
  { id: 't3', userId: '2', description: 'Cinema', amount: 45.00 },
];
