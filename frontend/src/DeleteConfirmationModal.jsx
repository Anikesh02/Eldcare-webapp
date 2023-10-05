import React from 'react';

const DeleteConfirmationModal = ({ show, contact, onCancel, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete {contact.name}?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={() => onDelete(contact)}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
