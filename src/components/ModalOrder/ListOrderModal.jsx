import React from 'react';
import styles from './ListOrderModal.module.css';
import { FiEye } from 'react-icons/fi';
import { AiOutlineMinusCircle } from 'react-icons/ai';

function ListOrderModal({ isOpen, onClose, cart, onEditItem, onRemoveItem }) {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-box']}>
        <div className={styles['modal-header']}>
          <h2>Order List</h2>
          <button className={styles['modal-close-btn']} onClick={onClose}>&times;</button>
        </div>
        <div className={styles['modal-content']}>
          {cart.length === 0 ? (
            <div className={styles['empty-message']}>No items in your order.</div>
          ) : (
            <ul className={styles['order-list']}>
              {cart.map((item) => (
                <li key={item.id} className={styles['order-list-item']}>
                  <div className={styles['order-item-info']}>
                    <span className={styles['order-item-name']}>{item.name}</span>
                    <span className={styles['order-item-qty']}>x{item.quantity}</span>
                    <span className={styles['order-item-price']}>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className={styles['order-item-actions']}>
                    <button className={styles['icon-btn']} onClick={() => onEditItem(item)}>
                      <FiEye size={20} />
                    </button>
                    <button className={styles['icon-btn']} onClick={() => onRemoveItem(item)}>
                      <AiOutlineMinusCircle size={22} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListOrderModal;
