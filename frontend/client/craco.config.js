/**
 * Configuração para CRACO (Create React App Configuration Override).
 * Este arquivo é usado para sobrescrever a configuração padrão do Create React App
 * sem precisar ejetar.
 * 
 * @module craco.config
 */
module.exports = {
  /**
   * Configurações de sobrescrita do Babel.
   * Adiciona o plugin 'relay' para habilitar a compilação GraphQL do Relay.
   */
  babel: {
    plugins: ['relay'], 
  },
};