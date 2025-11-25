// Importa os dados de mock para serem usados na lógica
const { mockUsers, mockTransactions } = require('./mockDb'); 

const rootResolver = {
  // READ
  user: (args) => mockUsers.find(user => user.id === args.id),
  transactions: (args) => mockTransactions.filter(tx => tx.userId === args.userId),

  // CREATE
  createUser: (args) => {
    if (!args.name || !args.email) throw new Error("Name and email are required.");
    const newUser = {
      id: String(mockUsers.length + 1),
      name: args.name,
      email: args.email,
    };
    mockUsers.push(newUser);
    return newUser;
  },
  createTransaction: (args) => {
    if (!args.amount || !args.userId || !args.description) throw new Error("Missing fields.");
    const newTransaction = {
      id: 't' + (mockTransactions.length + 1),
      userId: args.userId,
      description: args.description,
      amount: args.amount,
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  // UPDATE
  updateUser: (args) => {
    const user = mockUsers.find(u => u.id === args.id);
    if (!user) throw new Error("User not found.");
    if (args.name) user.name = args.name;
    if (args.email) user.email = args.email;
    return user;
  },
  updateTransaction: (args) => {
    const tx = mockTransactions.find(t => t.id === args.id);
    if (!tx) throw new Error("Transaction not found.");
    if (args.amount) tx.amount = args.amount;
    if (args.description) tx.description = args.description;
    return tx;
  },

  // DELETE
  deleteUser: (args) => {
    const index = mockUsers.findIndex(u => u.id === args.id);
    if (index === -1) throw new Error("User not found.");
    const [deletedUser] = mockUsers.splice(index, 1);
    return deletedUser;
  },
  deleteTransaction: (args) => {
    const index = mockTransactions.findIndex(t => t.id === args.id);
    if (index === -1) throw new Error("Transaction not found.");
    const [deletedTx] = mockTransactions.splice(index, 1);
    return deletedTx;
  },
};

module.exports = { rootResolver };