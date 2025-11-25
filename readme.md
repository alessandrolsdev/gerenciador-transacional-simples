CRUD Full-Stack com GraphQL e Relay
1. 🚀 Introdução
Este projeto consiste na implementação de uma aplicação CRUD (Create, Read, Update, Delete) para gerenciar Usuários e Transações. O objetivo principal foi demonstrar a proficiência na construção e consumo de uma API GraphQL utilizando a filosofia de Relay no frontend React.

2. 💻 Tecnologias Utilizadas
Camada	Tecnologia	Propósito
Backend	Node.js, Express, express-graphql, cors	Servidor da API e definição do Schema GraphQL.
Frontend	React, Relay (react-relay, relay-runtime)	Interface do usuário e framework avançado de busca de dados.
Build/Config	craco, babel-plugin-relay, relay-compiler	Compilação e tradução das queries Relay (Babel Transform).
Dados	Arrays JavaScript (Mock Data)	Simulação do banco de dados.

Exportar para as Planilhas

3. 🧠 Decisões Arquiteturais e Fundamentais (Passo 9.1)
A escolha deste stack foi estratégica para o desenvolvimento de aplicações modernas que exigem alta performance e manutenção facilitada, alinhando-se aos padrões de grandes empresas.

A. Escolha do GraphQL vs. REST
Motivo Principal: Evitar o Over-fetching. Diferente das APIs REST que retornam estruturas fixas, o GraphQL permite ao frontend solicitar exatamente os campos de dados necessários (ex: apenas o name e email), otimizando o consumo de banda e o tempo de carregamento no cliente.

B. Uso Estratégico do Relay no Frontend
Relay como Framework de Dados: Eu escolhi o Relay por ser um cliente GraphQL "opinioso" que impõe boas práticas. O Relay simplifica drasticamente a lógica de tratamento de estado no cliente.

Colocação de Dados (Fragments): A filosofia de definir os data requirements (Fragments) ao lado do componente React que os usa garante que o código seja modular e que o componente só consiga acessar os dados que explicitamente solicitou.

Performance: O Relay gerencia automaticamente o caching, o estado de loading (via Suspense) e a normalização dos dados, eliminando a necessidade de escrever código manual complexo (useEffect, useState) para esses fins.

4. 🚧 Trade-offs e Desafios (Passo 9.2)
Todo projeto envolve concessões. Abaixo estão os principais trade-offs e desafios superados:

Ponto	Descrição	O Trade-off
Persistência	Uso de Arrays Mockados (mockUsers, mockTransactions) no server.js.	Ganho: Foco total na lógica do GraphQL/Relay e na entrega do desafio em menos tempo. Perda: Os dados não persistem após o servidor ser reiniciado.
Setup do Build	Integração do Relay em um projeto create-react-app (react-scripts).	Desafio: O CRA esconde a configuração do Babel, o que é essencial para o Relay. Solução: Foi necessário utilizar a ferramenta Craco para "arrombar" a configuração e injetar o babel-plugin-relay. Isso adicionou complexidade de build, mas foi necessário para manter a base de código React/Relay.
Mutations	Implementação de lógica de atualização parcial no Resolver (if (args.name) { ... })	Detalhe: Em um sistema de produção, usaríamos Input Types no GraphQL para organizar melhor os campos de entrada, mas a abordagem atual é funcional e mais rápida para o mock.

Exportar para as Planilhas

5. 🛠️ Próximos Passos (A Serem Implementados)
O projeto está 100% funcional (CRUD completo). Para levá-lo à produção, eu faria o seguinte:

Substituir os arrays de mock por um banco de dados real (ex: PostgreSQL).

Adicionar testes unitários para os Resolvers do CRUD (Passo 10.2).

Refatorar o server.js dividindo Schema e Resolvers em arquivos separados (Passo 10.1).

Implementar a lógica de Update e Delete no frontend React, usando o hook useMutation (que já está configurado).