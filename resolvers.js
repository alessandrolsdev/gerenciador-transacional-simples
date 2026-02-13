/**
 * Resolver raiz para operações GraphQL.
 * Implementa a lógica de negócios para consultas e modificações de dados.
 */
const { mockUsers, mockTransactions } = require('./mockDb');
const { isValidEmail, isRequired } = require('./utils/validators');

const rootResolver = {
  /**
   * Recupera um usuário específico pelo ID.
   * @param {Object} args - Argumentos da consulta.
   * @param {string} args.id - O ID do usuário.
   * @returns {Object|undefined} O objeto do usuário ou undefined se não encontrado.
   */
  user: (args) => mockUsers.find(user => user.id === args.id),

  /**
   * Recupera todas as transações de um usuário específico, ordenadas por data (mais recente primeiro).
   * @param {Object} args - Argumentos da consulta.
   * @param {string} args.userId - O ID do usuário.
   * @returns {Array<Object>} Lista de transações do usuário.
   */
  transactions: (args) => {
    return mockTransactions
      .filter(tx => tx.userId === args.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Calcula o resumo financeiro para um usuário.
   * Inclui total de receitas, despesas e o saldo final.
   * @param {Object} args - Argumentos da consulta.
   * @param {string} args.userId - O ID do usuário.
   * @returns {Object} Objeto contendo totalIncome, totalExpense e balance.
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
   * Cria um novo usuário no sistema.
   * @param {Object} args - Argumentos da mutação.
   * @param {string} args.name - Nome do usuário.
   * @param {string} args.email - E-mail do usuário.
   * @throws {Error} Se nome ou e-mail estiverem ausentes ou se o formato do e-mail for inválido.
   * @returns {Object} O novo objeto de usuário criado.
   */
  createUser: (args) => {
    if (!isRequired(args.name) || !isRequired(args.email)) {
      throw new Error("Nome e e-mail são obrigatórios.");
    }

    if (!isValidEmail(args.email)) {
      throw new Error("Formato de e-mail inválido.");
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
   * Cria uma nova transação com tipo, categoria e carimbo de data/hora automático.
   * @param {Object} args - Argumentos da mutação.
   * @param {number} args.amount - Valor da transação.
   * @param {string} args.userId - ID do usuário associado.
   * @param {string} args.description - Descrição da transação.
   * @param {string} args.type - Tipo da transação ('INCOME' ou 'EXPENSE').
   * @param {string} args.category - Categoria da transação.
   * @throws {Error} Se campos obrigatórios estiverem faltando, valor for negativo ou tipo inválido.
   * @returns {Object} A nova transação criada.
   */
  createTransaction: (args) => {
    if (
      args.amount === undefined ||
      !args.userId ||
      !args.description ||
      !args.type ||
      !args.category
    ) {
      throw new Error("Campos obrigatórios ausentes.");
    }

    if (args.amount < 0) {
      throw new Error("O valor não pode ser negativo.");
    }

    if (!['INCOME', 'EXPENSE'].includes(args.type)) {
      throw new Error("Tipo de transação inválido. Deve ser 'INCOME' ou 'EXPENSE'.");
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
   * Atualiza as informações de um usuário existente.
   * @param {Object} args - Argumentos da mutação.
   * @param {string} args.id - ID do usuário a ser atualizado.
   * @param {string} [args.name] - Novo nome (opcional).
   * @param {string} [args.email] - Novo e-mail (opcional).
   * @throws {Error} Se o usuário não for encontrado ou e-mail for inválido.
   * @returns {Object} O objeto do usuário atualizado.
   */
  updateUser: (args) => {
    const user = mockUsers.find(u => u.id === args.id);
    if (!user) throw new Error("Usuário não encontrado.");

    if (args.email && !isValidEmail(args.email)) {
      throw new Error("Formato de e-mail inválido.");
    }

    if (args.name) user.name = args.name;
    if (args.email) user.email = args.email;
    return user;
  },

  /**
   * Atualiza uma transação existente.
   * @param {Object} args - Argumentos da mutação.
   * @param {string} args.id - ID da transação.
   * @param {number} [args.amount] - Novo valor.
   * @param {string} [args.description] - Nova descrição.
   * @param {string} [args.type] - Novo tipo.
   * @param {string} [args.category] - Nova categoria.
   * @throws {Error} Se a transação não for encontrada ou o valor for negativo.
   * @returns {Object} A transação atualizada.
   */
  updateTransaction: (args) => {
    const tx = mockTransactions.find(t => t.id === args.id);
    if (!tx) throw new Error("Transação não encontrada.");

    if (args.amount !== undefined && args.amount !== null) {
      if (args.amount < 0) throw new Error("O valor não pode ser negativo.");
      tx.amount = args.amount;
    }

    if (args.description) tx.description = args.description;
    if (args.type) tx.type = args.type;
    if (args.category) tx.category = args.category;

    return tx;
  },

  /**
   * Remove um usuário do sistema.
   * @param {Object} args - Argumentos da mutação.
   * @param {string} args.id - ID do usuário a ser removido.
   * @throws {Error} Se o usuário não for encontrado.
   * @returns {Object} O objeto do usuário removido.
   */
  deleteUser: (args) => {
    const index = mockUsers.findIndex(u => u.id === args.id);
    if (index === -1) throw new Error("Usuário não encontrado.");
    const [deletedUser] = mockUsers.splice(index, 1);
    return deletedUser;
  },

  /**
   * Remove uma transação do sistema.
   * @param {Object} args - Argumentos da mutação.
   * @param {string} args.id - ID da transação a ser removida.
   * @throws {Error} Se a transação não for encontrada.
   * @returns {Object} O objeto da transação removida.
   */
  deleteTransaction: (args) => {
    const index = mockTransactions.findIndex(t => t.id === args.id);
    if (index === -1) throw new Error("Transação não encontrada.");
    const [deletedTx] = mockTransactions.splice(index, 1);
    return deletedTx;
  },
};

module.exports = { rootResolver };
