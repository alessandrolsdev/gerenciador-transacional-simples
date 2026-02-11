# Gerenciador Transacional Simples (Modernized)

Um gerenciador financeiro minimalista e de alta performance, construído com tecnologias modernas.

## 🚀 Tecnologias

### Frontend
- **React**: Biblioteca de UI.
- **Relay**: Cliente GraphQL poderoso para gerenciamento de dados e cache.
- **Tailwind CSS**: Framework de estilização utilitária para design rápido e responsivo.
- **Framer Motion**: Biblioteca de animações para transições suaves.
- **Lucide React**: Ícones SVG limpos e consistentes.

### Backend
- **Node.js & Express**: Servidor API.
- **GraphQL**: Linguagem de consulta para APIs.
- **In-Memory Database**: Simulação de banco de dados para simplicidade e zero config.

## 🛠️ Como Iniciar

### Pré-requisitos
- Node.js instalado (v16+).

### Instalação

1.  **Backend**:
    ```bash
    cd gerenciador-transacional-simples
    npm install
    npm start
    ```
    O servidor rodará em `http://localhost:4000/graphql`.

2.  **Frontend**:
    Em outro terminal:
    ```bash
    cd gerenciador-transacional-simples/frontend/client
    npm install
    npm start
    ```
    A aplicação abrirá em `http://localhost:3000`.

## 🏗️ Arquitetura

O projeto segue padrões seniores de separação de responsabilidades e clean code.

### Frontend (`frontend/client/src`)
- **`components/ui`**: Componentes base reutilizáveis (Card, Button, Input) sem lógica de negócio.
- **`components`**: Componentes de domínio (Header, TransactionList, SummaryCards) que compõem a UI.
- **`utils`**: Funções utilitárias puras (formatação de moeda e datas).
- **`App.js`**: Componente "Screen" principal que gerencia o estado da página e conecta com o Relay/GraphQL.

### Backend (`/`)
- **`schema.js`**: Definição tipada da API GraphQL.
- **`resolvers.js`**: Lógica de negócio e acesso a dados, separados da definição da API.
- **`mockDb.js`**: Camada de dados simulada.

## ✨ Funcionalidades
- Dashboard financeiro com Resumo (Receitas, Despesas, Saldo).
- Listagem de transações ordenadas por data.
- Adição rápida de Receitas e Despesas com categorização.
- Design responsivo e animado.

## 🚀 Deploy no Vercel (Full Stack)

O projeto está configurado para deploy "monorepo" no Vercel (Frontend + Backend juntos).

1.  **Vercel Project**: Importe o repositório raiz.
2.  **Build Settings**: Deixe as configurações padrão (o `vercel.json` cuidará de tudo).
    *   Arquitetura: O backend roda como Serverless Function em `/graphql`.
    *   Frontend: Arquivos estáticos servidos na raiz `/`.
3.  **Environment Variables**:
    *   **REACT_APP_USE_MOCK**: Defina como `false` (ou remova) para usar o backend real.

## 📝 Comandos Úteis

- `npm start` (Raiz): Inicia o Backend desenvolviment (porta 4000).
- `npm start` (Frontend): Inicia o Frontend (porta 3000, com proxy).
- `npm run relay`: Regenera os artefatos do Relay após mudanças no schema.

## ⚠️ Solução de Problemas no Vercel

Se o deploy falhar com erro `command not found: react-scripts`, é porque o Vercel tentou usar o comando padrão do Create React App em vez do `craco`.

**Correção:**
1.  Vá em **Settings** > **Build & Development**.
2.  No campo **Build Command**, ative **OVERRIDE**.
3.  Digite: `npm run build`
4.  Salve e redeploy.