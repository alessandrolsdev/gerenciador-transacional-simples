import React, { useState } from 'react';
import { graphql, useMutation } from 'react-relay';

/**
 * Mutation GraphQL para atualizar uma transação existente.
 */
const UpdateTransactionMutation = graphql`
  mutation TransactionListItemUpdateMutation($id: ID!, $amount: Float, $description: String) {
    updateTransaction(id: $id, amount: $amount, description: $description) { id amount description }
  }
`;

/**
 * Mutation GraphQL para excluir uma transação.
 */
const DeleteTransactionMutation = graphql`
  mutation TransactionListItemDeleteMutation($id: ID!) {
    deleteTransaction(id: $id) { id }
  }
`;

/**
 * Componente que representa um item de transação único em uma lista.
 * Suporta edição inline e exclusão.
 * 
 * @param {Object} props - Props do componente.
 * @param {Object} props.tx - O objeto da transação a ser exibido.
 * @param {Function} props.showNotification - Callback para exibir notificações.
 */
export default function TransactionListItem({ tx, showNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(tx.amount);
  const [editDesc, setEditDesc] = useState(tx.description);

  const [commitUpdate, isUpdating] = useMutation(UpdateTransactionMutation);
  const [commitDelete] = useMutation(DeleteTransactionMutation);

  /**
   * Manipula a atualização da transação.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Validação do valor
    const amount = parseFloat(editAmount);
    if (isNaN(amount)) {
      showNotification("❌ Valor inválido!", "error");
      return;
    }
    
    if (amount < 0) {
      showNotification("❌ Valor não pode ser negativo!", "error");
      return;
    }
    
    // Validação da descrição
    if (editDesc.trim().length < 3) {
      showNotification("❌ Descrição muito curta!", "error");
      return;
    }
    
    commitUpdate({
      variables: { id: tx.id, amount, description: editDesc },
      onCompleted: () => {
        showNotification("✅ Transação atualizada!");
        setIsEditing(false);
      },
      onError: (error) => {
        const message = error.message || "Erro ao atualizar!";
        showNotification(`❌ ${message}`, "error");
      },
    });
  };

  /**
   * Manipula a exclusão da transação.
   * Solicita confirmação antes de excluir.
   */
  const handleDelete = () => {
    if (!window.confirm("Confirmar exclusão?")) return;
    commitDelete({
      variables: { id: tx.id },
      onCompleted: () => showNotification("🗑️ Transação deletada!"),
      onError: (error) => {
        const message = error.message || "Erro ao deletar!";
        showNotification(`❌ ${message}`, "error");
      },
      /**
       * Updater para remover manualmente o registro excluído do store.
       * @param {RecordSourceSelectorProxy} store - O proxy do store do Relay.
       */
      updater: (store) => {
         const record = store.get(tx.id);
         if (record) store.delete(tx.id);
      }
    });
  };

  // Modo de Edição (Formulário Inline)
  if (isEditing) {
    return (
      <li className="transaction-item-card editing">
        <form onSubmit={handleUpdate} className="inline-edit-form" style={{width: '100%', display: 'flex', gap: '10px'}}>
          <input 
            type="text" 
            value={editDesc} 
            onChange={(e) => setEditDesc(e.target.value)} 
            disabled={isUpdating} 
            maxLength={100}
            style={{flex: 1}} 
          />
          <input 
            type="number" 
            step="0.01" 
            min="0"
            value={editAmount} 
            onChange={(e) => setEditAmount(e.target.value)} 
            disabled={isUpdating} 
            style={{width: '100px'}} 
          />
          <button type="submit" className="icon-btn save-btn">✔️</button>
          <button type="button" className="icon-btn cancel-icon-btn" onClick={() => setIsEditing(false)}>❌</button>
        </form>
      </li>
    );
  }

  // Modo de Visualização (Card)
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