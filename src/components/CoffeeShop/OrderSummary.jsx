import React, { useState } from 'react';
import ConfirmModal from '../Modal/confirmModal';

function OrderSummary({ orderType, totalPrice, totalItems, onCancel, onDone }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProceed = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    setShowConfirm(false);
    onDone();
  };

  return (
    <div className="order-summary">
      <div className="order-info">
        <span>Order - {orderType === 'dine-in' ? 'Dine In' : 'Take Out'}</span>
      </div>
      <div className="order-total">
        <span>Total: ₱{totalPrice.toFixed(2)} - {totalItems} Items</span>
      </div>
      <div className="order-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel Order</button>
        <button className="done-btn" onClick={handleProceed}>Proceed to checkout</button>
      </div>
      <ConfirmModal isOpen={showConfirm} onClose={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
}

export default OrderSummary; 