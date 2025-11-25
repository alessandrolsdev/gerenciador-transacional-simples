import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';

/**
 * A "receita" do Fetch (Passo 6.2.1)
 *
 * Esta é a função que diz ao Relay COMO falar com sua API.
 * É o "telefone" que o Relay vai usar toda vez.
 */
const fetchRelay: FetchFunction = async (params, variables) => {
  
  // 1. Onde ligar: O seu servidor que está rodando.
  const API_URL = 'http://localhost:4000/graphql';

  // 2. O que dizer: Usar o 'fetch()' que já discutimos.
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // 3. O Pedido:
    //    params.text é o texto da sua Query/Mutation
    //    variables são os dados (ex: { id: "1" })
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // 4. A Resposta: Desempacotar a comida (o JSON)
  return response.json();
};

/**
 * O "Motor" do Relay (Passo 6.2)
 *
 * Aqui nós juntamos as peças.
 */
function createRelayEnvironment() {
  return new Environment({
    // 1. A Rede: "Relay, use esta 'receita' de fetch"
    network: Network.create(fetchRelay),
    
    // 2. O Cache: "Relay, guarde os dados que você buscar aqui"
    store: new Store(new RecordSource()),
  });
}

// 3. Exporta o motor pronto para ser usado no app
export const RelayEnvironment = createRelayEnvironment();

// export default não é padrão aqui, nomeado é melhor
// export default createRelayEnvironment();