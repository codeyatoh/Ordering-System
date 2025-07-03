import React from 'react';

// This component shows a single product card (for coffee or pastry)
function ProductCard({ item, onAddToCart }) {
  return (
    // The whole card is clickable to add the item to the cart
    <div className="menu-item" onClick={() => onAddToCart(item)}>
      <div className="item-image">
        {/* Show the product image */}
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-content">
        {/* Show the product name */}
        <h3 className="item-name">{item.name}</h3>
        {/* Show the product price */}
        <div className="item-price">₱{item.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ProductCard; 