import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log('Testing Atlas connection...');
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI not found in environment');
        return;
    }

    // Mask password in logs
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log('URI:', maskedUri);

    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000
    });

    try {
        await client.connect();
        console.log('✅ Successfully connected to MongoDB Atlas!');
        const db = client.db('firstmart');
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        await client.close();
    } catch (err) {
        console.error('❌ Connection failed error name:', err.name);
        console.error('❌ Connection failed message:', err.message);

        if (err.message.includes('authentication failed') || err.message.includes('bad auth')) {
            console.log('RESULT: AUTH_FAILURE');
        } else if (err.name === 'MongoServerSelectionError') {
            console.log('RESULT: NETWORK_OR_IP_WHITELIST_ISSUE');
        } else {
            console.log('RESULT: OTHER_ERROR');
        }
    }
}

test();
