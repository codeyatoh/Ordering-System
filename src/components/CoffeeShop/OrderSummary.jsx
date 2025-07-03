import React from 'react';
import ConfirmModal from '../Modal/confirmModal';
import { useConfirmModal } from '../../handlers/modalHandlers';

// This component shows the summary of the current order (total, type, actions)
function OrderSummary({ orderType, totalPrice, totalItems, onCancel, onDone, customerPayment }) {
  // Custom hook for handling the confirm modal (for checkout)
  const { showConfirm, handleProceed, handleCancel, handleConfirm } = useConfirmModal(onDone);

  return (
    // The summary box at the bottom or side of the page
    <div className="order-summary">
      <div className="order-info">
        {/* Shows if the order is dine-in or take-out */}
        <span>Order - {orderType === 'dine-in' ? 'Dine In' : 'Take Out'}</span>
      </div>
      <div className="order-total">
        {/* Shows the total price and number of items */}
        <span>Total: ₱{totalPrice.toFixed(2)} - {totalItems} Items</span>
      </div>
      <div className="order-actions">
        {/* Button to cancel the whole order */}
        <button className="cancel-btn" onClick={onCancel}>Cancel Order</button>
        {/* Button to proceed to checkout (shows confirm modal) */}
        <button className="done-btn" onClick={handleProceed} disabled={!customerPayment || Number(customerPayment) <= 0}>
          Complete Order
        </button>
      </div>
      {/* Modal to confirm checkout */}
      <ConfirmModal isOpen={showConfirm} onClose={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
}

export default OrderSummary; 