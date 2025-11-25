const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');


const app = express();
app.use(cors());
const schemaString = `
    type User {
    id: ID!
    name: String!
    email: String!
  }

  type Transaction {
    id: ID!
    amount: Float!
    userId: ID!
    description: String!
  }

  type Query {
    user(id: ID!): User
    transactions(userId: ID!): [Transaction]
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createTransaction(amount: Float!, userId: ID!, description: String!): Transaction!
    updateUser(id: ID!, name: String, email: String): User!
    updateTransaction(id: ID!, amount: Float, description: String): Transaction!
    deleteUser(id: ID!): User!
    deleteTransaction(id: ID!): Transaction!
  }
`;
const rootResolver = {
  // --- QUERY RESOLVERS (Estes estavam corretos) ---
  user: (args) => {
    return mockUsers.find(user => user.id === args.id);
  },
  transactions: (args) => {
    return mockTransactions.filter(tx => tx.userId === args.userId);
  },

  // --- MUTATION RESOLVERS (CORRIGIDOS) ---

  // CRIAÇÃO (CREATE)
  createUser: (args) => {
    // 1. O código de verificação deve estar aqui, mas a lógica de criação também!
    if (!args.name || !args.email) {
      throw new Error("Name and email are required.");
    }
    const newUser = {
      id: String(mockUsers.length + 1), // Gera ID Sequencial
      name: args.name,
      email: args.email,
    };
    mockUsers.push(newUser); // Salva no Mock
    return newUser; // Retorna o objeto (Passo obrigatório do Schema)
  },

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

  // ATUALIZAÇÃO (UPDATE)
  updateUser: (args) => {
    // 1. Encontra o usuário (usando .find() como na query 'user')
    const user = mockUsers.find(u => u.id === args.id);
    if (!user) {
      throw new Error("User not found for ID: " + args.id);
    }

    // 2. Atualiza APENAS os campos que foram enviados (graças à ausência do '!' no schema)
    if (args.name) {
      user.name = args.name;
    }
    if (args.email) {
      user.email = args.email;
    }

    return user; // Retorna o objeto atualizado
  },

  updateTransaction: (args) => {
    const tx = mockTransactions.find(t => t.id === args.id);
    if (!tx) {
      throw new Error("Transaction not found for ID: " + args.id);
    }
    // Lógica para atualizar a transação
    if (args.amount) {
      tx.amount = args.amount;
    }
    if (args.description) {
      tx.description = args.description;
    }
    return tx;
  },
  deleteUser: (args) => {
    // 1. Encontra o ÍNDICE do usuário.
    const index = mockUsers.findIndex(u => u.id === args.id);
    
    // 2. Se o índice for -1, o usuário não existe.
    if (index === -1) {
      throw new Error("User not found for ID: " + args.id);
    }
    
    // 3. Remove o item do array e guarda o item removido (splice retorna um array)
    const [deletedUser] = mockUsers.splice(index, 1); 
    
    // 4. Retorna o usuário que acabou de ser deletado (para confirmação).
    return deletedUser;
  },
  deleteTransaction: (args) => {
    const index = mockTransactions.findIndex(t => t.id === args.id);
    if (index === -1) {
      throw new Error("Transaction not found for ID: " + args.id);
    }
    const [deletedTransaction] = mockTransactions.splice(index, 1);
    return deletedTransaction;
  },
};

const schema  = buildSchema(schemaString);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('GraphQL server running at http://localhost:4000/graphql');
});


const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com' },
];

const mockTransactions = [
  { id: 't1', userId: '1', description: 'Almoço', amount: 75.50 },
  { id: 't2', userId: '1', description: 'Gasolina', amount: 120.00 },
  { id: 't3', userId: '2', description: 'Cinema', amount: 45.00 },
];