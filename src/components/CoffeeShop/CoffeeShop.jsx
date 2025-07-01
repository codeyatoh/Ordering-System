import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import OrderSummary from './OrderSummary';
import './CoffeeShop.css';

function CoffeeShop() {
  const location = useLocation();
  const orderType = location.state?.orderType || 'dine-in';
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [cart, setCart] = useState([]);

  const coffeeItems = [
    { id: 1, name: 'Caramel Dream Latte', description: 'Velvety espresso layered with steamed milk and drizzled with golden caramel syrup. A sweet escape in every sip.', price: 145.00, image: '/api/placeholder/300/200' },
    { id: 2, name: 'Hazelnut Bliss Brew', description: 'A smooth, aromatic coffee with a warm hazelnut twist—perfect for cozy mornings or chill afternoons.', price: 135.00, image: '/api/placeholder/300/200' },
    { id: 3, name: 'Iced Mocha Rush', description: 'Bold espresso meets rich chocolate and milk over ice. A refreshing buzz with a chocolatey kick.', price: 150.00, image: '/api/placeholder/300/200' },
    { id: 4, name: 'Vanilla Cloud Cold Brew', description: 'Cold brew steeped for 18 hours and topped with a delicate vanilla cream foam. Light, smooth, and heavenly.', price: 160.00, image: '/api/placeholder/300/200' },
    { id: 5, name: 'Spanish Latte', description: 'Sweetened condensed milk combined with strong espresso—creamy, smooth, and authentically bold.', price: 155.00, image: '/api/placeholder/300/200' },
    { id: 6, name: 'Classic Americano', description: 'A no-fuss classic—just espresso and hot water, bold and invigorating with a smooth finish.', price: 110.00, image: '/api/placeholder/300/200' }
  ];

  const pastryItems = [
    { id: 7, name: 'Chocolate Chip Croissant', description: 'Flaky, buttery layers wrapped around luscious melted chocolate chips. A Popular treat with a sweet surprise.', price: 85.00, image: '/api/placeholder/300/200' },
    { id: 8, name: 'Cheesy Garlic Bun', description: 'Soft, golden bread infused with garlic butter and melted with real cheese. Irresistibly savory.', price: 75.00, image: '/api/placeholder/300/200' },
    { id: 9, name: 'Ube Cream Roll', description: 'A Filipino favorite—moist sponge cake rolled with vibrant ube halaya and silky cream.', price: 90.00, image: '/api/placeholder/300/200' },
    { id: 10, name: 'Matcha Green Tea Muffin', description: 'Earthy matcha blended into a moist muffin with white chocolate chunks. For the bold and the curious.', price: 80.00, image: '/api/placeholder/300/200' },
    { id: 11, name: 'Cinnamon Swirl Roll', description: 'Soft dough rolled with cinnamon sugar and topped with a vanilla glaze. Sweet, spicy, and sticky in all the right ways.', price: 88.00, image: '/api/placeholder/300/200' },
    { id: 12, name: 'Strawberry Cream Danish', description: 'Flaky pastry filled with sweet cream cheese and topped with luscious strawberry compote.', price: 95.00, image: '/api/placeholder/300/200' }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCancel = () => {
    setCart([]);
  };

  const handleDone = () => {
    setCart([]);
  };

  const currentItems = activeCategory === 'coffee' ? coffeeItems : pastryItems;

  return (
    <div className="coffee-shop">
      <Header />
      <div className="main-content">
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <main className="menu-content">
          <h2 className="category-title">
            {activeCategory === 'coffee' ? 'Coffee' : 'Bread & Pastry'}
          </h2>
          <ProductGrid items={currentItems} onAddToCart={addToCart} />
        </main>
      </div>
      <OrderSummary 
        orderType={orderType} 
        totalPrice={getTotalPrice()} 
        totalItems={getTotalItems()} 
        onCancel={handleCancel} 
        onDone={handleDone}
      />
    </div>
  );
}

export default CoffeeShop; 