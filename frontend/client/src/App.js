import React, { useState, Suspense } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { Toaster, toast } from 'react-hot-toast'; // Using standard alert for now if library not present, but let's stick to simple window.alert or custom toast
import clsx from 'clsx';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { TransactionList } from './components/TransactionList';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Card } from './components/ui/Card';
import './App.css'; // Global styles (Tailwind directives)

// --- GraphQL Definitions ---

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

const CreateTransactionMutation = graphql`
  mutation AppCreateTransactionMutation($amount: Float!, $userId: ID!, $description: String!, $type: String!, $category: String!) {
    createTransaction(amount: $amount, userId: $userId, description: $description, type: $type, category: $category) {
      id
      amount
      description
      type
      category
      createdAt
    }
  }
`;

const DeleteTransactionMutation = graphql`
  mutation AppDeleteTransactionMutation($id: ID!) {
    deleteTransaction(id: $id) { id }
  }
`;

// --- Main Component ---

function AppContent() {
  const data = useLazyLoadQuery(AppQuery, {}, { fetchPolicy: 'store-and-network' });

  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE'); // INCOME or EXPENSE
  const [category, setCategory] = useState('');

  // Mutations
  const [commitCreateTx, isCreating] = useMutation(CreateTransactionMutation);
  const [commitDeleteTx] = useMutation(DeleteTransactionMutation);

  // Handlers
  const handleCreate = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    commitCreateTx({
      variables: {
        userId: data.user.id,
        description,
        amount: parseFloat(amount),
        type,
        category
      },
      updater: (store) => {
        // In a real relay app with connections, we'd use connection handler.
        // For this simple list, we invalidate or manually update.
        // Simplified: The list will refresh if we invalidate or manually append.
        // Given the simplicity, we might rely on refetch or simple optimistic updates.
        // Let's try standard invalidation for simplicity in this demo.
        const root = store.getRoot();
        // Basic cache update logic or just rely on network refetch for summary update
      },
      onCompleted: () => {
        setDescription('');
        setAmount('');
        setCategory('');
        // window.location.reload(); // Simple way to refresh summary for this demo without complex cache updater logic for summary
        // Proper way: Optimistic update or refetch query.
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza?')) return;
    commitDeleteTx({
      variables: { id },
      onCompleted: () => {
        // window.location.reload();
      },
      updater: (store) => {
        const root = store.getRoot();
        const transactions = root.getLinkedRecords('transactions', { userId: data.user.id });
        if (transactions) {
          const newTransactions = transactions.filter(t => t.getDataID() !== id);
          // logic to remove from list...
          // Actually, standard Relay handling of delete by ID often works if configured,
          // but `transactions` is a simple list.
          store.getRoot().setLinkedRecords(transactions.filter(r => r.getDataID() !== store.get(id)?.getDataID()), 'transactions', { userId: data.user.id })
        }
      }
    });
  };

  const categories = type === 'EXPENSE'
    ? ['Food', 'Transport', 'Entertainment', 'Health', 'Education', 'Other']
    : ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Header user={data.user} />

        <SummaryCards summary={data.summary} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content: Transactions */}
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
              onEdit={(tx) => { console.log('Edit', tx) }}
            />
          </div>

          {/* Sidebar: Add Transaction */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6">
              <Card className="border-indigo-100 shadow-lg shadow-indigo-50/50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  ✨ Nova Transação
                </h3>

                <form onSubmit={handleCreate} className="space-y-4">

                  {/* Type Selector */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setType('INCOME')}
                      className={clsx(
                        "py-2 rounded-lg text-sm font-medium transition-all",
                        type === 'INCOME' ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Receita
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('EXPENSE')}
                      className={clsx(
                        "py-2 rounded-lg text-sm font-medium transition-all",
                        type === 'EXPENSE' ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Despesa
                    </button>
                  </div>

                  <Input
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />

                  <Input
                    type="number"
                    placeholder="Valor (R$)"
                    step="0.01"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                  />

                  <div className="relative">
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white p-3 text-sm appearance-none outline-none focus:ring-2 focus:ring-indigo-500/20"
                      required
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-3 text-base" disabled={isCreating}>
                    {isCreating ? 'Salvando...' : 'Adicionar Transação'}
                  </Button>

                </form>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

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