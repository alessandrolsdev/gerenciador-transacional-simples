import React, { Suspense } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { TransactionList } from './components/TransactionList';
import { Button } from './components/ui/Button';
import { TransactionForm } from './components/TransactionForm';
import './App.css';

// --- Definições GraphQL ---

/**
 * Query principal da aplicação.
 * Busca dados do usuário, resumo financeiro e lista de transações atual.
 * @constant {Object}
 */
const AppQuery = graphql`
  query AppQuery {
    user(id: "1") { id name email }
    summary(userId: "1") { totalIncome totalExpense balance }
    transactions(userId: "1") {
      id
      amount
      description
      type
      category
      createdAt
    }
  }
`;

/**
 * Mutação para deletar uma transação.
 * @constant {Object}
 */
const DeleteTransactionMutation = graphql`
  mutation AppDeleteTransactionMutation($id: ID!) {
    deleteTransaction(id: $id) { id }
  }
`;

// --- Componente Principal ---

/**
 * Componente que renderiza o conteúdo principal da aplicação.
 * Utiliza o hook useLazyLoadQuery para buscar dados do servidor GraphQL.
 * @returns {JSX.Element} A interface principal da aplicação.
 */
function AppContent() {
  // Busca os dados iniciais. A política 'store-and-network' tenta usar o cache mas também atualiza em segundo plano.
  const data = useLazyLoadQuery(AppQuery, {}, { fetchPolicy: 'store-and-network' });

  // Hook de mutação para deletar transações
  const [commitDeleteTx] = useMutation(DeleteTransactionMutation);

  /**
   * Manipula a exclusão de uma transação.
   * Solicita confirmação do usuário antes de proceder.
   * 
   * @param {string} id - O ID da transação a ser excluída.
   */
  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) return;

    commitDeleteTx({
      variables: { id },
      onCompleted: () => {
        // A atualização da UI é gerenciada automaticamente se as chaves do cache forem manipuladas corretamente.
        // Para simplicidade, o reload pode ser usado como fallback em protótipos, 
        // mas idealmente usaríamos o updater do Relay para remover o item da lista localmente.
        window.location.reload();
      },
      updater: (store) => {
        // Exemplo de atualização otimista/manual do store do Relay
        const root = store.getRoot();
        const transactions = root.getLinkedRecords('transactions', { userId: data.user.id });

        if (transactions) {
          // Filtra a transação removida da lista local para atualização imediata da UI sem refresh
          const newTransactions = transactions.filter(t => t.getDataID() !== id);
          // Nota: A lógica completa de atualização do cache pode ser complexa dependendo da configuração de conexões do Relay.
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Header user={data.user} />

        <SummaryCards summary={data.summary} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Conteúdo Principal: Lista de Transações */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                📜 Transações Recentes
              </h2>
              <Button variant="ghost" onClick={() => window.location.reload()}>Atualizar</Button>
            </div>

            <TransactionList
              transactions={data.transactions}
              onDelete={handleDelete}
              onEdit={(tx) => { console.log('Editar', tx) }}
            />
          </div>

          {/* Barra Lateral: Adicionar Transação */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6">
              <TransactionForm userId={data.user.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/**
 * Componente Raiz da Aplicação.
 * Envolve o conteúdo principal com Suspense para gerenciar o estado de carregamento assíncrono.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
