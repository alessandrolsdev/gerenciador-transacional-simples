// src/components/TransactionListItem.js
import React, { useState } from 'react';
import { graphql, useMutation } from 'react-relay';

const UpdateTransactionMutation = graphql`
  mutation TransactionListItemUpdateMutation($id: ID!, $amount: Float, $description: String) {
    updateTransaction(id: $id, amount: $amount, description: $description) { id amount description }
  }
`;

const DeleteTransactionMutation = graphql`
  mutation TransactionListItemDeleteMutation($id: ID!) {
    deleteTransaction(id: $id) { id }
  }
`;

export default function TransactionListItem({ tx, showNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(tx.amount);
  const [editDesc, setEditDesc] = useState(tx.description);

  const [commitUpdate, isUpdating] = useMutation(UpdateTransactionMutation);
  const [commitDelete] = useMutation(DeleteTransactionMutation);

  const handleUpdate = (e) => {
    e.preventDefault();
    commitUpdate({
      variables: { id: tx.id, amount: parseFloat(editAmount), description: editDesc },
      onCompleted: () => {
        showNotification("✅ Transação atualizada!");
        setIsEditing(false);
      },
      onError: () => showNotification("❌ Erro ao atualizar!", "error"),
    });
  };

  const handleDelete = () => {
    if (!window.confirm("Confirmar exclusão?")) return;
    commitDelete({
      variables: { id: tx.id },
      onCompleted: () => showNotification("🗑️ Transação deletada!"),
      onError: () => showNotification("❌ Erro ao deletar!", "error"),
      // O Relay geralmente remove automaticamente se o ID retornar, 
      // mas o updater no pai é a garantia total.
      updater: (store) => {
         const record = store.get(tx.id);
         if (record) store.delete(tx.id);
      }
    });
  };

  // MODO EDIÇÃO (Formulário Inline)
  if (isEditing) {
    return (
      <li className="transaction-item-card editing">
        <form onSubmit={handleUpdate} className="inline-edit-form" style={{width: '100%', display: 'flex', gap: '10px'}}>
          <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} disabled={isUpdating} style={{flex: 1}} />
          <input type="number" step="0.01" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} disabled={isUpdating} style={{width: '100px'}} />
          <button type="submit" className="icon-btn save-btn">✔️</button>
          <button type="button" className="icon-btn cancel-icon-btn" onClick={() => setIsEditing(false)}>❌</button>
        </form>
      </li>
    );
  }

  // MODO VISUALIZAÇÃO (Card Bonito)
  return (
    <li className="transaction-item-card">
      <div className="transaction-text">
        <span>{tx.description}</span>
        <span className="transaction-amount">R$ {tx.amount.toFixed(2)}</span>
      </div>
      
      <div className="Tx-Actions">
        <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)} title="Editar">
            ✏️
        </button>
        <button className="icon-btn delete-btn" onClick={handleDelete} title="Excluir">
            🗑️
        </button>
      </div>
    </li>
  );
}