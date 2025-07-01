import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ items, onAddToCart }) {
  return (
    <div className="items-grid">
      {items.map(item => (
        <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid; 