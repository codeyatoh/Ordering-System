import React from 'react';
import './adminModal.css';

function MenuAddModal({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;
  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h2 className="admin-modal-title">Add Menu</h2>
        <form className="admin-modal-form">
          <div className="admin-modal-form-row">
            <div className="admin-modal-form-group">
              <label>Product Name *</label>
              <input type="text" className="admin-modal-input" defaultValue="" />
            </div>
            <div className="admin-modal-form-group">
              <label>Price *</label>
              <input type="number" className="admin-modal-input" defaultValue="" />
            </div>
          </div>
          <div className="admin-modal-form-row">
            <div className="admin-modal-form-group">
              <label>Category *</label>
              <select className="admin-modal-input" defaultValue="Coffee">
                <option value="Coffee">Coffee</option>
                <option value="Bread">Bread</option>
                <option value="Milktea">Milktea</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="admin-modal-form-group">
              <label>Availability *</label>
              <select className="admin-modal-input" defaultValue="Active">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="admin-modal-form-row">
            <div className="admin-modal-form-group">
              <label>Images *</label>
              <input type="file" className="admin-modal-input" style={{ padding: 0 }} />
            </div>
            <div className="admin-modal-form-group"></div>
          </div>
          <div className="admin-modal-actions">
            <button type="button" className="admin-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-modal-update-btn">Add Menu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuAddModal;
