async function fixImagesGranular() {
    // Specific, high-quality isolated visuals from Unsplash (curated)
    const mapping = {
        "Abstract Canvas Wall Art": "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600",
        "Adidas Essentials Tracksuit": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
        "Adidas Ultraboost Light": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=600",
        "Almond Butter (340g)": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
        "Arabica Whole Bean Coffee": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
        "Asics Gel-Kayano 30": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
        "Asus Zenfone 11 Ultra": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
        "Birkenstock Arizona Sandals": "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=600",
        "Bose QuietComfort Ultra": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
        "Breville Barista Pro": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
        "Calvin Klein Slim Fit Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
        "Ceramic Vase Set": "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=600",
        "Cold Pressed Olive Oil (1L)": "https://images.unsplash.com/photo-1474979266404-7eaacabc87c5?auto=format&fit=crop&q=80&w=600",
        "Converse Chuck Taylor All Star": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600",
        "DJI Mini 4 Pro": "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600",
        "Decorative Mirror (Brass)": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
        "Dell UltraSharp 32\" 4K": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
        "Dyson Airwrap Styler": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600",
        "Dyson V15 Detect Vacuum": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600",
        "Google Pixel 8 Pro": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600",
        "Google Pixel 8a": "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=600",
        "Green Tea Matcha (100g)": "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=600",
        "Guitar": "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=600",
        "H&M Linen Shirt": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
        "Himalayan Pink Salt (500g)": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
        "Initial Product for Gaming": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=600",
        "Initial Product for Instruments": "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=600",
        "Instant Pot Pro 10-in-1": "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600",
        "Keychron Q1 Max": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600",
        "LEGO Star Wars Millennium Falcon": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=600",
        "LEGO Technic 4x4 Off-Roader": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
        "LG 260L Frost Free Refrigerator": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
        "Levi's 501 Original Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600",
        "Levi's Denim Jacket": "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600",
        "Logitech MX Master 3S": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600",
        "Mango Floral Midi Dress": "https://images.unsplash.com/photo-1572804013307-59c85b3eb6d7?auto=format&fit=crop&q=80&w=600",
        "Midea 1.5 Ton Split AC": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
        "Modern Velvet Sofa": "https://images.unsplash.com/photo-1550254478-ead40cd82477?auto=format&fit=crop&q=80&w=600",
        "Motorola Edge 50 Pro": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
        "New Balance 574": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
        "Nike Air Max 270": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
        "Nike Sportswear Tech Fleece": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
        "Nintendo Switch OLED": "https://images.unsplash.com/photo-1578303512726-dd309d9418af?auto=format&fit=crop&q=80&w=600",
        "OnePlus 12": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600",
        "Organic Honey (500g)": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
        "Panasonic Microwave Oven": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=600",
        "Philips Air Purifier 2000i": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
        "Plush Teddy Bear": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=600",
        "Quinoa Organic (1kg)": "https://images.unsplash.com/photo-1612531383344-77e8a93910c5?auto=format&fit=crop&q=80&w=600",
        "Ralph Lauren Polo Shirt": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
        "Revlon One-Step Hair Dryer": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600",
        "Samsung Galaxy S24 Ultra": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600",
        "Sony Alpha a7 IV": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
        "Sony WH-1000XM5 Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
        "Sony Xperia 1 VI": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
        "The North Face Rain Jacket": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
        "Timberland 6-Inch Premium Boot": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
        "Vans Old Skool": "https://images.unsplash.com/photo-1525966222134-fcfa99bcf26a?auto=format&fit=crop&q=80&w=600",
        "Xiaomi 14 Ultra": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600",
        "iPad Air 5th Gen": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
        "iPhone 15 Plus": "https://images.unsplash.com/photo-1610940882244-5966236ca446?auto=format&fit=crop&q=80&w=600"
    };

    try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        const products = await response.json();
        console.log(`Analyzing ${products.length} products...`);

        let updatedCount = 0;
        for (const product of products) {
            let newImage = mapping[product.name];

            // SPECIAL HANDLING FOR iPhone 15 Pro Max - RESTORE LOCAL PATHS
            if (product.name === 'iPhone 15 Pro Max') {
                newImage = '/images/iphone_natural_titanium_clean_1771847498961.png';
                const patchData = {
                    ...product,
                    image: newImage,
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

            // For all other products, use the mapping or a default isolated shot based on category
            if (!newImage) {
                if (product.category === 'Mobiles') newImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600";
                else if (product.category === 'Electronics') newImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600";
                else newImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600";
            }

            const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, image: newImage })
            });
            if (updateRes.ok) updatedCount++;
        }
        console.log(`Successfully updated ${updatedCount} products with product-specific visuals!`);
    } catch (err) {
        console.error("API Error:", err.message);
    }
}
fixImagesGranular();
