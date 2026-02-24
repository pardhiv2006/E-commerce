import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://pardhivmaddu_db_user:d1vxtrFdtsoZiOVs@cluster0.ytwbkbw.mongodb.net/?appName=Cluster0";

async function fixRemote() {
    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();
        const db = client.db('firstmart');
        const collection = db.collection('products');
        
        const products = await collection.find({ image: /fakestoreapi|unsplash/ }).toArray();
        console.log(`Found ${products.length} products with broken external images.`);
        
        let updatedCount = 0;
        for (const product of products) {
            const context = (product.name + " " + product.category + " " + product.description).toLowerCase();
            let newImage = 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg';
            
            if (context.includes('laptop') || context.includes('macbook')) {
                newImage = 'https://cdn.dummyjson.com/product-images/6/thumbnail.jpg';
            } else if (context.includes('shoe') || context.includes('sneaker')) {
                newImage = 'https://cdn.dummyjson.com/product-images/56/thumbnail.jpg';
            } else if (context.includes('shirt') || context.includes('jacket')) {
                newImage = 'https://cdn.dummyjson.com/product-images/53/thumbnail.jpg';
            } else if (context.includes('watch')) {
                newImage = 'https://cdn.dummyjson.com/product-images/61/thumbnail.jpg';
            } else if (context.includes('bag') || context.includes('backpack')) {
                newImage = 'https://cdn.dummyjson.com/product-images/71/thumbnail.jpg';
            } else if (context.includes('headphones') || context.includes('audio')) {
                 newImage = 'https://cdn.dummyjson.com/product-images/100/thumbnail.jpg';
            }
            
            await collection.updateOne({ _id: product._id }, { $set: { image: newImage } });
            updatedCount++;
        }
        
        console.log(`Successfully updated ${updatedCount} products in the remote database!`);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
    }
}
fixRemote();
