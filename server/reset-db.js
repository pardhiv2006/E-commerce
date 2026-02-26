import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function resetDB() {
    // If running in development with in-memory DB, we mostly care about the live API
    // but the server itself manages the DB. We'll use the API if possible or direct DB access.
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/first-mart";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB for reset...");
        const db = client.db();
        const collection = db.collection('products');

        const result = await collection.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} products from database.`);

        // Also categories if needed, but products is the main one
    } catch (err) {
        console.error("Reset Error:", err.message);
    } finally {
        await client.close();
    }
}

resetDB();
