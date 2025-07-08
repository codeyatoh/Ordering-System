// ============================================================================
// TEST FILE: HOW TO USE AXIOS TO SEND DATA TO YOUR BACKEND
// ============================================================================

import axios from 'axios';

// Replace this with your actual backend URL
const BACKEND_URL = 'http://localhost:3030';

// ============================================================================
// 1. CREW DATA EXAMPLES
// ============================================================================

// Example crew data that matches your migration schema
const crewData = {
  crew_id: "CRW001",
  first_name: "Juan",
  last_name: "Dela Cruz", 
  email: "juan.delacruz@example.com",
  gender: "Male",
  status: true,
  hire_date: "2024-06-01T09:00:00Z"
};

// Function to create crew
export const createCrew = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/crew`, crewData);
    console.log('✅ Crew created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating crew:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================================================
// 2. ORDER DATA EXAMPLES  
// ============================================================================

// Example order data (without items)
const orderData = {
  order_id: "ORD001",
  crew_id: "CRW001",
  total_price: 150.50,
  order_status: "pending",
  created_at: new Date().toISOString()
};

// Function to create order
export const createOrder = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/orders`, orderData);
    console.log('✅ Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================================================
// 3. ORDER WITH ITEMS EXAMPLE (RECOMMENDED)
// ============================================================================

// Example order with items - this is the best way to send data
const orderWithItemsData = {
  order_id: "ORD002",
  crew_id: "CRW001", 
  total_price: 200.00,
  order_status: "pending",
  created_at: new Date().toISOString(),
  order_items: [
    {
      item_name: "Coffee (Regular)",
      quantity: 2,
      price: 50.00
    },
    {
      item_name: "Burger",
      quantity: 1, 
      price: 100.00
    }
  ]
};

// Function to create order with items
export const createOrderWithItems = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/orders`, orderWithItemsData);
    console.log('✅ Order with items created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating order with items:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================================================
// 4. ORDER ITEM EXAMPLE
// ============================================================================

// Example order item data
const orderItemData = {
  order_id: "ORD001",
  item_name: "Soda",
  quantity: 1,
  price: 20.00
};

// Function to add order item
export const addOrderItem = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/order-items`, orderItemData);
    console.log('✅ Order item added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error adding order item:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================================================
// 5. REAL COFFEE SHOP EXAMPLE
// ============================================================================

// This is how your CoffeeShop component should send data
export const sendCoffeeShopOrder = async (cart, crew) => {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    if (item.quantities) {
      // Coffee with sizes
      return total + Object.entries(item.quantities).reduce((sum, [size, qty]) => {
        const addOn = size === 'medium' ? 10 : size === 'large' ? 20 : 0;
        return sum + ((item.price + addOn) * qty);
      }, 0);
    } else {
      // Bread/pastry
      return total + (item.price * item.quantity);
    }
  }, 0);

  // Format cart items for backend
  const orderItems = cart.map(item => {
    if (item.quantities) {
      // Handle coffee with different sizes
      const sizeOptions = [
        { label: 'Regular', value: 'regular', addOn: 0 },
        { label: 'Medium', value: 'medium', addOn: 10 },
        { label: 'Large', value: 'large', addOn: 20 },
      ];
      
      const items = [];
      sizeOptions.forEach(opt => {
        const qty = item.quantities[opt.value] || 0;
        if (qty > 0) {
          items.push({
            item_name: `${item.name} (${opt.label})`,
            quantity: qty,
            price: item.price + opt.addOn
          });
        }
      });
      return items;
    } else {
      // Handle bread/pastry items
      return [{
        item_name: item.name,
        quantity: item.quantity,
        price: item.price
      }];
    }
  }).flat();

  // Generate order ID
  const orderId = String(Math.floor(1 + Math.random() * 9999)).padStart(4, '0');

  // Prepare order data
  const orderData = {
    order_id: orderId,
    crew_id: crew.crew_id,
    total_price: totalPrice,
    order_status: 'pending',
    created_at: new Date().toISOString(),
    order_items: orderItems
  };

  try {
    const response = await axios.post(`${BACKEND_URL}/orders`, orderData);
    console.log('✅ Coffee shop order sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending coffee shop order:', error.response?.data || error.message);
    throw error;
  }
};

// ============================================================================
// 6. TEST ALL FUNCTIONS
// ============================================================================

// Function to test all the examples
export const testAllFunctions = async () => {
  console.log('🚀 Starting Axios tests...\n');

  try {
    // Test 1: Create crew
    console.log('📝 Testing crew creation...');
    await createCrew();
    
    // Test 2: Create order
    console.log('\n📝 Testing order creation...');
    await createOrder();
    
    // Test 3: Create order with items
    console.log('\n📝 Testing order with items creation...');
    await createOrderWithItems();
    
    // Test 4: Add order item
    console.log('\n📝 Testing order item addition...');
    await addOrderItem();
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
};

// ============================================================================
// 7. USAGE IN YOUR COMPONENTS
// ============================================================================

// Example: How to use in CoffeeShop component
export const coffeeShopExample = async () => {
  // Sample cart data from your CoffeeShop
  const sampleCart = [
    {
      id: "coffee1",
      name: "Espresso",
      price: 50,
      quantities: { regular: 2, medium: 0, large: 0 }
    },
    {
      id: "bread1", 
      name: "Croissant",
      price: 30,
      quantity: 1
    }
  ];

  // Sample crew data
  const sampleCrew = {
    crew_id: "CRW001",
    first_name: "Juan",
    last_name: "Dela Cruz"
  };

  try {
    const result = await sendCoffeeShopOrder(sampleCart, sampleCrew);
    console.log('✅ Coffee shop order completed:', result);
    return result;
  } catch (error) {
    console.error('❌ Coffee shop order failed:', error);
    throw error;
  }
};

// Example: How to use in Admin panel
export const adminExample = async () => {
  try {
    // Create a new crew member
    const crewResult = await createCrew();
    console.log('✅ Admin created crew:', crewResult);
    
    // Create an order
    const orderResult = await createOrderWithItems();
    console.log('✅ Admin created order:', orderResult);
    
    return { crew: crewResult, order: orderResult };
  } catch (error) {
    console.error('❌ Admin operations failed:', error);
    throw error;
  }
}; 