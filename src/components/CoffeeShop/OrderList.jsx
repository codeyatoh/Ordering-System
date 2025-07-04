import React, { useState } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import './CoffeeShop.css';
import { handleRemoveClick, handleCancel, handleConfirm } from '../../handlers/modalHandlers';
import { getCoffeeSummary, getPastrySummary, groupCartItems } from '../../utils/orderUtils';
import { toast } from 'react-toastify';

// This component shows the list of items in the user's order (cart)
function OrderList({ cart, onEditItem, onRemoveItem, customerPayment, setCustomerPayment }) {
  // State for showing/hiding the remove item modal
  const [showRemove, setShowRemove] = useState(false);
  // State for which item is selected to be removed
  const [itemToRemove, setItemToRemove] = useState(null);
  // Group similar items in the cart for display
  const groupedCart = groupCartItems(cart);

  // Handler functions for remove item modal
  const removeClick = handleRemoveClick(setItemToRemove, setShowRemove);
  const cancelRemove = handleCancel(setShowRemove, setItemToRemove);
  const confirmRemove = handleConfirm(itemToRemove, onRemoveItem, setShowRemove, setItemToRemove);

  const handleRemove = (item) => {
    onRemoveItem(item);
    toast.info(`${item.name} removed from cart.`);
  };

  return (
    // Sidebar that displays the order list
    <aside className="order-list-viewport">
      <h2 className="order-list-title">Order List:</h2>
      <div className="order-list-content">
        {/* If cart is empty, show a message */}
        {groupedCart.length === 0 ? (
          <div className="order-list-empty">No items in your order.</div>
        ) : (
          // Otherwise, show the list of items
          <ul className="order-list-items">
            {groupedCart.map((item) => (
              <li key={item.id} className="order-list-item">
                <div className="order-list-item-imgbox">
                  <img src={item.Imageurl || item.image} alt={item.name} className="order-list-item-img" />
                </div>
                <div className="order-list-item-info">
                  <span className="order-list-item-name">{item.name}</span>
                  <div className="order-list-item-details">
                    {/* Show summary depending on if it's coffee or pastry */}
                    {item.quantities ? (
                      <span className="order-list-item-summary">{getCoffeeSummary(item)}</span>
                    ) : (
                      <span className="order-list-item-summary">{getPastrySummary(item)}</span>
                    )}
                  </div>
                </div>
                <div className="order-list-item-actions">
                  {/* Button to view/edit the item */}
                  <button className="order-list-icon-btn" onClick={() => onEditItem(item)}>
                    <FiEye size={20} />
                  </button>
                  {/* Button to remove the item (now trash bin icon) */}
                  <button className="order-list-icon-btn" onClick={() => handleRemove(item)}>
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Footer for customer payment */}
      <div className="order-list-footer">
        <label htmlFor="customer-payment" className="order-list-footer-label">Customer Payment:</label>
        <div className="order-list-footer-input-wrapper">
          <span className="order-list-footer-peso">₱</span>
          <input
            id="customer-payment"
            className="order-list-footer-input"
            type="number"
            min="0"
            placeholder="Enter Amount"
            value={customerPayment}
            onChange={e => setCustomerPayment(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}

export default OrderList; 