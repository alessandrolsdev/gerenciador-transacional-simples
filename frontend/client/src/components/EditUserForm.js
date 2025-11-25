// src/components/EditUserForm.js
import React, { useState } from 'react';
import { graphql, useMutation } from 'react-relay';

const UpdateUserMutation = graphql`
  mutation EditUserFormUpdateMutation($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) { id name email }
  }
`;

export default function EditUserForm({ user, onClose, showNotification }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [commitUpdate, isUpdating] = useMutation(UpdateUserMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    commitUpdate({
      variables: { id: user.id, name, email },
      onCompleted: () => {
        showNotification("✅ Perfil atualizado!");
        onClose(); // Fecha o modal
      },
      onError: () => showNotification("❌ Erro ao atualizar!", "error"),
    });
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="form-card modal-content">
        <h3>Editando Perfil</h3>
        <div className="input-group-icon">
          <span className="input-icon">👤</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isUpdating} />
        </div>
        <div className="input-group-icon">
          <span className="input-icon">✉️</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isUpdating} />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={isUpdating}>Salvar</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}