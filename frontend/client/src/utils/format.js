/**
 * Formata um valor numérico para moeda BRL.
 * @param {number} value - O valor a ser formatado.
 * @returns {string} String formatada em R$.
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

/**
 * Formata uma string de data ISO para o formato local.
 * @param {string} dateString - A data ISO.
 * @returns {string} Data formatada (dd/mm/aaaa).
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
};

/**
 * Agrupa transações por data.
 * @param {Array} transactions - Lista de transações.
 * @returns {Object} Transações agrupadas por data.
 */
export const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((groups, tx) => {
        const date = formatDate(tx.createdAt);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(tx);
        return groups;
    }, {});
};
