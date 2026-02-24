import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { default as crypto } from 'crypto';
import { fileURLToPath } from 'url';
import { createUser, findUserByEmail, validatePassword } from './models.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Set up uploads directory statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename: timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// MongoDB setup
let db;
let productsCollection;
let ordersCollection;
let usersCollection;

// Initialize MongoDB
async function initDB() {
    try {
        let MONGODB_URI = process.env.MONGODB_URI;

        if (MONGODB_URI) {
            // Sanitize URI
            MONGODB_URI = MONGODB_URI.trim();
            if ((MONGODB_URI.startsWith('"') && MONGODB_URI.endsWith('"')) ||
                (MONGODB_URI.startsWith("'") && MONGODB_URI.endsWith("'"))) {
                MONGODB_URI = MONGODB_URI.slice(1, -1);
            }

            // Detection of placeholder password
            if (MONGODB_URI.includes('<db_password>')) {
                console.warn('⚠️ Detected placeholder <db_password> in MONGODB_URI.');
                if (process.env.NODE_ENV === 'production') {
                    console.error('❌ FATAL: You must provide a real password in your MONGODB_URI for production.');
                    process.exit(1);
                } else {
                    console.info('ℹ️ Falling back to local in-memory database for development...');
                    await useLocalDB();
                    await seedProducts();
                    return true;
                }
            }

            // Production: Use MongoDB Atlas
            console.log('🌐 Connecting to MongoDB Atlas (Production)...');
            try {
                const client = new MongoClient(MONGODB_URI, {
                    connectTimeoutMS: 5000,
                    serverSelectionTimeoutMS: 5000
                });
                await client.connect();
                db = client.db('firstmart');
                productsCollection = db.collection('products');
                ordersCollection = db.collection('orders');
                usersCollection = db.collection('users');
                console.log('✅ Connected to MongoDB Atlas');
            } catch (atlasError) {
                console.error('❌ Failed to connect to MongoDB Atlas:', atlasError.message);

                if (process.env.NODE_ENV === 'production') {
                    throw atlasError;
                }

                console.info('ℹ️ Falling back to local in-memory database...');
                await useLocalDB();
            }
        } else {
            // Prevent in-memory DB in production to avoid crashes
            if (process.env.NODE_ENV === 'production') {
                console.error('❌ FATAL: MONGODB_URI is required in production environment!');
                process.exit(1);
            }

            // Local Development: Use MongoMemoryServer
            await useLocalDB();
        }

        // Seed initial data
        await seedProducts();
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize database:', error);
        throw error;
    }
}

// Helper to setup local in-memory DB
async function useLocalDB() {
    console.log('⚠️ Using in-memory MongoDB with local persistence...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const fs = await import('fs');
    const path = await import('path');
    const dbPath = path.resolve(process.cwd(), 'db-data');

    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
        console.log('📁 Created persistent DB directory:', dbPath);
    }

    const mongod = await MongoMemoryServer.create({
        instance: {
            dbPath: dbPath,
            storageEngine: 'wiredTiger'
        }
    });
    const uri = mongod.getUri();

    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('firstmart');
    productsCollection = db.collection('products');
    ordersCollection = db.collection('orders');
    usersCollection = db.collection('users');
    console.log('✅ Connected to MongoDB (Local)');
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
        const { email, password, username } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await createUser(db, { email, password, username });

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: { id: user._id, email: user.email, username: user.username }
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

        // Stamp last login time
        const lastLoginAt = new Date();
        await db.collection('users').updateOne(
            { _id: user._id },
            { $set: { lastLoginAt } }
        );

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: user._id, email: user.email, username: user.username, lastLoginAt }
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

// Upload Image Route
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }
        // Return the relative URL to access the locally hosted image
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create product
app.post('/api/products', async (req, res) => {
    try {
        const product = req.body;

        // Basic validation
        if (!product.name || typeof product.price !== 'number' || !product.category) {
            return res.status(400).json({ error: 'Name, price, and category are required' });
        }

        // Generate a simple numeric ID if not provided (for frontend compatibility)
        if (!product.id) {
            const lastProduct = await productsCollection.find().sort({ id: -1 }).limit(1).toArray();
            product.id = lastProduct.length > 0 ? (lastProduct[0].id + 1) : 1;
        }

        const result = await productsCollection.insertOne(product);
        res.status(201).json({ ...product, _id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        delete updates._id; // Prevent updating _id

        let query;
        try {
            query = { _id: new ObjectId(id) };
        } catch {
            query = { id: parseInt(id) };
        }

        const result = await productsCollection.findOneAndUpdate(
            query,
            { $set: updates },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = req.params.id;

        let query;
        try {
            query = { _id: new ObjectId(id) };
        } catch {
            query = { id: parseInt(id) };
        }

        const result = await productsCollection.deleteOne(query);
        console.log(`🗑️ Deletion attempt for ID: ${id}, query: ${JSON.stringify(query)}, Result: ${result.deletedCount}`);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Category Management
// Delete all products in a category (effectively deleting the category)
app.delete('/api/categories/:name', async (req, res) => {
    try {
        const categoryName = req.params.name;
        const result = await productsCollection.deleteMany({ category: categoryName });
        console.log(`🗑️ Category deletion: ${categoryName}, Found/Deleted: ${result.deletedCount}`);
        res.json({ message: `Deleted ${result.deletedCount} products from category ${categoryName}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rename a category across all products
app.put('/api/categories/:name', async (req, res) => {
    try {
        const oldName = req.params.name;
        const { newName } = req.body;
        if (!newName) return res.status(400).json({ error: 'New name is required' });

        const result = await productsCollection.updateMany(
            { category: oldName },
            { $set: { category: newName } }
        );
        res.json({ message: `Updated ${result.modifiedCount} products from ${oldName} to ${newName}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order Routes

// Create order
app.post('/api/orders', async (req, res) => {
    try {
        const { items, total, subtotal, discount, discountApplied, customerName, customerEmail } = req.body;

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
            customerName: customerName || 'Guest Customer',
            customerEmail: customerEmail || '',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            expectedDelivery: expectedDelivery.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            status: 'Pending',
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

// Customer Routes

// Get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const users = await usersCollection.find({}, {
            projection: { password: 0 } // Don't send passwords
        }).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'First Mart API is running' });
});

// Root route
app.get('/', (req, res) => {
    res.send('<h1>First Mart Server is running</h1><p>Visit <a href="/api/health">/api/health</a> for status.</p>');
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


