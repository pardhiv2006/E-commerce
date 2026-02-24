import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://trivenis:triveni1234@firstmart.w1v5u.mongodb.net/firstmart?retryWrites=true&w=majority&appName=FIRSTMART";

async function fixImages() {
    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();
        const db = client.db('firstmart');
        const collection = db.collection('products');
        
        // Use high-quality Unsplash isolated images which are more reliable than DummyJSON thumbnails
        const images = {
            'phone': 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=600',
            'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600',
            'shoe': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
            'watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
            'shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
            'bag': 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=600',
            'tablet': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
            'audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
            'camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
            'default': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
        };

        const products = await collection.find({}).toArray();
        console.log(`Found ${products.length} products to check.`);
        
        let updatedCount = 0;
        for (const product of products) {
            const context = (product.name + " " + product.category + " " + product.description).toLowerCase();
            let newImage = images.default;
            
            if (context.includes('phone') || context.includes('ultra') || context.includes('pro max') || context.includes('mobile')) {
                newImage = images.phone;
            } else if (context.includes('laptop') || context.includes('macbook') || context.includes('notebook')) {
                newImage = images.laptop;
            } else if (context.includes('shoe') || context.includes('sneaker') || context.includes('footwear')) {
                newImage = images.shoe;
            } else if (context.includes('watch') || context.includes('clock')) {
                newImage = images.watch;
            } else if (context.includes('shirt') || context.includes('jacket') || context.includes('t-shirt') || context.includes('clothing')) {
                newImage = images.shirt;
            } else if (context.includes('bag') || context.includes('backpack')) {
                newImage = images.bag;
            } else if (context.includes('tablet') || context.includes('ipad')) {
                newImage = images.tablet;
            } else if (context.includes('audio') || context.includes('headphone') || context.includes('speaker')) {
                newImage = images.audio;
            } else if (context.includes('camera') || context.includes('photography')) {
                newImage = images.camera;
            }
            
            if (product.image !== newImage) {
                await collection.updateOne({ _id: product._id }, { $set: { image: newImage } });
                updatedCount++;
            }
        }
        
        console.log(`Successfully updated ${updatedCount} products with reliable images!`);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
    }
}
fixImages();
