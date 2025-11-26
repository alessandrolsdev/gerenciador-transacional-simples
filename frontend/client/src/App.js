import React, { useState, Suspense } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import './App.css';

import TransactionListItem from './components/TransactionListItem';
import EditUserForm from './components/EditUserForm';

/**
 * Query GraphQL para buscar dados iniciais da aplicação.
 * Recupera o usuário atual e suas transações.
 */
const AppQuery = graphql`
  query AppQuery {
    user(id: "1") { id name email }
    transactions(userId: "1") { id amount description }
  }
`;

/**
 * Mutation GraphQL para criar um novo usuário.
 */
const CreateUserMutation = graphql`
  mutation AppCreateUserMutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) { id name email }
  }
`;

/**
 * Mutation GraphQL para criar uma nova transação.
 */
const CreateTransactionMutation = graphql`
  mutation AppCreateTransactionMutation($amount: Float!, $userId: ID!, $description: String!) {
    createTransaction(amount: $amount, userId: $userId, description: $description) { id amount description }
  }
`;

/**
 * Componente de conteúdo principal da aplicação.
 * Gerencia o estado local para formulários e manipula mutations GraphQL.
 */
function AppContent() {
  const data = useLazyLoadQuery(AppQuery, {});
  const [notification, setNotification] = useState(null);

  // Estado para formulários de criação
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxDesc, setNewTxDesc] = useState('');

  // Estado para o modal de Edição do Usuário
  const [isEditingUser, setIsEditingUser] = useState(false);

  // Hooks de mutation
  const [commitCreateUser, isCreatingUser] = useMutation(CreateUserMutation);
  const [commitCreateTx, isCreatingTx] = useMutation(CreateTransactionMutation);

  /**
   * Exibe uma notificação temporária para o usuário.
   * @param {string} message - A mensagem a ser exibida.
   * @param {string} [type='success'] - O tipo de notificação ('success' ou 'error').
   */
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  /**
   * Manipula o envio do formulário de Criar Usuário.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleCreateUser = (e) => {
    e.preventDefault();

    // Validação básica de nome
    if (createName.trim().length < 2) {
      showNotification("❌ Nome muito curto!", 'error');
      return;
    }

    commitCreateUser({
      variables: { name: createName, email: createEmail },
      onCompleted: () => {
        showNotification("✅ Usuário criado!");
        setCreateName(""); setCreateEmail("");
      },
      onError: (error) => {
        const message = error.message || "Erro ao criar!";
        showNotification(`❌ ${message}`, 'error');
      },
    });
  };

  /**
   * Manipula o envio do formulário de Criar Transação.
   * Atualiza o store local do Relay para refletir a nova transação imediatamente.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleCreateTransaction = (e) => {
    e.preventDefault();
    if (isCreatingTx) return;

    // Validação do valor
    const amount = parseFloat(newTxAmount);
    if (isNaN(amount)) {
      showNotification("❌ Valor inválido!", 'error');
      return;
    }

    if (amount < 0) {
      showNotification("❌ Valor não pode ser negativo!", 'error');
      return;
    }

    // Validação da descrição
    if (newTxDesc.trim().length < 3) {
      showNotification("❌ Descrição muito curta!", 'error');
      return;
    }

    commitCreateTx({
      variables: { amount, userId: data.user.id, description: newTxDesc },

      /**
       * Função updater para atualizar manualmente o store do Relay.
       * Anexa a nova transação à lista existente no cache.
       * @param {RecordSourceSelectorProxy} store - O proxy do store do Relay.
       */
      updater: (store) => {
        const userId = data.user.id;
        const userRecord = store.get(userId);
        const payload = store.getRootField('createTransaction');

        if (userRecord && payload) {
          const root = store.getRoot();
          const currentTransactions = root.getLinkedRecords('transactions', { userId });
          const newTransactions = [...(currentTransactions || []), payload];
          root.setLinkedRecords(newTransactions, 'transactions', { userId });
        }
      },

      onCompleted: () => {
        showNotification("✅ Transação salva!");
        setNewTxAmount(''); setNewTxDesc('');
      },
      onError: (error) => {
        const message = error.message || "Erro ao salvar transação!";
        showNotification(`❌ ${message}`, 'error');
      },
    });
  };

  // Verificação de segurança: garantir que o usuário existe
  if (!data || !data.user) {
    return (
      <div className="app-layout">
        <h1>Erro: Usuário não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Toast de Notificação */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>{notification.message}</div>
      )}

      {/* Seção de Cabeçalho */}
      <header className="main-header">

        {/* LADO ESQUERDO: LOGO DO APP */}
        <div className="brand-logo">
          <span className="logo-icon">💸</span>
          <h1>Relay Flow</h1>
        </div>

        {/* LADO DIREITO: PERFIL DO USUÁRIO */}
        <div className="user-profile-section">
          <span className="welcome-text">Olá, <strong>{data.user.name}</strong></span>
          <button className="edit-profile-btn" onClick={() => setIsEditingUser(true)} title="Editar Perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /> </svg>
          </button>
        </div>

      </header>

      {/* Modal de Edição de Usuário */}
      {isEditingUser && (
        <EditUserForm
          user={data.user}
          onClose={() => setIsEditingUser(false)}
          showNotification={showNotification}
        />
      )}

      <main className="main-content">
        {/* Lista de Transações */}
        <section>
          <h2>Your Transactions</h2>
          <div className="transactions-container">
            {data.transactions.map((tx) => (
              <TransactionListItem
                key={tx.id}
                tx={tx}
                showNotification={showNotification}
              />
            ))}
          </div>
        </section>

        {/* Formulários de Criação */}
        <section className="forms-container-row">
          <div className="form-card">
            <h3>+ Criar Transação</h3>
            <form onSubmit={handleCreateTransaction}>
              <div className="input-group-icon">
                <span className="input-icon">💲</span>
                <input
                  type="text"
                  placeholder="Descrição"
                  value={newTxDesc}
                  onChange={(e) => setNewTxDesc(e.target.value)}
                  disabled={isCreatingTx}
                  maxLength={100}
                  required
                />
              </div>
              <div className="input-group-icon">
                <span className="input-icon">💰</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Valor"
                  value={newTxAmount}
                  onChange={(e) => setNewTxAmount(e.target.value)}
                  disabled={isCreatingTx}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isCreatingTx}>Salvar</button>
            </form>
          </div>

          <div className="form-card">
            <h3>+ Criar Usuário (Teste)</h3>
            <form onSubmit={handleCreateUser}>
              <div className="input-group-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Nome"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  disabled={isCreatingUser}
                  maxLength={100}
                  required
                />
              </div>
              <div className="input-group-icon">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  disabled={isCreatingUser}
                  maxLength={100}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isCreatingUser}>Criar</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * Componente de nível superior que envolve o conteúdo em um limite de Suspense.
 */
export default function App() {
  return (
    <Suspense fallback={<div className="app-layout"><h1>Loading...</h1></div>}>
      <AppContent />
    </Suspense>
  );
}