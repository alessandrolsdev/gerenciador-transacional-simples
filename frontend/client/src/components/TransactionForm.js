import React, { useState } from 'react';
import { useMutation, graphql } from 'react-relay';
import clsx from 'clsx';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

/**
 * Mutação GraphQL para criar uma nova transação.
 * @constant {Object}
 */
const CreateTransactionMutation = graphql`
  mutation TransactionFormCreateTransactionMutation($amount: Float!, $userId: ID!, $description: String!, $type: String!, $category: String!) {
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

/**
 * Componente de formulário para criar novas transações.
 * Gerencia o estado local do formulário e submete a mutação para o backend via Relay.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.userId - ID do usuário atual para associar a transação.
 * @returns {JSX.Element} Elemento JSX do formulário.
 */
export function TransactionForm({ userId }) {
    // Estado local do formulário
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('EXPENSE'); // 'INCOME' ou 'EXPENSE'
    const [category, setCategory] = useState('');

    // Hook de mutação Relay
    const [commitCreateTx, isCreating] = useMutation(CreateTransactionMutation);

    /**
     * Categorias disponíveis baseadas no tipo de transação selecionado.
     * @type {string[]}
     */
    const categories = type === 'EXPENSE'
        ? ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Outros']
        : ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Outros'];

    /**
     * Manipula o envio do formulário.
     * Valida os campos e executa a mutação GraphQL.
     * @param {React.FormEvent} e - Evento de submissão do formulário.
     */
    const handleCreate = (e) => {
        e.preventDefault();
        if (!description || !amount || !category) return;

        commitCreateTx({
            variables: {
                userId: userId,
                description,
                amount: parseFloat(amount),
                type,
                category
            },
            onCompleted: () => {
                // Limpa o formulário após o sucesso
                setDescription('');
                setAmount('');
                setCategory('');

                // Em um cenário ideal, o Relay atualizaria automaticamente a lista via updater ou connection handler.
                // Como este é um exemplo simplificado, podemos recarregar para ver a lista atualizada ou confiar no cache store-and-network.
                // window.location.reload(); 
            },
            onError: (err) => {
                console.error("Erro ao criar transação:", err);
                alert("Erro ao criar transação. Verifique o console.");
            }
        });
    };

    return (
        <Card className="border-indigo-100 shadow-lg shadow-indigo-50/50">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                ✨ Nova Transação
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
                {/* Seletor de Tipo (Receita / Despesa) */}
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
    );
}
