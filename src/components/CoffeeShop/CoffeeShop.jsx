import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import OrderSummary from './OrderSummary';
import CoffeeModal from '../Modal/coffeeModal';
import BreadModal from '../Modal/breadModal';
import OrderList from './OrderList';
import './CoffeeShop.css';

function CoffeeShop() {
  const location = useLocation();
  const orderType = location.state?.orderType || 'dine-in';
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [cart, setCart] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);
  const [isBreadModalOpen, setIsBreadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('regular');

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
    // If coffee (id 1-6), add sizeLabel: 'Regular' if not present
    const isCoffee = item.id >= 1 && item.id <= 6;
    const itemWithSize = isCoffee && !item.sizeLabel
      ? { ...item, sizeLabel: 'Regular' }
      : item;
    const existingItem = cart.find(cartItem => cartItem.id === item.id && (!isCoffee || cartItem.sizeLabel === (itemWithSize.sizeLabel || 'Regular')));
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id && (!isCoffee || cartItem.sizeLabel === (itemWithSize.sizeLabel || 'Regular'))
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...itemWithSize, quantity: 1 }]);
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

  const handleViewOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleViewProduct = (item) => {
    setSelectedItem(item);
    setSelectedQuantity(item.quantity || 1);
    if (item.id <= 6) { // coffee
      setSelectedSize('regular');
      setIsCoffeeModalOpen(true);
    } else { // bread/pastry
      setIsBreadModalOpen(true);
    }
  };

  const handleRemoveItem = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  };

  const currentItems = activeCategory === 'coffee' ? coffeeItems : pastryItems;

  const handleAddCoffeeOrders = (orders) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      orders.forEach(order => {
        // Find if an item with the same name and size exists
        const idx = newCart.findIndex(
          item => item.name === order.name && item.size === order.size
        );
        if (idx !== -1) {
          // Merge quantities
          newCart[idx] = {
            ...newCart[idx],
            quantity: newCart[idx].quantity + order.quantity,
          };
        } else {
          newCart.push(order);
        }
      });
      return newCart;
    });
  };

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
        <OrderList cart={cart} onEditItem={handleViewProduct} onRemoveItem={handleRemoveItem} />
      </div>
      <OrderSummary 
        orderType={orderType} 
        totalPrice={getTotalPrice()} 
        totalItems={getTotalItems()} 
        onCancel={handleCancel} 
        onDone={handleDone}
      />
      <CoffeeModal 
        isOpen={isCoffeeModalOpen} 
        onClose={() => setIsCoffeeModalOpen(false)} 
        item={selectedItem} 
        quantity={selectedQuantity} 
        size={selectedSize}
        onQuantityChange={setSelectedQuantity}
        onSizeChange={setSelectedSize}
        onAddOrder={handleAddCoffeeOrders}
        onCancelOrder={() => {
          setIsCoffeeModalOpen(false);
        }}
      />
      <BreadModal
        isOpen={isBreadModalOpen}
        onClose={() => setIsBreadModalOpen(false)}
        item={selectedItem}
        quantity={selectedQuantity}
        onQuantityChange={setSelectedQuantity}
        onAddOrder={() => {
          setCart(cart.map(cartItem =>
            cartItem.id === selectedItem.id
              ? { ...cartItem, quantity: selectedQuantity }
              : cartItem
          ));
          setIsBreadModalOpen(false);
        }}
        onCancelOrder={() => {
          setIsBreadModalOpen(false);
        }}
      />
    </div>
  );
}

export default CoffeeShop; 