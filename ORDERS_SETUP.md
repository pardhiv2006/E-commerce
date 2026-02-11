# First Mart - Orders System Setup Guide

## Overview
This guide explains the complete Orders system integration for the First Mart e-commerce application (application-4). The system now features:

- ✅ Full backend order management with MongoDB
- ✅ Order creation from cart checkout
- ✅ Order status tracking (Ready for Delivery → Delivered/Cancelled)
- ✅ Persistent order storage
- ✅ Fallback to localStorage if backend is unavailable
- ✅ Real-time order synchronization between frontend and backend

## Architecture

### Backend (Node.js + Express + MongoDB)
- **Location**: `server/`
- **Database**: MongoDB (in-memory for development)
- **Port**: 5001

#### Order Endpoints:
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `GET /api/orders/status/:status` - Get orders by status
- `PATCH /api/orders/:id` - Update order status
- `GET /api/health` - Health check

### Frontend (React + Vite)
- **Location**: Application root
- **Port**: 5173 (default Vite)
- **State Management**: React Context (ShopContext)

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the backend server:

```bash
# For development with auto-reload
npm run dev

# For production
npm start
```

You should see:
```
✅ Connected to in-memory MongoDB
✅ Seeded X products
🚀 Server running on http://localhost:5001
```

### 2. Frontend Setup

From the application root directory:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage Flow

### Complete Order Workflow:

1. **Browse & Add to Cart**
   - Browse products in the Shop page
   - Add items to cart with optional variants

2. **View Cart**
   - Navigate to `/cart`
   - Review items and prices
   - Click "PLACE ORDER" to checkout

3. **Order Created**
   - Order automatically created and saved to backend
   - User redirected to `/orders` page
   - Order appears in "My Orders" section

4. **Order Management**
   - View order status (Ready for Delivery / Delivered / Cancelled)
   - Cancel orders (status: Ready for Delivery)
   - Mark as received (status: Ready for Delivery → Delivered)

5. **Fallback Behavior**
   - If backend is unavailable, orders are saved to localStorage
   - When backend comes online, orders sync automatically
   - Users experience seamless transition

## Order Model Schema

### Frontend Order Object:
```javascript
{
  id: "#ORD-12345",                           // Unique order ID
  date: "Feb 9, 2026",                        // Order date
  expectedDelivery: "Wed, Feb 12, 2026",      // Expected delivery
  total: 299.99,                              // Final amount
  subtotal: 399.99,                           // Before discount
  discount: 100.00,                           // Discount amount
  items: [                                    // Cart items
    {
      id: 1,
      name: "Product Name",
      price: 99.99,
      quantity: 3,
      image: "image_url",
      selectedOptions: { color: "Red", size: "M" }
    }
  ],
  status: "Ready for Delivery",               // Status
  discountApplied: true,
  timestamp: 1707500000000                    // For sorting
}
```

## API Examples

### Create Order
```bash
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "total": 299.99,
    "subtotal": 399.99,
    "discount": 100.00,
    "discountApplied": true
  }'
```

### Get All Orders
```bash
curl http://localhost:5001/api/orders
```

### Cancel Order
```bash
curl -X PATCH http://localhost:5001/api/orders/%23ORD-12345 \
  -H "Content-Type: application/json" \
  -d '{"status": "Cancelled"}'
```

### Mark as Delivered
```bash
curl -X PATCH http://localhost:5001/api/orders/%23ORD-12345 \
  -H "Content-Type: application/json" \
  -d '{"status": "Delivered"}'
```

## Frontend Context API (ShopContext)

### Available Methods:
```javascript
const {
  orders,                          // Array of orders
  checkout(total, discount),      // Create order
  cancelOrder(orderId),            // Cancel order
  markOrderDelivered(orderId),    // Mark delivered
  isLoading,                       // Loading state
  error,                           // Error message
  backendAvailable,                // Backend status
  syncOrdersFromBackend()          // Manual sync
} = useShop();
```

## Testing the System

### Manual Testing Steps:

1. **Start Backend**
   ```bash
   cd server && npm run dev
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Create an Order**
   - Go to Shop page
   - Add items to cart
   - Go to Cart
   - Click "PLACE ORDER"
   - Should redirect to Orders page with new order

4. **Test Order Actions**
   - Click "Cancel Order" - should change status to Cancelled
   - Click "Mark as Received" - should change status to Delivered

5. **Test Backend Persistence**
   - Create an order (verify in backend console)
   - Refresh the page - order should persist
   - Stop backend and refresh - orders load from localStorage
   - Restart backend - orders sync automatically

6. **Test Offline Fallback**
   - Stop the backend server
   - Create a new order - should still work with localStorage
   - Start backend - order syncs to backend

## Troubleshooting

### Orders Not Persisting
- Check backend is running: `curl http://localhost:5001/api/health`
- Check browser console for API errors
- Verify MongoDB Memory Server is initialized

### Backend Won't Start
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend Can't Connect to Backend
- Verify backend is running on port 5001
- Check CORS is enabled (it is in server.js)
- Check API_BASE_URL in `src/services/api.js` points to correct port

### Orders Don't Sync from Backend
- Check backend has orders: `curl http://localhost:5001/api/orders`
- Manually trigger sync: Call `syncOrdersFromBackend()` from context
- Check browser console for errors

## File Structure

```
application-4/
├── src/
│   ├── pages/
│   │   ├── Orders.jsx          # Orders page component
│   │   ├── Orders.css
│   │   └── Cart.jsx            # Updated with checkout integration
│   ├── context/
│   │   └── ShopContext.jsx      # Backend integration added
│   ├── services/
│   │   └── api.js              # API service with order endpoints
│   └── App.jsx                 # Routes configured
├── server/
│   ├── server.js               # Enhanced with order endpoints
│   ├── data.js                 # Product seed data
│   └── package.json
└── ORDERS_SETUP.md             # This file
```

## Features Implemented

✅ **Order Creation**
- Automatic order ID generation
- Expected delivery date calculation
- Discount tracking
- Item quantity and variant preservation

✅ **Order Persistence**
- MongoDB backend storage
- LocalStorage fallback
- Automatic sync on app load

✅ **Order Management**
- Cancel orders
- Mark as delivered
- View order history
- Filter by status

✅ **Error Handling**
- Graceful backend failure handling
- Fallback to localStorage
- User-friendly error messages
- Automatic retry on sync

✅ **User Experience**
- Loading states during operations
- Real-time order updates
- Responsive order display
- Clear order status indicators

## Performance Notes

- In-memory MongoDB is suitable for development/demo
- For production, use a real MongoDB instance
- Order queries are optimized with proper indexing support
- Lazy loading recommended for large order lists

## Future Enhancements

- Order search and filtering
- Advanced order analytics
- Order notifications
- Payment integration
- Order history export
- Real-time delivery tracking
- Order reviews and ratings

---

**Version**: 1.0.0  
**Last Updated**: February 9, 2026  
**Status**: Production Ready
