import axios from 'axios';

// Updated data structure to match the migration schema:
// {
//   order_id: "ORD123",
//   crew_id: "CRW001", 
//   total_price: 200.00,
//   order_status: "pending",
//   created_at: "2024-06-10T12:30:00Z",
//   order_items: [
//     { item_name: "Coffee", quantity: 2, price: 100.00 },
//     { item_name: "Burger", quantity: 1, price: 100.00 }
//   ]
// }

/**
 * Send order data to the executive-dashboard-backend
 * @param {Object} orderData - The order object with cart items
 * @param {Object} crew - The crew member data
 * @returns {Promise<Object>} - The response from the backend
 */
export async function sendOrderToBackend(orderData, crew) {
  try {
    // Format cart items to match order_items table structure
    const orderItems = orderData.cart.map(item => {
      if (item.quantities) {
        // Handle coffee with different sizes
        const sizeOptions = [
          { label: 'Regular', value: 'regular', addOn: 0 },
          { label: 'Medium', value: 'medium', addOn: 10 },
          { label: 'Large', value: 'large', addOn: 20 },
        ];
        
        // Create separate order items for each size with quantity > 0
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
    }).flat(); // Flatten the array since coffee items can create multiple order items

    // Prepare the data according to migration schema
    const backendData = {
      order_id: orderData.order_id,
      crew_id: orderData.crew_id,
      total_price: orderData.total_price,
      order_status: orderData.order_status || 'pending',
      created_at: orderData.created_at || new Date().toISOString(),
      order_items: orderItems
    };

    // Send to backend
    const response = await axios.post('http://localhost:3030/external-orders', backendData);
    return response.data;
  } catch (error) {
    console.error('Error sending order to backend:', error);
    throw error;
  }
}

/**
 * Send crew data to the executive-dashboard-backend
 * @param {Object} crewData - The crew member data
 * @returns {Promise<Object>} - The response from the backend
 */
export async function sendCrewToBackend(crewData) {
  try {
    const response = await axios.post('http://localhost:3030/crew', crewData);
    return response.data;
  } catch (error) {
    console.error('Error sending crew to backend:', error);
    throw error;
  }
}

/**
 * Send order items data to the executive-dashboard-backend
 * @param {Object} orderItemData - The order item data
 * @returns {Promise<Object>} - The response from the backend
 */
export async function sendOrderItemToBackend(orderItemData) {
  try {
    const response = await axios.post('http://localhost:3030/order-items', orderItemData);
    return response.data;
  } catch (error) {
    console.error('Error sending order item to backend:', error);
    throw error;
  }
} 