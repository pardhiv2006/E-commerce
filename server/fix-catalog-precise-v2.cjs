const http = require('http');

const mapping = {
    // --- MOBILES ---
    "iPhone 15 Pro Max": "/images/iphone_natural_titanium_clean_1771847498961.png",
    "Samsung Galaxy S24 Ultra": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600",
    "Google Pixel 8 Pro": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
    "OnePlus 12": "https://images.unsplash.com/photo-1644136979644-88f1767119e0?auto=format&fit=crop&q=80&w=600",
    "Xiaomi 14 Ultra": "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=600",
    "Google Pixel 8a": "https://images.unsplash.com/photo-1610940709436-026978401344?auto=format&fit=crop&q=80&w=600",
    "iPhone 15 Plus": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
    "Motorola Edge 50 Pro": "https://images.unsplash.com/photo-1605170439002-90f450c99b2b?auto=format&fit=crop&q=80&w=600",
    "Sony Xperia 1 VI": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
    "Asus Zenfone 11 Ultra": "https://images.unsplash.com/photo-1512499617640-c74ae3a49dd5?auto=format&fit=crop&q=80&w=600",

    // --- FOOTWEAR ---
    "Nike Air Max 270": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    "Adidas Ultraboost Light": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=600",
    "Converse Chuck Taylor All Star": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600",
    "New Balance 574": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
    "Vans Old Skool": "https://images.unsplash.com/photo-1525966222134-fcfa99bcf26a?auto=format&fit=crop&q=80&w=600",
    "Birkenstock Arizona Sandals": "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=600",
    "Timberland 6-Inch Premium Boot": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600",
    "Asics Gel-Kayano 30": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",

    // --- GROCERY ---
    "Cold Pressed Olive Oil (1L)": "https://images.unsplash.com/photo-1474979266404-7eaacabc87c5?auto=format&fit=crop&q=80&w=600",
    "Arabica Whole Bean Coffee": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    "Organic Honey (500g)": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    "Quinoa Organic (1kg)": "https://images.unsplash.com/photo-1612531383344-77e8a93910c5?auto=format&fit=crop&q=80&w=600",
    "Almond Butter (340g)": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
    "Green Tea Matcha (100g)": "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=600",
    "Himalayan Pink Salt (500g)": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",

    // --- ELECTRONICS ---
    "Sony WH-1000XM5 Headphones": "/images/sony_black_clean_1771847608171.png",
    "iPad Air 5th Gen": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
    "Bose QuietComfort Ultra": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    "Logitech MX Master 3S": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600",
    "Dell UltraSharp 32\" 4K": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
    "DJI Mini 4 Pro": "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600",
    "Sony Alpha a7 IV": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
    "Keychron Q1 Max": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600",

    // --- APPLIANCES ---
    "LG 260L Frost Free Refrigerator": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    "Midea 1.5 Ton Split AC": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    "Panasonic Microwave Oven": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=600",
    "Dyson V15 Detect Vacuum": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600",
    "Breville Barista Pro": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    "iRobot Roomba j7+": "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80&w=600",
    "Philips Air Purifier 2000i": "https://images.unsplash.com/photo-1585771724684-2428f9a60ca2?auto=format&fit=crop&q=80&w=600",
    "Instant Pot Pro 10-in-1": "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600",

    // --- FASHION ---
    "Levi's Denim Jacket": "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600",
    "Nike Sportswear Tech Fleece": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
    "H&M Linen Shirt": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    "Adidas Essentials Tracksuit": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    "Ralph Lauren Polo Shirt": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
    "Calvin Klein Slim Fit Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    "Mango Floral Midi Dress": "https://images.unsplash.com/photo-1572804013307-59c85b3eb6d7?auto=format&fit=crop&q=80&w=600",
    "The North Face Rain Jacket": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
    "Levi's 501 Original Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600"
};

const makeRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body ? JSON.parse(body) : null);
                } else {
                    reject(new Error(`Status ${res.statusCode}: ${body}`));
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function refineCatalogPrecise() {
    try {
        const products = await makeRequest({
            host: '127.0.0.1',
            port: 5001,
            path: '/api/products',
            method: 'GET'
        });

        console.log(`Auditing catalog: ${products.length} products found.`);

        let updatedCount = 0;
        let deletedCount = 0;

        for (const product of products) {
            let newImage = mapping[product.name];
            const id = product._id || product.id;

            if (product.name === 'iPhone 15 Pro Max') {
                const patchData = {
                    ...product,
                    image: "/images/iphone_natural_titanium_clean_1771847498961.png",
                    colorImages: {
                        'Natural Titanium': ['/images/iphone_natural_titanium_clean_1771847498961.png'],
                        'Blue Titanium': ['/images/iphone_blue_titanium_clean_1771847527895.png'],
                        'White Titanium': ['/images/iphone_white_titanium_clean_1771847542906.png'],
                        'Black Titanium': ['/images/iphone_black_titanium_clean_1771847566096.png']
                    }
                };
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products/${id}`,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                }, patchData);
                updatedCount++;
                continue;
            }

            if (newImage) {
                if (product.image !== newImage) {
                    await makeRequest({
                        host: '127.0.0.1',
                        port: 5001,
                        path: `/api/products/${id}`,
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' }
                    }, { ...product, image: newImage });
                    updatedCount++;
                }
            } else {
                console.warn(`Pruning: "${product.name}" (Incomplete visual metadata)`);
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products/${id}`,
                    method: 'DELETE'
                });
                deletedCount++;
            }
        }
        console.log(`--- Sync Summary ---`);
        console.log(`Updated: ${updatedCount} products.`);
        console.log(`Pruned: ${deletedCount} products.`);
    } catch (err) {
        console.error("Execution Error:", err.message);
    }
}
refineCatalogPrecise();
