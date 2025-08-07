import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this task?</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
