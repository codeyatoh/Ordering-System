// This is the main CoffeeShop page component
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import OrderSummary from './OrderSummary';
import CoffeeModal from '../Modal/coffeeModal';
import BreadModal from '../Modal/breadModal';
import OrderList from './OrderList';
import Receipt from './receipt';
import './CoffeeShop.css';
import { toast } from 'react-toastify';
import { handleCancel, handleRemoveItem, handleAddCoffeeOrder, handleAddBreadOrder, handleAddToCart } from '../../handlers/cartHandlers';

function CoffeeShop() {
  // Get the order type (dine-in or take-out) from the previous page
  const location = useLocation();
  const orderType = location.state?.orderType || 'dine-in';

  // State for which category is active (coffee or bread)
  const [activeCategory, setActiveCategory] = useState('coffee');
  // State for the cart (list of items added)
  const [cart, setCart] = useState([]);
  // State for showing/hiding modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);
  const [isBreadModalOpen, setIsBreadModalOpen] = useState(false);
  // State for the currently selected item and its details
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('regular');
  const [selectedQuantities, setSelectedQuantities] = useState({ regular: 1, medium: 0, large: 0 });
  // Add state for showing order confirmation and order number
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  // Add state for customer payment amount
  const [customerPayment, setCustomerPayment] = useState('');
  // Add state for showing receipt
  const [showReceipt, setShowReceipt] = useState(false);

  // List of coffee products
  const coffeeItems = [
    { id: 1, name: 'Caramel Dream Latte', description: 'Velvety espresso layered with steamed milk and drizzled with golden caramel syrup. A sweet escape in every sip.', price: 145.00, image: '/api/placeholder/300/200' },
    { id: 2, name: 'Hazelnut Bliss Brew', description: 'A smooth, aromatic coffee with a warm hazelnut twist—perfect for cozy mornings or chill afternoons.', price: 135.00, image: '/api/placeholder/300/200' },
    { id: 3, name: 'Iced Mocha Rush', description: 'Bold espresso meets rich chocolate and milk over ice. A refreshing buzz with a chocolatey kick.', price: 150.00, image: '/api/placeholder/300/200' },
    { id: 4, name: 'Vanilla Cloud Cold Brew', description: 'Cold brew steeped for 18 hours and topped with a delicate vanilla cream foam. Light, smooth, and heavenly.', price: 160.00, image: '/api/placeholder/300/200' },
    { id: 5, name: 'Spanish Latte', description: 'Sweetened condensed milk combined with strong espresso—creamy, smooth, and authentically bold.', price: 155.00, image: '/api/placeholder/300/200' },
    { id: 6, name: 'Classic Americano', description: 'A no-fuss classic—just espresso and hot water, bold and invigorating with a smooth finish.', price: 110.00, image: '/api/placeholder/300/200' }
  ];

  // List of bread and pastry products
  const pastryItems = [
    { id: 7, name: 'Chocolate Chip Croissant', description: 'Flaky, buttery layers wrapped around luscious melted chocolate chips. A Popular treat with a sweet surprise.', price: 85.00, image: '/api/placeholder/300/200' },
    { id: 8, name: 'Cheesy Garlic Bun', description: 'Soft, golden bread infused with garlic butter and melted with real cheese. Irresistibly savory.', price: 75.00, image: '/api/placeholder/300/200' },
    { id: 9, name: 'Ube Cream Roll', description: 'A Filipino favorite—moist sponge cake rolled with vibrant ube halaya and silky cream.', price: 90.00, image: '/api/placeholder/300/200' },
    { id: 10, name: 'Matcha Green Tea Muffin', description: 'Earthy matcha blended into a moist muffin with white chocolate chunks. For the bold and the curious.', price: 80.00, image: '/api/placeholder/300/200' },
    { id: 11, name: 'Cinnamon Swirl Roll', description: 'Soft dough rolled with cinnamon sugar and topped with a vanilla glaze. Sweet, spicy, and sticky in all the right ways.', price: 88.00, image: '/api/placeholder/300/200' },
    { id: 12, name: 'Strawberry Cream Danish', description: 'Flaky pastry filled with sweet cream cheese and topped with luscious strawberry compote.', price: 95.00, image: '/api/placeholder/300/200' }
  ];

  // Set up handler functions for cart actions (imported from handlers)
  const cancelOrder = () => {
    setCart([]);
    toast.info('Order cancelled.');
  };
  const removeItem = handleRemoveItem(cart, setCart);
  const addCoffeeOrder = handleAddCoffeeOrder(cart, setCart, coffeeItems, setIsCoffeeModalOpen);
  const addBreadOrder = handleAddBreadOrder(cart, setCart, selectedItem, selectedQuantity, setIsBreadModalOpen);
  const addToCart = handleAddToCart(cart, setCart, setIsCoffeeModalOpen, setSelectedItem, setSelectedQuantities);

  // This function opens the modal to view/edit a product (coffee or bread)
  const handleViewProduct = (item) => {
    setSelectedItem(item);
    if (item.id <= 6) { // If item is coffee
      setSelectedQuantities(item.quantities || { regular: 1, medium: 0, large: 0 });
      setIsCoffeeModalOpen(true);
    } else { // If item is bread/pastry
      setSelectedQuantity(item.quantity || 1);
      setIsBreadModalOpen(true);
    }
  };

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 0) + (item.quantities ? Object.entries(item.quantities).reduce((sum, [size, qty]) => sum + ((item.price + (size === 'medium' ? 10 : size === 'large' ? 20 : 0)) * qty), 0) : 0)), 0);
  };

  // Calculate the total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0) + (item.quantities ? Object.values(item.quantities).reduce((sum, qty) => sum + qty, 0) : 0), 0);
  };

  // Generate a new order number (simple increment or random for demo)
  const generateOrderNumber = () => {
    // For demo: random 4-digit number, in real app use backend or persistent counter
    return String(Math.floor(1 + Math.random() * 9999)).padStart(4, '0');
  };

  // Handler for when checkout is done
  const handleOrderDone = () => {
    if (cart.length === 0) {
      toast.error('Please add at least one product to the order list.');
      return;
    }
    if (!customerPayment || Number(customerPayment) <= 0) {
      toast.error('Please enter customer payment before completing the order.');
      return;
    }
    setOrderNumber(generateOrderNumber());
    setShowReceipt(true);
    toast.success('Order completed successfully!');
    // Do not clear cart yet, needed for receipt
  };

  // Handler to start a new order
  const handleStartNewOrder = () => {
    setShowReceipt(false);
    setOrderNumber(null);
    setCart([]);
    setCustomerPayment('');
  };

  // Format items for receipt
  const getReceiptItems = () => {
    return cart.map(item => {
      if (item.quantities) {
        // Coffee with sizes
        const sizeSummary = Object.entries(item.quantities)
          .filter(([size, qty]) => qty > 0)
          .map(([size, qty]) => `${qty} ${size.charAt(0).toUpperCase() + size.slice(1)}`)
          .join(', ');
        return {
          quantity: Object.values(item.quantities).reduce((a, b) => a + b, 0),
          name: `${item.name} (${sizeSummary})`,
          price: Object.entries(item.quantities).reduce((sum, [size, qty]) => sum + ((item.price + (size === 'medium' ? 10 : size === 'large' ? 20 : 0)) * qty), 0)
        };
      } else {
        // Bread/pastry
        return {
          quantity: item.quantity,
          name: item.name,
          price: item.price * item.quantity
        };
      }
    });
  };

  // Get today's date and time
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB');
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Render the CoffeeShop page
  return (
    <div className="coffee-shop">
      {/* Top header bar - hide when showing receipt */}
      {!showReceipt && <Header />}
      <div className="main-content">
        {/* Sidebar for switching categories */}
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <main className="menu-content">
          {/* Show which category is active */}
          <h2 className="category-title">
            {activeCategory === 'coffee' ? 'Coffee' : 'Bread & Pastry'}
          </h2>
          {/* Show the products for the selected category */}
          <ProductGrid items={activeCategory === 'coffee' ? coffeeItems : pastryItems} onAddToCart={addToCart} />
        </main>
        <OrderList cart={cart} onEditItem={handleViewProduct} onRemoveItem={removeItem} customerPayment={customerPayment} setCustomerPayment={setCustomerPayment} />
      </div>
      {/* Show receipt after checkout */}
      {showReceipt && (
        <Receipt
          orderNumber={orderNumber}
          date={dateStr}
          time={timeStr}
          items={getReceiptItems()}
          total={getTotalPrice()}
          cash={customerPayment}
          change={customerPayment - getTotalPrice()}
          onStartNewOrder={handleStartNewOrder}
          onPrint={() => window.print()}
        />
      )}
      {/* Show the order summary (total, cancel, done) only if not showing receipt */}
      {!showReceipt && (
        <OrderSummary 
          orderType={orderType} 
          totalPrice={getTotalPrice()} 
          totalItems={getTotalItems()} 
          onCancel={cancelOrder} 
          onDone={handleOrderDone}
          customerPayment={customerPayment}
        />
      )}
      {/* Modal for editing coffee order */}
      <CoffeeModal 
        isOpen={isCoffeeModalOpen} 
        onClose={() => setIsCoffeeModalOpen(false)} 
        item={selectedItem} 
        quantities={selectedQuantities}
        onAddOrder={addCoffeeOrder}
        onCancelOrder={() => {
          setIsCoffeeModalOpen(false);
        }}
      />
      {/* Modal for editing bread order */}
      <BreadModal
        isOpen={isBreadModalOpen}
        onClose={() => setIsBreadModalOpen(false)}
        item={selectedItem}
        quantity={selectedQuantity}
        onQuantityChange={setSelectedQuantity}
        onAddOrder={addBreadOrder}
        onCancelOrder={() => {
          setIsBreadModalOpen(false);
        }}
      />
    </div>
  );
}

export default CoffeeShop; 