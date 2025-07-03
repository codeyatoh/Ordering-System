import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import RemoveItemModal from '../Modal/removeItemModal';
import './CoffeeShop.css';

function groupCartItems(cart) {
  // Group by name for coffee, aggregate sizes and quantities
  const grouped = {};
  cart.forEach(item => {
    const key = item.name;
    if (!grouped[key]) {
      grouped[key] = { ...item, totalQty: 0, totalPrice: 0, sizes: {} };
    }
    grouped[key].totalQty += item.quantity;
    grouped[key].totalPrice += item.price * item.quantity;
    if (item.sizeLabel) {
      grouped[key].sizes[item.sizeLabel] = (grouped[key].sizes[item.sizeLabel] || 0) + item.quantity;
    }
  });
  return Object.values(grouped);
}

function getCoffeeSummary(item) {
  const sizeEntries = Object.entries(item.sizes || {});
  // Always show size, even if only one size is present
  const sizeStr = sizeEntries.length > 0
    ? sizeEntries.map(([size, qty]) => `${qty} ${size}`).join(', ')
    : `${item.totalQty} cup${item.totalQty > 1 ? 's' : ''}`;
  return `₱${item.totalPrice} — ${item.totalQty} cup${item.totalQty > 1 ? 's' : ''} (${sizeStr})`;
}

function getPastrySummary(item) {
  return `₱${item.totalPrice} — ${item.totalQty} pcs`;
}

function OrderList({ cart, onEditItem, onRemoveItem }) {
  const [showRemove, setShowRemove] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const groupedCart = groupCartItems(cart);

  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setShowRemove(true);
  };
  const handleCancel = () => {
    setShowRemove(false);
    setItemToRemove(null);
  };
  const handleConfirm = () => {
    if (itemToRemove) onRemoveItem(itemToRemove);
    setShowRemove(false);
    setItemToRemove(null);
  };

  return (
    <aside className="order-list-viewport">
      <h2 className="order-list-title">Order List:</h2>
      <div className="order-list-content">
        {groupedCart.length === 0 ? (
          <div className="order-list-empty">No items in your order.</div>
        ) : (
          <ul className="order-list-items">
            {groupedCart.map((item) => (
              <li key={item.id} className="order-list-item">
                <div className="order-list-item-imgbox">
                  <img src={item.image} alt={item.name} className="order-list-item-img" />
                </div>
                <div className="order-list-item-info">
                  <span className="order-list-item-name">{item.name}</span>
                  <div className="order-list-item-details">
                    {item.sizes && Object.keys(item.sizes).length > 0 ? (
                      <span className="order-list-item-summary">{getCoffeeSummary(item)}</span>
                    ) : (
                      <span className="order-list-item-summary">{getPastrySummary(item)}</span>
                    )}
                  </div>
                </div>
                <div className="order-list-item-actions">
                  <button className="order-list-icon-btn" onClick={() => onEditItem(item)}>
                    <FiEye size={20} />
                  </button>
                  <button className="order-list-icon-btn" onClick={() => handleRemoveClick(item)}>
                    <AiOutlineMinusCircle size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <RemoveItemModal isOpen={showRemove} onClose={handleCancel} onConfirm={handleConfirm} />
    </aside>
  );
}

export default OrderList; 