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
 * @type {Array<{id: string, userId: string, description: string, amount: number}>}
 */
let mockTransactions = [
  { id: 't1', userId: '1', description: 'Almoço', amount: 75.50 },
  { id: 't2', userId: '1', description: 'Gasolina', amount: 120.00 },
  { id: 't3', userId: '2', description: 'Cinema', amount: 45.00 },
];

/**
 * Exporta as estruturas de dados simuladas para uso em resolvers e testes.
 * @module mockDb
 */
module.exports = {
  mockUsers,
  mockTransactions,
};