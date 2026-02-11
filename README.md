# First Mart - E-Commerce Application

A modern e-commerce application built with React and Express, featuring product browsing, search, cart management, and order placement.

## Features

- 🛍️ Browse products by category
- 🔍 Search products by name, category, or description
- 🎨 Product variants (colors, sizes, storage, weight)
- 🛒 Shopping cart with variant support
- 📦 Order management with delivery tracking
- 💾 Backend API with MongoDB

## Tech Stack

### Frontend
- React 18
- React Router
- Vite
- CSS3

### Backend
- Node.js
- Express
- MongoDB (in-memory)
- CORS

## Getting Started

### Prerequisites
- Node.js 16+ installed

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

1. Start the backend server (from the root directory):
```bash
cd server
npm run dev
```
The backend will run on `http://localhost:5000`

2. In a new terminal, start the frontend (from the root directory):
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id` - Update order status
- `GET /api/health` - Health check

## Project Structure

```
application-4/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   ├── services/          # API services
│   └── data.js            # Product data
├── server/                # Backend source code
│   ├── server.js          # Express server
│   ├── data.js            # Product data (copy)
│   └── package.json       # Backend dependencies
└── public/                # Static assets
```

## Features in Detail

### Product Variants
Products can have multiple options:
- **Mobiles**: Storage (128GB, 256GB, etc.) and Colors
- **Fashion**: Sizes (S, M, L, XL) and Colors
- **Footwear**: Sizes (UK 7-11) and Colors
- **Grocery**: Weight (250g, 500g, 1kg) or Quantity (500ml, 1L, etc.)

### Cart Management
- Add products with selected variants
- Update quantities
- Remove items
- Different variants of the same product are treated as separate items

### Order Tracking
- Random order status (Ready for Delivery or Delivered)
- Expected delivery dates
- Order cancellation (for orders ready for delivery)

## License

MIT
