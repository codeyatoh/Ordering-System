import React from 'react';

function ProductCard({ item, onAddToCart }) {
  return (
    <div className="menu-item" onClick={() => onAddToCart(item)}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        <div className="item-price">₱{item.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ProductCard; 