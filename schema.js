/**
 * Definição do schema GraphQL.
 * Define os tipos, queries e mutations disponíveis na API.
 * * @type {string}
 * @description
 * O schema inclui:
 * - Tipos: User, Transaction
 * - Queries: user, transactions
 * - Mutations: createUser, createTransaction, updateUser, updateTransaction, deleteUser, deleteTransaction
 */
const schemaString = `
type User {
  id: ID!
  name: String!
  email: String!
}

enum TransactionType {
  INCOME
  EXPENSE
}

type Transaction {
  id: ID!
  amount: Float!
  userId: ID!
  description: String!
  type: TransactionType!
  category: String!
  createdAt: String!
}

type Summary {
  totalIncome: Float!
  totalExpense: Float!
  balance: Float!
}

type Query {
  user(id: ID!): User
  transactions(userId: ID!): [Transaction]
  summary(userId: ID!): Summary
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createTransaction(amount: Float!, userId: ID!, description: String!, type: String!, category: String!): Transaction!
  updateUser(id: ID!, name: String, email: String): User!
  updateTransaction(id: ID!, amount: Float, description: String, type: String, category: String): Transaction!
  deleteUser(id: ID!): User
  deleteTransaction(id: ID!): Transaction
}
`;

module.exports = { schemaString };