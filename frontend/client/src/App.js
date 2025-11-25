import React, { useState, Suspense } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import './App.css';

// Importando nossos novos componentes
import TransactionListItem from './components/TransactionListItem';
import EditUserForm from './components/EditUserForm';

// Queries e Mutations de Criação continuam aqui (ou poderiam ir para outro arquivo)
const AppQuery = graphql`
  query AppQuery {
    user(id: "1") { id name email }
    transactions(userId: "1") { id amount description }
  }
`;

const CreateUserMutation = graphql`
  mutation AppCreateUserMutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) { id name email }
  }
`;
const CreateTransactionMutation = graphql`
  mutation AppCreateTransactionMutation($amount: Float!, $userId: ID!, $description: String!) {
    createTransaction(amount: $amount, userId: $userId, description: $description) { id amount description }
  }
`;

function AppContent() {
  const data = useLazyLoadQuery(AppQuery, {});
  const [notification, setNotification] = useState(null); 
  
  // Estados de Criação
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxDesc, setNewTxDesc] = useState('');
  
  // Estado do Modal de Edição
  const [isEditingUser, setIsEditingUser] = useState(false);

  // Mutations de Criação
  const [commitCreateUser, isCreatingUser] = useMutation(CreateUserMutation);
  const [commitCreateTx, isCreatingTx] = useMutation(CreateTransactionMutation);

  // Função UX Global
  const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000); 
  };

  // Handlers de Criação
  const handleCreateUser = (e) => {
    e.preventDefault();
    commitCreateUser({
      variables: { name: createName, email: createEmail },
      onCompleted: () => { 
        showNotification("✅ Usuário criado!");
        setCreateName(""); setCreateEmail("");
      },
      onError: () => showNotification("❌ Erro ao criar!", 'error'),
    });
  };

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    if (isCreatingTx) return;
    
    commitCreateTx({
        variables: { amount: parseFloat(newTxAmount), userId: data.user.id, description: newTxDesc },
        
        // --- O SEGREDO DA ATUALIZAÇÃO AUTOMÁTICA ---
        updater: (store) => {
            // 1. Pega o ID do usuário atual (dono da lista)
            const userId = data.user.id;
            // 2. Acessa o registro do usuário na "memória" do Relay
            const userRecord = store.get(userId);
            // 3. Pega a nova transação que acabou de ser criada (do payload da resposta)
            const payload = store.getRootField('createTransaction');
            
            // 4. Se tudo existir, adiciona na lista
            if (userRecord && payload) {
                // Pega a lista atual de transações do cache (root query)
                // Nota: Como sua query 'transactions' está na raiz e recebe argumento, pegamos da raiz
                const root = store.getRoot();
                const currentTransactions = root.getLinkedRecords('transactions', { userId });
                
                // Cria uma nova lista com a nova transação no final
                const newTransactions = [...(currentTransactions || []), payload];
                
                // Atualiza a lista na memória do Relay
                root.setLinkedRecords(newTransactions, 'transactions', { userId });
            }
        },
        // ---------------------------------------------

        onCompleted: () => { 
            showNotification("✅ Transação salva!"); 
            setNewTxAmount(''); setNewTxDesc(''); 
        },
        onError: () => showNotification("❌ Erro ao salvar transação!", 'error'),
    });
  };
  return (
    <div className="app-layout">
      {/* Notificação */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>{notification.message}</div>
      )}

      {/* Header */}
      <header className="main-header">
        <h1>Welcome, {data.user.name}!</h1>
        <button className="edit-profile-btn" onClick={() => setIsEditingUser(true)}>
            Editar Perfil
        </button>
      </header>

      {/* Modal (Componente Separado!) */}
      {isEditingUser && (
        <EditUserForm 
          user={data.user} 
          onClose={() => setIsEditingUser(false)} 
          showNotification={showNotification} 
        />
      )}

      <main className="main-content">
        {/* Lista (Componentes Separados!) */}
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
                        <input type="text" placeholder="Descrição" value={newTxDesc} onChange={(e) => setNewTxDesc(e.target.value)} disabled={isCreatingTx} required />
                    </div>
                    <div className="input-group-icon">
                        <span className="input-icon">💰</span>
                        <input type="number" step="0.01" placeholder="Valor" value={newTxAmount} onChange={(e) => setNewTxAmount(e.target.value)} disabled={isCreatingTx} required />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isCreatingTx}>Salvar</button>
                </form>
            </div>

            <div className="form-card">
                <h3>+ Criar Usuário (Teste)</h3>
                <form onSubmit={handleCreateUser}>
                    <div className="input-group-icon">
                        <span className="input-icon">👤</span>
                        <input type="text" placeholder="Nome" value={createName} onChange={(e) => setCreateName(e.target.value)} disabled={isCreatingUser} required />
                    </div>
                    <div className="input-group-icon">
                        <span className="input-icon">✉️</span>
                        <input type="email" placeholder="Email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} disabled={isCreatingUser} required />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isCreatingUser}>Criar</button>
                </form>
            </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
    return (
        <Suspense fallback={<div className="app-layout"><h1>Loading...</h1></div>}>
            <AppContent />
        </Suspense>
    );
}