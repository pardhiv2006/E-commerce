async function fixImagesFinal() {
    const mapping = {
        // Mobiles - Specific & Unique
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

        // Fashion - Unique & Descriptive
        "Ralph Lauren Polo Shirt": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
        "Adidas Essentials Tracksuit": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
        "Levi's 501 Original Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600",
        "Levi's Denim Jacket": "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600",
        "H&M Linen Shirt": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
        "The North Face Rain Jacket": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
        "Nike Sportswear Tech Fleece": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
        "Mango Floral Midi Dress": "https://images.unsplash.com/photo-1572804013307-59c85b3eb6d7?auto=format&fit=crop&q=80&w=600",

        // Electronics
        "Sony WH-1000XM5 Headphones": "/images/sony_black_clean_1771847608171.png",
        "iPad Air 5th Gen": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
        "MacBook Pro 14 M3": "https://images.unsplash.com/photo-1517336719211-15256550243d?auto=format&fit=crop&q=80&w=600",
        "Sony Alpha a7 IV": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
        "Logitech MX Master 3S": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600",

        // Grocery
        "Organic Honey (500g)": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
        "Cold Pressed Olive Oil (1L)": "https://images.unsplash.com/photo-1474979266404-7eaacabc87c5?auto=format&fit=crop&q=80&w=600",
        "Arabica Whole Bean Coffee": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600"
    };

    try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        const products = await response.json();
        console.log(`Analyzing ${products.length} products...`);

        let updatedCount = 0;
        for (const product of products) {
            let newImage = mapping[product.name];

            // Special handling for iPhone 15 Pro Max restoration
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
                const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(patchData)
                });
                if (updateRes.ok) updatedCount++;
                continue;
            }

            if (newImage && product.image !== newImage) {
                const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...product, image: newImage })
                });
                if (updateRes.ok) updatedCount++;
            }
        }
        console.log(`Successfully updated ${updatedCount} products with unique, confirmed visuals!`);
    } catch (err) {
        console.error("API Error:", err.message);
    }
}
fixImagesFinal();
