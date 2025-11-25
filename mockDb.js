let mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com' },
];

let mockTransactions = [
  { id: 't1', userId: '1', description: 'Almoço', amount: 75.50 },
  { id: 't2', userId: '1', description: 'Gasolina', amount: 120.00 },
  { id: 't3', userId: '2', description: 'Cinema', amount: 45.00 },
];

module.exports = {
  mockUsers,
  mockTransactions,
};