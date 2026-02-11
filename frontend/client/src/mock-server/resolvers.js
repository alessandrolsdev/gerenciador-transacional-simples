/**
 * Resolver raiz para operações GraphQL.
 * Implementa a lógica para buscar e modificar dados.
 */
import { mockUsers, mockTransactions } from './mockDb';

/**
 * Expressão regular para validação de email.
 * @constant {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const rootResolver = {
    /**
     * Retrieves a single user by ID.
     * @param {Object} args - Query arguments.
     * @param {string} args.id - User ID.
     */
    user: (args) => mockUsers.find(user => user.id === args.id),

    /**
     * Retrieves all transactions for a specific user, sorted by date (newest first).
     * @param {Object} args - Query arguments.
     * @param {string} args.userId - User ID.
     */
    transactions: (args) => {
        return mockTransactions
            .filter(tx => tx.userId === args.userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    /**
     * Calculates financial summary for a user.
     * @param {Object} args - Query arguments.
     * @param {string} args.userId - User ID.
     */
    summary: (args) => {
        const userTx = mockTransactions.filter(tx => tx.userId === args.userId);

        const totalIncome = userTx
            .filter(tx => tx.type === 'INCOME')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const totalExpense = userTx
            .filter(tx => tx.type === 'EXPENSE')
            .reduce((sum, tx) => sum + tx.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        };
    },

    /**
     * Creates a new user.
     * @param {Object} args - Mutation arguments.
     */
    createUser: (args) => {
        if (!args.name || !args.email) {
            throw new Error("Name and email are required.");
        }

        if (!EMAIL_REGEX.test(args.email)) {
            throw new Error("Invalid email format.");
        }

        const maxId = mockUsers.length > 0
            ? Math.max(...mockUsers.map(u => parseInt(u.id)))
            : 0;

        const newUser = {
            id: String(maxId + 1),
            name: args.name,
            email: args.email,
        };
        mockUsers.push(newUser);
        return newUser;
    },

    /**
     * Creates a new transaction with type, category, and automatic timestamp.
     * @param {Object} args - Mutation arguments.
     */
    createTransaction: (args) => {
        if (args.amount === undefined || !args.userId || !args.description || !args.type || !args.category) {
            throw new Error("Missing required fields.");
        }

        if (args.amount < 0) {
            throw new Error("Amount cannot be negative.");
        }

        if (!['INCOME', 'EXPENSE'].includes(args.type)) {
            throw new Error("Invalid transaction type. Must be INCOME or EXPENSE.");
        }

        const maxId = mockTransactions.length > 0
            ? Math.max(...mockTransactions.map(t => parseInt(t.id.substring(1)) || 0))
            : 0;

        const newTransaction = {
            id: 't' + (maxId + 1),
            userId: args.userId,
            description: args.description,
            amount: args.amount,
            type: args.type,
            category: args.category,
            createdAt: new Date().toISOString()
        };

        mockTransactions.push(newTransaction);
        return newTransaction;
    },

    /**
     * Updates an existing user.
     */
    updateUser: (args) => {
        const user = mockUsers.find(u => u.id === args.id);
        if (!user) throw new Error("User not found.");

        if (args.email && !EMAIL_REGEX.test(args.email)) {
            throw new Error("Invalid email format.");
        }

        if (args.name) user.name = args.name;
        if (args.email) user.email = args.email;
        return user;
    },

    /**
     * Updates a transaction.
     */
    updateTransaction: (args) => {
        const tx = mockTransactions.find(t => t.id === args.id);
        if (!tx) throw new Error("Transaction not found.");

        if (args.amount !== undefined && args.amount !== null) {
            if (args.amount < 0) throw new Error("Amount cannot be negative.");
            tx.amount = args.amount;
        }

        if (args.description) tx.description = args.description;
        if (args.type) tx.type = args.type;
        if (args.category) tx.category = args.category;

        return tx;
    },

    /**
     * Deletes a user.
     */
    deleteUser: (args) => {
        const index = mockUsers.findIndex(u => u.id === args.id);
        if (index === -1) throw new Error("User not found.");
        const [deletedUser] = mockUsers.splice(index, 1);
        return deletedUser;
    },

    /**
     * Deletes a transaction.
     */
    deleteTransaction: (args) => {
        const index = mockTransactions.findIndex(t => t.id === args.id);
        if (index === -1) throw new Error("Transaction not found.");
        const [deletedTx] = mockTransactions.splice(index, 1);
        return deletedTx;
    },
};
