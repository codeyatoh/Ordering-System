# Axios Data Sending Guide for Executive Dashboard Backend

## 📋 Overview

This guide shows you how to properly send data via Axios to your executive dashboard backend, matching the migration schema exactly.

## 🗄️ Database Schema (From Your Migration)

### 1. **crew** table
```sql
crew_id (string, primary key)
first_name (string)
last_name (string) 
email (string)
gender (string)
status (boolean)
hire_date (timestamp)
```

### 2. **orders** table
```sql
order_id (string, primary key)
crew_id (string, foreign key to crew)
total_price (decimal 10,2)
order_status (string)
created_at (timestamp, defaults to now())
```

### 3. **order_items** table
```sql
id (integer, auto-increment primary key)
order_id (string, foreign key to orders)
item_name (string)
quantity (integer)
price (decimal 10,2)
```

## 🚀 How to Send Data

### 1. **Crew Data**

```javascript
import axios from 'axios';

const crewData = {
  crew_id: "CRW001",
  first_name: "Juan",
  last_name: "Dela Cruz",
  email: "juan.delacruz@example.com",
  gender: "Male",
  status: true,
  hire_date: "2024-06-01T09:00:00Z"
};

// Send to backend
const response = await axios.post('http://localhost:3030/crew', crewData);
```

### 2. **Order Data (Without Items)**

```javascript
const orderData = {
  order_id: "ORD001",
  crew_id: "CRW001",
  total_price: 150.50,
  order_status: "pending",
  created_at: new Date().toISOString()
};

const response = await axios.post('http://localhost:3030/orders', orderData);
```

### 3. **Order with Items (RECOMMENDED)**

```javascript
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

const response = await axios.post('http://localhost:3030/orders', orderWithItemsData);
```

### 4. **Order Item (Single Item)**

```javascript
const orderItemData = {
  order_id: "ORD001",
  item_name: "Soda",
  quantity: 1,
  price: 20.00
};

const response = await axios.post('http://localhost:3030/order-items', orderItemData);
```

## ☕ Coffee Shop Integration

### Updated `sendOrderToBackend.js`

The file has been updated to properly format your cart data:

```javascript
// In your CoffeeShop component
const orderData = {
  order_id: newOrderNumber,
  crew_id: crew.crew_id,
  total_price: getTotalPrice(),
  order_status: 'pending',
  created_at: new Date().toISOString(),
  cart: cart // Pass the cart items to be processed
};

sendOrderToBackend(orderData, crew)
  .then(data => {
    console.log('Order successfully sent to backend:', data);
  })
  .catch(error => {
    console.error('Error sending order to backend:', error);
  });
```

### How Cart Items Are Processed

1. **Coffee items** with sizes are split into separate order items:
   - `Espresso (Regular)` - 2 cups - ₱50 each
   - `Espresso (Medium)` - 1 cup - ₱60 each

2. **Bread/Pastry items** become single order items:
   - `Croissant` - 1 piece - ₱30 each

## 📁 Files Created/Updated

### 1. **Updated Files**
- `src/utils/sendOrderToBackend.js` - Fixed to match migration schema
- `src/components/CoffeeShop/CoffeeShop.jsx` - Updated function call

### 2. **New Files**
- `src/utils/axiosExamples.js` - Comprehensive examples
- `src/utils/testAxios.js` - Test functions with real data
- `AXIOS_GUIDE.md` - This guide

## 🧪 Testing

### Run Test Functions

```javascript
import { testAllFunctions, coffeeShopExample } from './src/utils/testAxios.js';

// Test all functions
await testAllFunctions();

// Test coffee shop order
await coffeeShopExample();
```

### Test Individual Functions

```javascript
import { createCrew, createOrderWithItems } from './src/utils/testAxios.js';

// Test crew creation
await createCrew();

// Test order with items
await createOrderWithItems();
```

## ⚠️ Important Notes

### 1. **Data Types**
- Use `string` for text fields
- Use `number` for decimal fields (prices)
- Use `boolean` for status fields
- Use ISO 8601 format for dates: `"2024-06-01T09:00:00Z"`

### 2. **Backend URL**
- Change `http://localhost:3030` to your actual backend URL
- Update in `sendOrderToBackend.js` and test files

### 3. **Error Handling**
- All functions include proper error handling
- Check console for detailed error messages
- Use try-catch blocks in your components

### 4. **Order Items Processing**
- Coffee with sizes creates multiple order items
- Bread/pastry creates single order items
- Total price is calculated correctly with size add-ons

## 🔧 Backend Endpoints Expected

Your backend should have these endpoints:

- `POST /crew` - Create crew member
- `POST /orders` - Create order (with or without items)
- `POST /order-items` - Add order item
- `PUT /crew/:id` - Update crew member
- `PUT /orders/:id` - Update order
- `GET /crew` - Get all crew
- `GET /orders` - Get all orders

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your backend URL is correct
3. Ensure your backend endpoints match the expected format
4. Check that your migration has been run successfully

## 🎯 Next Steps

1. **Test the functions** using `testAxios.js`
2. **Update your backend URL** in the files
3. **Test with your CoffeeShop component**
4. **Verify data is saved correctly** in your database

---

**✅ Your Axios integration is now ready to send accurate data to your executive dashboard backend!** 