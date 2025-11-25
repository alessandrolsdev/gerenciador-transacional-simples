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
    deleteUser(id: ID!): User
    deleteTransaction(id: ID!): Transaction
  }
`;

module.exports = { schemaString };