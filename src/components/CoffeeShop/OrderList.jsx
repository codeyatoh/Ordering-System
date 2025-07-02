import React from 'react';
import { FiEye } from 'react-icons/fi';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import './CoffeeShop.css';

function OrderList({ cart, onEditItem, onRemoveItem }) {
  return (
    <aside className="order-list-viewport">
      <h2 className="order-list-title">Order List:</h2>
      <div className="order-list-content">
        {cart.length === 0 ? (
          <div className="order-list-empty">No items in your order.</div>
        ) : (
          <ul className="order-list-items">
            {cart.map((item) => (
              <li key={item.id} className="order-list-item">
                <div className="order-list-item-imgbox">
                  <img src={item.image} alt={item.name} className="order-list-item-img" />
                </div>
                <div className="order-list-item-info">
                  <span className="order-list-item-name">{item.name}</span>
                  <div className="order-list-item-details">
                    <span className="order-list-item-qty">x{item.quantity}</span>
                    <span className="order-list-item-price">₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div className="order-list-item-actions">
                  <button className="order-list-icon-btn" onClick={() => onEditItem(item)}>
                    <FiEye size={20} />
                  </button>
                  <button className="order-list-icon-btn" onClick={() => onRemoveItem(item)}>
                    <AiOutlineMinusCircle size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default OrderList; 