/**
 * Expressão regular para validação de formato de e-mail.
 * Segue o padrão comum: usuario@dominio.tld
 * @constant {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida se um e-mail possui um formato correto.
 * @param {string} email - O endereço de e-mail a ser validado.
 * @returns {boolean} Retorna verdadeiro se o formato for válido, falso caso contrário.
 */
function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
}

/**
 * Verifica se um valor é não anulo e não indefinido.
 * Útil para campos obrigatórios.
 * @param {any} value - O valor a ser verificado.
 * @returns {boolean} Retorna verdadeiro se o valor existir.
 */
function isRequired(value) {
    return value !== null && value !== undefined && value !== '';
}

module.exports = {
    EMAIL_REGEX,
    isValidEmail,
    isRequired
};
