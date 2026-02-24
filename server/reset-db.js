import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI || "mongodb+srv://trivenis:triveni1234@firstmart.w1v5u.mongodb.net/firstmart?retryWrites=true&w=majority&appName=FIRSTMART";

async function resetDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('firstmart');
        const result = await db.collection('products').deleteMany({});
        console.log(`Deleted ${result.deletedCount} products. Collection is now empty.`);
        await client.close();
    } catch (e) {
        console.error(e);
    }
}
resetDB();
