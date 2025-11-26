import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';

/**
 * Define a função de fetch usada pelo Relay para se comunicar com a API GraphQL.
 * 
 * @param {Object} params - Os parâmetros da query, incluindo o texto da query.
 * @param {Object} variables - As variáveis a serem passadas para a query.
 * @returns {Promise<Object>} A resposta JSON do servidor.
 * @throws {Error} Se houver erro de rede ou resposta inválida.
 */
const fetchRelay = async (params, variables) => {
  const API_URL = 'http://localhost:4000/graphql';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    
    // Verificar se há erros no GraphQL
    if (json.errors) {
      throw new Error(json.errors[0].message || 'GraphQL error');
    }
    
    return json;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

/**
 * Cria e configura o Relay Environment.
 * O environment agrupa a camada de rede e o store (cache).
 * 
 * @returns {Environment} Uma instância configurada do Relay Environment.
 */
function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
  });
}

/**
 * A instância singleton  do Relay Environment para ser usada em toda a aplicação.
 * @type {Environment}
 */
export const RelayEnvironment = createRelayEnvironment();