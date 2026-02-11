/**
 * Banco de dados simulado para usuários.
 * Representa uma coleção em memória de entidades de usuário.
 * @type {Array<{id: string, name: string, email: string}>}
 */
let mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com' },
];

/**
 * Banco de dados simulado para transações.
 * Representa uma coleção em memória de entidades de transação associadas aos usuários.
 * @type {Array<{id: string, userId: string, description: string, amount: number, type: 'INCOME'|'EXPENSE', category: string, createdAt: string}>}
 */
let mockTransactions = [
  { id: 't1', userId: '1', description: 'Almoço', amount: 75.50, type: 'EXPENSE', category: 'Food', createdAt: '2023-10-25T12:00:00Z' },
  { id: 't2', userId: '1', description: 'Salário', amount: 5000.00, type: 'INCOME', category: 'Salary', createdAt: '2023-10-01T09:00:00Z' },
  { id: 't3', userId: '1', description: 'Gasolina', amount: 120.00, type: 'EXPENSE', category: 'Transport', createdAt: '2023-10-26T18:30:00Z' },
  { id: 't4', userId: '2', description: 'Cinema', amount: 45.00, type: 'EXPENSE', category: 'Entertainment', createdAt: '2023-10-27T20:00:00Z' },
];

/**
 * Exporta as estruturas de dados simuladas para uso em resolvers e testes.
 * @module mockDb
 */
module.exports = {
  mockUsers,
  mockTransactions,
};