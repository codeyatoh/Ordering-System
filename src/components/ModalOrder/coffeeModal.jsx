import React from 'react';
import styles from './ListOrderModal.module.css';

function CoffeeModal({ isOpen, onClose, item, quantity, size, onQuantityChange, onSizeChange, onAddOrder, onCancelOrder }) {
  if (!isOpen || !item) return null;

  const sizeOptions = [
    { label: 'Regular', value: 'regular', addOn: 0 },
    { label: 'Medium', value: 'medium', addOn: 10 },
    { label: 'Large', value: 'large', addOn: 20 },
  ];

  const basePrice = item.price;
  const addOnPrice = sizeOptions.find(opt => opt.value === size)?.addOn || 0;
  const totalCost = (basePrice + addOnPrice) * quantity;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-box']}>
        <div className={styles['modal-header']}>
          <div className={styles['coffee-modal-header-content']}>
            <img src={item.image} alt={item.name} className={styles['coffee-modal-img']} />
            <div className={styles['coffee-modal-info']}>
              <div className={styles['coffee-modal-title']}>{item.name}</div>
              <div className={styles['coffee-modal-price']}>
                ₱{basePrice.toFixed(2)} <span style={{ fontWeight: 400 }}>/ Each {sizeOptions.find(opt => opt.value === size)?.label || 'Regular'}</span>
              </div>
              <div className={styles['coffee-modal-total']}>Total Cost: ₱{totalCost}</div>
            </div>
          </div>
          <button className={styles['modal-close-btn']} onClick={onClose}>&times;</button>
        </div>
        <div className={styles['modal-content']} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles['coffee-modal-quantity-label']}>Quantity</div>
          <div className={styles['coffee-modal-quantity-controls']}>
            <button className={styles['icon-btn']} onClick={() => onQuantityChange(quantity - 1)} disabled={quantity <= 1}>&minus;</button>
            <span className={styles['coffee-modal-quantity-value']}>{quantity}</span>
            <button className={styles['icon-btn']} onClick={() => onQuantityChange(quantity + 1)}>&#43;</button>
          </div>
          <div className={styles['coffee-modal-size-label']}>Size</div>
          <div className={styles['coffee-modal-size-options']}>
            {sizeOptions.map(opt => (
              <div key={opt.value} className={styles['coffee-modal-size-option']}>
                <span style={{ fontWeight: 600, color: '#2d4a3a', marginBottom: 4 }}>{opt.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    className={
                      styles['coffee-modal-size-btn'] + (size === opt.value ? ' ' + styles['selected'] : '')
                    }
                    onClick={() => onSizeChange(opt.value)}
                  >
                    1
                  </button>
                  {opt.addOn > 0 && <span className={styles['coffee-modal-size-addon']}>+{opt.addOn} peso</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles['coffee-modal-footer']}>
          <button className={styles['coffee-modal-cancel-btn']} onClick={onCancelOrder}>Cancel Order</button>
          <button className={styles['coffee-modal-add-btn']} onClick={onAddOrder}>Add Order</button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeModal;
