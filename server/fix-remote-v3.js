import { MongoClient } from 'mongodb';

// Correct credentials from the backend .env
const uri = "mongodb+srv://pardhivmaddu_db_user:d1vxtrFdtsoZiOVs@cluster0.ytwbkbw.mongodb.net/?appName=Cluster0";

async function fixRemote() {
    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();
        const db = client.db('firstmart');
        const collection = db.collection('products');
        
        // Define high-quality, isolated (white/neutral background) images for each category
        const images = {
            'Mobiles': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70', // iPhone 15 Pro Max Natural
            'Electronics': 'https://rukminim2.flixcart.com/image/612/612/k07698w0/headphone/8/3/h/sony-wh-1000xm3-original-imafhzh37jyyguhe.jpeg?q=70', // Headphones
            'Fashion': 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/j/m/v/l-no-den-jack-black-try-this-original-imagr7gefgznvuyz.jpeg?q=70', // Denim Jacket
            'Footwear': 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/i/l/10-rng-eva-740-wht-blk-10-bruton-white-black-original-imahjn6cmwhphfaw.jpeg?q=70', // Shoes
            'Grocery': 'https://rukminim2.flixcart.com/image/612/612/kthjy4w0/honey/h/e/8/pure-honey-saffron-infused-natural-honey-raw-honey-honey-spoon-original-imag6tgr8fngf3hj.jpeg?q=70', // Honey
            'Appliances': 'https://rukminim2.flixcart.com/image/612/612/xif0q/air-conditioner-new/g/w/g/-original-imahfzh87w8yphzg.jpeg?q=70', // AC
            'Home Decor': 'https://rukminim2.flixcart.com/image/612/612/kk8chu80/mirror/v/y/k/3-0-120-shrutih-original-imafzkfzzyghz7zv.jpeg?q=70', // Mirror
            'Beauty & Toys': 'https://rukminim2.flixcart.com/image/612/612/k7f02vk0/educational-toy/s/h/v/millennium-falcon-75257-lego-original-imafpzx9fhygzphw.jpeg?q=70', // LEGO
            'Gaming': 'https://rukminim2.flixcart.com/image/312/312/k5lcvbk0/gaming-console/y/h/g/1-switch-v2-32-nintendo-original-imafz8ayh7jyt5h7.jpeg?q=70', // Nintendo Switch
            'Instruments': 'https://rukminim2.flixcart.com/image/612/612/xif0q/acoustic-guitar/u/t/z/acoustic-guitar-with-accessories-combo-kit-6-string-guitar-original-imaghtky7zhgfzzg.jpeg?q=70' // Guitar
        };

        const products = await collection.find({}).toArray();
        console.log(`Analyzing ${products.length} products...`);
        
        let updatedCount = 0;
        for (const product of products) {
            // Keep the specific high-quality iPhone 15 Pro Max if it already exists with its gallery
            if (product.name === 'iPhone 15 Pro Max') {
                // Ensure the main image is the Natural Titanium isolated shot
                if (!product.image.includes('iphone_natural')) {
                    await collection.updateOne({ _id: product._id }, { $set: { image: '/images/iphone_natural_titanium_clean_1771847498961.png' } });
                    updatedCount++;
                }
                continue;
            }

            // For all other products, apply the category-specific isolated image
            const category = product.category || 'Electronics';
            const newImage = images[category] || images['Electronics'];
            
            // If it's still a broken URL or a dummyjson URL, replace it
            if (!product.image || product.image.includes('dummyjson') || product.image.includes('fakestoreapi') || product.image.includes('unsplash')) {
                await collection.updateOne({ _id: product._id }, { $set: { image: newImage } });
                updatedCount++;
            }
        }
        
        console.log(`Successfully updated ${updatedCount} products with clean isolated visuals!`);
    } catch (e) {
        console.error("Database error:", e.message);
    } finally {
        if (client) await client.close();
    }
}
fixRemote();
