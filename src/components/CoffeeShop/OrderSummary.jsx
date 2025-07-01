import React from 'react';

function OrderSummary({ orderType, totalPrice, totalItems, onCancel, onDone }) {
  return (
    <div className="order-summary">
      <div className="order-info">
        <span>Order - {orderType === 'dine-in' ? 'Dine In' : 'Take Out'}</span>
      </div>
      <div className="order-total">
        <span>Total: ₱{totalPrice.toFixed(2)} - {totalItems} Items</span>
        <button className="view-order-btn">View Order &gt;&gt;</button>
      </div>
      <div className="order-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel Order</button>
        <button className="done-btn" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

export default OrderSummary; 