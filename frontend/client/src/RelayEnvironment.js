import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import { graphql, buildSchema } from 'graphql';
import { schemaString } from './mock-server/schema';
import { rootResolver } from './mock-server/resolvers';

// Compila o schema para execução local
const localSchema = buildSchema(schemaString);

/**
 * Executa a query localmente no navegador usando o pacote 'graphql'.
 */
const executeLocalQuery = async (params, variables) => {
  console.log('[Mock Server] Executing query:', params.name);

  try {
    const result = await graphql({
      schema: localSchema,
      source: params.text,
      rootValue: rootResolver,
      variableValues: variables,
    });

    return result;
  } catch (error) {
    console.error('[Mock Server] Error:', error);
    throw error;
  }
};

/**
 * Define a função de fetch usada pelo Relay.
 * Alterna entre execução local e remota baseada na variável de ambiente.
 */
const fetchRelay = async (params, variables) => {
  // FORÇAR MOCK MODE: Para garantir que funcione imediatamente sem depender de .env
  const useMock = true; // process.env.REACT_APP_USE_MOCK === 'true';

  console.log('[RelayNetwork] Mode:', useMock ? 'MOCK (Local)' : 'NETWORK (API)');

  if (useMock) {
    // Simula um pequeno delay de rede para realismo
    await new Promise(resolve => setTimeout(resolve, 500));
    return executeLocalQuery(params, variables);
  }

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

    if (json.errors) {
      throw new Error(json.errors[0].message || 'GraphQL error');
    }

    return json;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();