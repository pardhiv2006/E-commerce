import express from 'express';
import cors from 'cors';
// import { MongoMemoryServer } from 'mongodb-memory-server'; // Dynamically imported in dev
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByEmail, validatePassword } from './models.js';

dotenv.config();

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Global Error Handlers
process.on('uncaughtException', (err) => {
    console.error('❌ UNCAUGHT EXCEPTION:', err);
    console.error(err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION:', reason);
    process.exit(1);
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// MongoDB setup
let db;
let productsCollection;
let ordersCollection;

// Initialize MongoDB
async function initDB() {
    try {
        let MONGODB_URI = process.env.MONGODB_URI;

        if (MONGODB_URI) {
            // Sanitize URI (remove quotes if user pasted them, trim whitespace)
            MONGODB_URI = MONGODB_URI.trim();
            if ((MONGODB_URI.startsWith('"') && MONGODB_URI.endsWith('"')) ||
                (MONGODB_URI.startsWith("'") && MONGODB_URI.endsWith("'"))) {
                MONGODB_URI = MONGODB_URI.slice(1, -1);
                console.log('⚠️ Removed surrounding quotes from MONGODB_URI');
            }

            console.log(`🔍 MONGODB_URI check: Length=${MONGODB_URI.length}, StartsWith=${MONGODB_URI.substring(0, 15)}...`);

            if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
                console.error('❌ FATAL: Invalid MONGODB_URI format. It must start with "mongodb://" or "mongodb+srv://"');
                throw new Error('Invalid MONGODB_URI format');
            }

            // Production: Use MongoDB Atlas
            console.log('🌐 Connecting to MongoDB Atlas (Production)...');
            const client = new MongoClient(MONGODB_URI);
            await client.connect();
            db = client.db('firstmart');
            productsCollection = db.collection('products');
            ordersCollection = db.collection('orders');
            console.log('✅ Connected to MongoDB Atlas');
        } else {
            // Prevent in-memory DB in production to avoid crashes
            if (process.env.NODE_ENV === 'production') {
                console.error('❌ FATAL: MONGODB_URI is required in production environment!');
                console.error('Please add MONGODB_URI to your Render Environment Variables.');
                process.exit(1);
            }

            // Local Development: Use MongoMemoryServer
            console.log('⚠️ Using in-memory MongoDB with local persistence...');
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create({
                instance: {
                    dbPath: './db-data',
                    storageEngine: 'wiredTiger'
                }
            });
            const uri = mongod.getUri();

            const client = new MongoClient(uri);
            await client.connect();
            db = client.db('firstmart');
            productsCollection = db.collection('products');
            ordersCollection = db.collection('orders');
            console.log('✅ Connected to MongoDB (Local)');
        }

        // Seed initial data
        await seedProducts();
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize database:', error);
        throw error;
    }
}

// Seed products data
async function seedProducts() {
    const count = await productsCollection.countDocuments();
    if (count === 0) {
        const { products } = await import('./data.js');
        await productsCollection.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);
    }
}

// Auth Routes

// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await createUser(db, { email, password });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await findUserByEmail(db, email);

        if (!user || !(await validatePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Product Routes

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await productsCollection.findOne({ id: parseInt(req.params.id) });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
    try {
        const products = await productsCollection.find({
            category: req.params.category
        }).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search products
app.get('/api/products/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const products = await productsCollection.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order Routes

// Create order
app.post('/api/orders', async (req, res) => {
    try {
        const { items, total, subtotal, discount, discountApplied } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain items' });
        }

        // Generate order ID
        const orderId = `#ORD-${Math.floor(Math.random() * 89999) + 10000}`;

        // Calculate expected delivery date (3-7 days from now)
        const daysToAdd = Math.floor(Math.random() * 5) + 3;
        const expectedDelivery = new Date();
        expectedDelivery.setDate(expectedDelivery.getDate() + daysToAdd);

        const order = {
            id: orderId,
            items: items,
            total: total,
            subtotal: subtotal || total + discount,
            discount: discount || 0,
            discountApplied: discountApplied || false,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            expectedDelivery: expectedDelivery.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            status: 'Ready for Delivery',
            createdAt: new Date(),
            timestamp: Date.now()
        };

        const result = await ordersCollection.insertOne(order);
        res.status(201).json({ ...order, _id: result.insertedId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await ordersCollection.find({}).toArray();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status
app.patch('/api/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        let query;
        try {
            query = { _id: new ObjectId(req.params.id) };
        } catch {
            query = { id: req.params.id };
        }

        const result = await ordersCollection.updateOne(
            query,
            { $set: { status: status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order updated successfully', status });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get orders by status
app.get('/api/orders/status/:status', async (req, res) => {
    try {
        const orders = await ordersCollection.find({ status: req.params.status }).toArray();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
    try {
        let query;
        try {
            query = { _id: new ObjectId(req.params.id) };
        } catch {
            query = { id: req.params.id };
        }

        const order = await ordersCollection.findOne(query);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'First Mart API is running' });
});
// Define PORT (Required for Render)
const PORT = process.env.PORT || 5000;

// Start server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Server failed to start due to DB initialization error:', err);
    process.exit(1);
});


