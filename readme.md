# Relay Flow - Gerenciador de Usuários e Transações

> **Status do Projeto:** 🚀 Em Desenvolvimento

Este projeto consiste em uma aplicação Full Stack focada em performance e integridade de dados, implementando uma arquitetura robusta que conecta um backend **GraphQL** a um frontend **React** através do **Relay**.

O objetivo central é demonstrar a aplicação do padrão de *Data Colocation*, onde cada componente declara explicitamente suas dependências de dados, otimizando o fluxo de informações e eliminando problemas comuns como *over-fetching*.

---

## 🛠 Tecnologias Utilizadas

A stack tecnológica foi selecionada para garantir escalabilidade, tipagem forte e eficiência no tráfego de dados.

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express
*   **API:** `express-graphql`
*   **Linguagem de Consulta:** GraphQL

### Frontend
*   **Biblioteca:** React
*   **Gerenciamento de Dados:** Relay (`react-relay`, `relay-runtime`)
*   **Compilador:** `relay-compiler`
*   **Build Tool:** Craco (Custom React App Configuration) para injeção avançada de plugins Babel.

### Dados
*   **Persistência:** Mock Data (Estruturas em memória para simulação de banco de dados e foco na lógica de integração).

---

## 🚀 Instalação e Execução

O projeto opera com uma arquitetura cliente-servidor separada. Siga os passos abaixo para inicializar o ambiente.

### Pré-requisitos
*   Node.js (v14 ou superior)
*   npm ou yarn

### 1. Inicialização do Backend (API)

No diretório raiz do projeto:

```bash
# Instalar dependências
npm install

# Iniciar o servidor
node server.js
```
> O servidor estará ativo em: `http://localhost:4000/graphql`

### 2. Inicialização do Frontend

Em um novo terminal, navegue até o diretório do cliente:

```bash
cd frontend/client

# Instalar dependências
npm install

# Atualizar schema e compilar artefatos do Relay
# Este passo é crucial para gerar os tipos e fragmentos do Relay
npm run update-schema
npm run relay

# Iniciar a aplicação
npm start
```
> A aplicação estará acessível em: `http://localhost:3000`

---

## 🧠 Decisões Arquiteturais

### Por que GraphQL e Relay?
A escolha desta stack visa mitigar o *Over-fetching* e *Under-fetching* comuns em APIs REST. O **Relay** atua como um framework opinativo que impõe boas práticas, gerenciando automaticamente o cache, a consistência dos dados e os estados de carregamento (loading states), permitindo que o desenvolvimento foque na lógica de UI e não na infraestrutura de busca de dados.

### Configuração de Build (CRA + Relay)
O `create-react-app` nativo possui limitações quanto à configuração de plugins do Babel necessários para o Relay. Para contornar isso sem a necessidade de "ejetar" (`eject`) a aplicação, utilizou-se o **Craco**. Ele permite a injeção do `babel-plugin-relay` no pipeline de build de forma transparente e manutenível.

### Persistência de Dados
Para manter o foco na complexidade da integração Frontend-Backend e nas nuances do Relay, optou-se pelo uso de dados em memória (`mockUsers`, `mockTransactions`). Embora os dados sejam redefinidos ao reiniciar o servidor, esta abordagem permite a validação completa do fluxo CRUD (Create, Read, Update, Delete) sem a sobrecarga de configuração de um banco de dados externo.

---

## ✅ Funcionalidades

- [x] **Listagem (Query):** Visualização otimizada de Usuários e suas respectivas Transações.
- [x] **Criação (Mutation):** Cadastro de novos Usuários.
- [x] **Atualização (Mutation):** Edição de dados de Usuários existentes.
- [x] **Remoção (Mutation):** Exclusão de Usuários e Transações.