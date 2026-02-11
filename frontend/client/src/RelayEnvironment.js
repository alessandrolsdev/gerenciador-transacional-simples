import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

/**
 * Define a função de fetch usada pelo Relay.
 * Em produção (Vercel), a API está no mesmo domínio em /graphql.
 * Em desenvolvimento, o proxy do package.json redireciona para localhost:4000.
 */
const fetchRelay = async (params, variables) => {
  const API_URL = '/graphql';

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