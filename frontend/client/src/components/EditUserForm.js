import React, { useState } from 'react';
import { graphql, useMutation } from 'react-relay';

/**
 * Mutation GraphQL para atualizar detalhes do usuário.
 */
const UpdateUserMutation = graphql`
  mutation EditUserFormUpdateMutation($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) { id name email }
  }
`;

/**
 * Componente para editar informações do perfil do usuário.
 * Exibe um formulário modal com campos de nome e email.
 * 
 * @param {Object} props - Props do componente.
 * @param {Object} props.user - O objeto do usuário a ser editado.
 * @param {Function} props.onClose - Callback para fechar o modal.
 * @param {Function} props.showNotification - Callback para exibir notificações.
 */
export default function EditUserForm({ user, onClose, showNotification }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [commitUpdate, isUpdating] = useMutation(UpdateUserMutation);

  /**
   * Manipula o envio do formulário para atualizar o usuário.
   * @param {Event} e - O evento de envio do formulário.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação do nome
    if (name.trim().length < 2) {
      showNotification("❌ Nome muito curto!", "error");
      return;
    }
    
    commitUpdate({
      variables: { id: user.id, name, email },
      onCompleted: () => {
        showNotification("✅ Perfil atualizado!");
        onClose();
      },
      onError: (error) => {
        const message = error.message || "Erro ao atualizar!";
        showNotification(`❌ ${message}`, "error");
      },
    });
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="form-card modal-content">
        <h3>Editando Perfil</h3>
        <div className="input-group-icon">
          <span className="input-icon">👤</span>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            disabled={isUpdating}
            maxLength={100}
            required 
          />
        </div>
        <div className="input-group-icon">
          <span className="input-icon">✉️</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isUpdating}
            maxLength={100}
            required 
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={isUpdating}>Salvar</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}