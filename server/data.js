export const categories = ['All', 'Mobiles', 'Electronics', 'Fashion', 'Footwear', 'Grocery', 'Appliances', 'Home Decor', 'Beauty & Toys'];

export const coupons = [
    { code: 'FIRST10', discount: 0.10, description: '10% off your first order', minAmount: 0 },
    { code: 'SAVE20', discount: 0.20, description: 'Save 20% on orders over $100', minAmount: 100 },
    { code: 'MEGA30', discount: 0.30, description: 'Mega 30% discount on orders over $200', minAmount: 200 },
];

export const products = [
    // Mobiles
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        price: 1199.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600',
        description: 'Titanium design, A17 Pro chip, and the most powerful camera system ever in an iPhone.',
        options: {
            storage: ['128GB', '256GB', '512GB', '1TB'],
            colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        }
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
        description: 'The ultimate Galaxy Ultra. With Galaxy AI, a 200MP camera, and built-in S Pen.',
        options: {
            storage: ['256GB', '512GB', '1TB'],
            colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']
        }
    },
    {
        id: 3,
        name: 'Google Pixel 8 Pro',
        price: 999.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
        description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and incredibly helpful.',
        options: {
            storage: ['128GB', '256GB', '512GB'],
            colors: ['Obsidian', 'Porcelain', 'Bay']
        }
    },
    {
        id: 13,
        name: 'OnePlus 12',
        price: 799.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=600',
        description: 'Elite Performance. Pro-level Hasselblad Camera for Mobile. Smooth Beyond Belief.',
        options: {
            storage: ['128GB', '256GB'],
            colors: ['Flowy Emerald', 'Silky Black']
        }
    },

    {
        id: 32,
        name: 'Xiaomi 14 Ultra',
        price: 999.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
        description: 'Leica Optics, Snapdragon 8 Gen 3, and a stunning 2K AMOLED display.'
    },
    {
        id: 33,
        name: 'Google Pixel 8a',
        price: 499.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
        description: 'The most helpful Google phone yet, now at a more affordable price.'
    },
    {
        id: 34,
        name: 'iPhone 15 Plus',
        price: 899.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600',
        description: 'A huge screen, amazing camera, and incredible battery life.'
    },
    {
        id: 35,
        name: 'Motorola Edge 50 Pro',
        price: 599.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
        description: 'Curved display, 125W fast charging, and a versatile camera system.'
    },

    {
        id: 37,
        name: 'Sony Xperia 1 VI',
        price: 1399.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600',
        description: 'The ultimate photographer’s phone with continuous optical zoom.'
    },
    {
        id: 38,
        name: 'Asus Zenfone 11 Ultra',
        price: 899.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
        description: 'Go big with Zenfone 11 Ultra. Powerful performance in a large-scale design.'
    },

    // Electronics
    {
        id: 14,
        name: 'Sony WH-1000XM5 Headphones',
        price: 349.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
        description: 'Industry-leading noise cancellation, crystal clear hands-free calling, and 30-hour battery life.',
        options: {
            colors: ['Silver', 'Black', 'Midnight Blue']
        }
    },

    {
        id: 16,
        name: 'iPad Air 5th Gen',
        price: 599.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
        description: 'Light. Bright. Full of might. The iPad Air is available in five gorgeous colors.'
    },

    {
        id: 39,
        name: 'Bose QuietComfort Ultra',
        price: 429.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
        description: 'World-class noise cancellation, spatial audio, and premium comfort.'
    },

    {
        id: 41,
        name: 'Logitech MX Master 3S',
        price: 99.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
        description: 'An icon remastered. Precision, silence, and flow with advanced darkfield tracking.'
    },
    {
        id: 42,
        name: 'Dell UltraSharp 32" 4K',
        price: 899.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
        description: 'Exceptional visual experience with the world’s first 6K monitor with IPS Black technology.'
    },

    {
        id: 44,
        name: 'DJI Mini 4 Pro',
        price: 759.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced mini drone with 4K HDR video and Omni-directional Obstacle Sensing.'
    },
    {
        id: 45,
        name: 'Sony Alpha a7 IV',
        price: 2499.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
        description: 'The hybrid hero. Full-frame 33MP sensor for stunning photos and 4K 60p video.'
    },
    {
        id: 46,
        name: 'Keychron Q1 Max',
        price: 189.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600',
        description: 'Premium custom mechanical keyboard for the ultimate typing experience.'
    },

    // Fashion
    {
        id: 4,
        name: 'Levi\'s Denim Jacket',
        price: 89.50,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=600',
        description: 'The original jean jacket since 1967. A blank canvas for self-expression.',
        options: {
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Light Wash', 'Dark Wash', 'Black']
        }
    },

    {
        id: 18,
        name: 'Nike Sportswear Tech Fleece',
        price: 120.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
        description: 'Lightweight warmth. Sleek design. Perfect for everyday wear.'
    },
    {
        id: 19,
        name: 'H&M Linen Shirt',
        price: 29.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
        description: 'Breathable linen shirt for hot summer days. Available in multiple colors.'
    },
    {
        id: 47,
        name: 'Adidas Essentials Tracksuit',
        price: 75.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
        description: 'Classic sporty style, comfortable for both workouts and relaxing.'
    },
    {
        id: 48,
        name: 'Ralph Lauren Polo Shirt',
        price: 95.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=600',
        description: 'The iconic Polo shirt, a staple of modern style since 1972.'
    },
    {
        id: 49,
        name: 'Calvin Klein Slim Fit Jeans',
        price: 110.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        description: 'Timeless slim fit jeans with a hint of stretch for comfort.'
    },
    {
        id: 50,
        name: 'Mango Floral Midi Dress',
        price: 69.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
        description: 'Elegant floral print dress, perfect for spring and summer outings.'
    },
    {
        id: 51,
        name: 'The North Face Rain Jacket',
        price: 150.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600',
        description: 'Waterproof and breathable jacket for maximum outdoor protection.'
    },
    {
        id: 78,
        name: 'Levi\'s 501 Original Jeans',
        price: 89.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        description: 'The blueprint for every pair of jeans in existence.'
    },


    // Footwear
    {
        id: 7,
        name: 'Nike Air Max 270',
        price: 150.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
        description: 'Features a large Max Air unit for maximum cushioning. Bold and versatile.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['White', 'Black', 'Blue/Orange']
        }
    },
    {
        id: 8,
        name: 'Adidas Ultraboost Light',
        price: 190.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=600',
        description: 'Lighter than ever. Boost your run with incredible energy return.'
    },
    {
        id: 20,
        name: 'Converse Chuck Taylor All Star',
        price: 60.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600',
        description: 'The definitive classic. Canvas upper, rubber sole, and timeless style.'
    },
    {
        id: 52,
        name: 'New Balance 574',
        price: 90.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
        description: 'The most iconic New Balance shoe. Classic design and premium comfort.'
    },
    {
        id: 53,
        name: 'Vans Old Skool',
        price: 70.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600',
        description: 'The classic skate shoe and the first to bare the iconic side stripe.'
    },

    {
        id: 55,
        name: 'Birkenstock Arizona Sandals',
        price: 110.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
        description: 'The legendary two-strap sandal with the anatomically shaped footbed.'
    },

    {
        id: 57,
        name: 'Timberland 6-Inch Premium Boot',
        price: 198.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600',
        description: 'The original waterproof boot. Rugged, durable, and unmistakably Timberland.'
    },
    {
        id: 80,
        name: 'Asics Gel-Kayano 30',
        price: 160.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced stability and comfort for long-distance running.'
    },

    // Grocery
    {
        id: 10,
        name: 'Cold Pressed Olive Oil (1L)',
        price: 24.50,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600',
        description: 'Extra virgin olive oil. Heart-healthy and delicious.',
        options: {
            quantity: ['500ml', '1L', '2L', '5L']
        }
    },
    {
        id: 11,
        name: 'Arabica Whole Bean Coffee',
        price: 18.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600',
        description: 'Rich, smooth, and aromatic coffee beans.',
        options: {
            weight: ['250g', '500g', '1kg']
        }
    },
    {
        id: 21,
        name: 'Organic Honey (500g)',
        price: 12.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
        description: 'Pure, raw organic honey. Great as a natural sweetener.',
        options: {
            weight: ['250g', '500g', '1kg']
        }
    },
    {
        id: 58,
        name: 'Quinoa Organic (1kg)',
        price: 15.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
        description: 'High-protein grain. Perfect for salads and healthy side dishes.'
    },
    {
        id: 59,
        name: 'Almond Butter (340g)',
        price: 14.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600',
        description: 'Creamy and nutritious almond butter with no added sugar.'
    },
    {
        id: 60,
        name: 'Green Tea Matcha (100g)',
        price: 22.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=600',
        description: 'Premium grade ceremonial matcha powder for traditional tea or lattes.'
    },
    {
        id: 61,
        name: 'Himalayan Pink Salt (500g)',
        price: 8.50,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
        description: 'Pure and mineral-rich pink salt for healthy seasoning.'
    },




    // Appliances
    {
        id: 22,
        name: 'LG 260L Frost Free Refrigerator',
        price: 499.00,
        category: 'Appliances',
        image: 'https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?auto=format&fit=crop&q=80&w=600',
        description: 'Smart Inverter Compressor, Multi Air Flow, and Door Cooling+.'
    },

    {
        id: 24,
        name: 'Midea 1.5 Ton Split AC',
        price: 399.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
        description: 'High energy efficiency, silent operation, and rapid cooling.'
    },
    {
        id: 64,
        name: 'Panasonic Microwave Oven',
        price: 180.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
        description: 'Quick and even cooking with inverter technology.'
    },
    {
        id: 65,
        name: 'Dyson V15 Detect Vacuum',
        price: 749.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600',
        description: 'The most powerful, intelligent cordless vacuum with laser illumination.'
    },
    {
        id: 66,
        name: 'Breville Barista Pro',
        price: 849.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1517639493569-5666a7b2f494?auto=format&fit=crop&q=80&w=600',
        description: 'Create third wave specialty coffee at home from bean to espresso.'
    },

    {
        id: 68,
        name: 'iRobot Roomba j7+',
        price: 799.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600',
        description: 'Intelligent robot vacuum that avoids pet waste and cords.'
    },
    {
        id: 82,
        name: 'Philips Air Purifier 2000i',
        price: 299.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=600',
        description: 'Removes 99.97% of allergens and pollutants from your home.'
    },
    {
        id: 83,
        name: 'Instant Pot Pro 10-in-1',
        price: 149.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600',
        description: 'The next generation of the best-selling multi-cooker.'
    },

    // Home Decor
    {
        id: 25,
        name: 'Modern Velvet Sofa',
        price: 899.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
        description: 'Luxurious velvet sofa with gold-finish legs. A statement piece for your living room.'
    },
    {
        id: 26,
        name: 'Abstract Canvas Wall Art',
        price: 75.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600',
        description: 'Vibrant abstract wall art. Perfect for adding a touch of color to your space.'
    },


    {
        id: 70,
        name: 'Ceramic Vase Set',
        price: 45.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=600',
        description: 'Set of three modern ceramic vases in earthy tones.'
    },



    {
        id: 85,
        name: 'Decorative Mirror (Brass)',
        price: 110.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
        description: 'Large circular mirror with a slim brass-finish frame.'
    },


    // Beauty & Toys
    {
        id: 28,
        name: 'LEGO Star Wars Millennium Falcon',
        price: 160.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=600',
        description: 'The perfect gift for Star Wars fans. Detailed Millennium Falcon set.'
    },

    {
        id: 30,
        name: 'Plush Teddy Bear',
        price: 25.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=600',
        description: 'Soft and cuddly teddy bear. A classic toy for kids of all ages.'
    },

    {
        id: 74,
        name: 'LEGO Technic 4x4 Off-Roader',
        price: 199.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=600',
        description: 'Powerful remote-controlled off-roader with advanced suspension.'
    },
    {
        id: 75,
        name: 'Dyson Airwrap Styler',
        price: 599.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600',
        description: 'Curl, wave, smooth, and dry without extreme heat.'
    },


    {
        id: 87,
        name: 'Nintendo Switch OLED',
        price: 349.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=600',
        description: 'Vibrant 7-inch OLED screen, wide adjustable stand, and enhanced audio.'
    },
    {
        id: 88,
        name: 'Revlon One-Step Hair Dryer',
        price: 45.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600',
        description: 'Deliver gorgeous volume and brilliant shine in a single step.'
    },
];
