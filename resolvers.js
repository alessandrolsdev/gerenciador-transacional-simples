/**
 * Resolver raiz para operações GraphQL.
 * Implementa a lógica para buscar e modificar dados.
 */
const { mockUsers, mockTransactions } = require('./mockDb');

/**
 * Expressão regular para validação de email.
 * @constant {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rootResolver = {
  /**
   * Recupera um único usuário pelo seu ID.
   * @param {Object} args - Os argumentos passados para a query.
   * @param {string} args.id - O ID do usuário a ser recuperado.
   * @returns {Object|undefined} O objeto do usuário se encontrado, caso contrário undefined.
   */
  user: (args) => mockUsers.find(user => user.id === args.id),

  /**
   * Recupera todas as transações associadas a um ID de usuário específico.
   * @param {Object} args - Os argumentos passados para a query.
   * @param {string} args.userId - O ID do usuário cujas transações devem ser recuperadas.
   * @returns {Array<Object>} Um array de objetos de transação.
   */
  transactions: (args) => mockTransactions.filter(tx => tx.userId === args.userId),

  /**
   * Cria um novo usuário.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.name - O nome do novo usuário.
   * @param {string} args.email - O email do novo usuário.
   * @throws {Error} Se o nome ou email estiverem faltando ou se o email for inválido.
   * @returns {Object} O objeto do usuário recém-criado.
   */
  createUser: (args) => {
    if (!args.name || !args.email) {
      throw new Error("Name and email are required.");
    }
    
    if (!EMAIL_REGEX.test(args.email)) {
      throw new Error("Invalid email format.");
    }
    
    // Calcula o próximo ID baseado no maior ID existente
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
   * Cria uma nova transação.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.userId - O ID do usuário associado à transação.
   * @param {string} args.description - Uma descrição da transação.
   * @param {number} args.amount - O valor da transação.
   * @throws {Error} Se campos obrigatórios estiverem faltando ou se o valor for inválido.
   * @returns {Object} O objeto da transação recém-criada.
   */
  createTransaction: (args) => {
    if (args.amount === undefined || args.amount === null || !args.userId || !args.description) {
      throw new Error("Missing fields.");
    }
    
    if (args.amount < 0) {
      throw new Error("Amount cannot be negative.");
    }
    
    // Calcula o próximo ID baseado no maior ID existente
    const maxId = mockTransactions.length > 0
      ? Math.max(...mockTransactions.map(t => parseInt(t.id.substring(1))))
      : 0;
    
    const newTransaction = {
      id: 't' + (maxId + 1),
      userId: args.userId,
      description: args.description,
      amount: args.amount,
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  /**
   * Atualiza as informações de um usuário existente.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.id - O ID do usuário a ser atualizado.
   * @param {string} [args.name] - O novo nome para o usuário.
   * @param {string} [args.email] - O novo email para o usuário.
   * @throws {Error} Se o usuário não for encontrado ou se o email for inválido.
   * @returns {Object} O objeto do usuário atualizado.
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
   * Atualiza uma transação existente.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.id - O ID da transação a ser atualizada.
   * @param {number} [args.amount] - O novo valor para a transação.
   * @param {string} [args.description] - A nova descrição para a transação.
   * @throws {Error} Se a transação não for encontrada ou se o valor for inválido.
   * @returns {Object} O objeto da transação atualizada.
   */
  updateTransaction: (args) => {
    const tx = mockTransactions.find(t => t.id === args.id);
    if (!tx) throw new Error("Transaction not found.");
    
    if (args.amount !== undefined && args.amount !== null) {
      if (args.amount < 0) {
        throw new Error("Amount cannot be negative.");
      }
      tx.amount = args.amount;
    }
    
    if (args.description) tx.description = args.description;
    return tx;
  },

  /**
   * Exclui um usuário pelo seu ID.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.id - O ID do usuário a ser excluído.
   * @throws {Error} Se o usuário não for encontrado.
   * @returns {Object} O objeto do usuário excluído.
   */
  deleteUser: (args) => {
    const index = mockUsers.findIndex(u => u.id === args.id);
    if (index === -1) throw new Error("User not found.");
    const [deletedUser] = mockUsers.splice(index, 1);
    return deletedUser;
  },

  /**
   * Exclui uma transação pelo seu ID.
   * @param {Object} args - Os argumentos passados para a mutation.
   * @param {string} args.id - O ID da transação a ser excluída.
   * @throws {Error} Se a transação não for encontrada.
   * @returns {Object} O objeto da transação excluída.
   */
  deleteTransaction: (args) => {
    const index = mockTransactions.findIndex(t => t.id === args.id);
    if (index === -1) throw new Error("Transaction not found.");
    const [deletedTx] = mockTransactions.splice(index, 1);
    return deletedTx;
  },
};

module.exports = { rootResolver };