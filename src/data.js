export const categories = ['All', 'Mobiles', 'Electronics', 'Fashion', 'Footwear', 'Grocery', 'Appliances', 'Home Decor', 'Beauty & Toys'];

export const coupons = [
    { code: 'FIRST10', discount: 0.10, description: '10% off your first order', minAmount: 0 },
    { code: 'SAVE20', discount: 0.20, description: 'Save 20% on orders over $100', minAmount: 100 },
    { code: 'MEGA30', discount: 0.30, description: 'Mega 30% discount on orders over $200', minAmount: 200 },
    { code: 'GROCERY5', discount: 0.05, description: 'Extra 5% off on Groceries', minAmount: 50 },
];

export const products = [
    // Mobiles
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        price: 1199.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
        images: [
            'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600'
        ],
        colorImages: {
            'Natural Titanium': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
            'Blue Titanium': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-blue-titanium-0.jpg',
            'White Titanium': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-white-titanium-0.jpg',
            'Black Titanium': 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-black-titanium-0.jpg'
        },
        description: 'Titanium design, A17 Pro chip, and the most powerful camera system ever in an iPhone.',
        options: {
            storage: ['128GB', '256GB', '512GB', '1TB'],
            colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        },
        variantPricing: {
            storage: { '128GB': 0, '256GB': 100, '512GB': 200, '1TB': 400 }
        }
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        category: 'Mobiles',
        image: '/images/samsung-galaxy-s24-ultra.png',
        images: [
            '/images/samsung-galaxy-s24-ultra.png',
            'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-0.jpg'
        ],
        colorImages: {
            'Titanium Gray': '/images/samsung-galaxy-s24-ultra.png',
            'Titanium Black': '/images/samsung-galaxy-s24-ultra.png',
            'Titanium Violet': '/images/samsung-galaxy-s24-ultra.png',
            'Titanium Yellow': '/images/samsung-galaxy-s24-ultra.png'
        },
        description: 'The ultimate Galaxy Ultra. With Galaxy AI, a 200MP camera, and built-in S Pen.',
        options: {
            storage: ['256GB', '512GB', '1TB'],
            colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']
        },
        variantPricing: {
            storage: { '256GB': 0, '512GB': 150, '1TB': 350 }
        }
    },
    {
        id: 3,
        name: 'Google Pixel 8 Pro',
        price: 999.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg',
        colorImages: {
            'Obsidian': 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-obsidian-0.jpg',
            'Porcelain': 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-porcelain-0.jpg',
            'Bay': 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-bay-0.jpg'
        },
        description: 'The all-pro phone engineered by Google. It\'s sleek, sophisticated, and incredibly helpful.',
        options: {
            storage: ['128GB', '256GB', '512GB'],
            colors: ['Obsidian', 'Porcelain', 'Bay']
        },
        variantPricing: {
            storage: { '128GB': 0, '256GB': 100, '512GB': 200 }
        }
    },
    {
        id: 13,
        name: 'OnePlus 12',
        price: 799.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg',
        colorImages: {
            'Flowy Emerald': 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-green-0.jpg',
            'Silky Black': 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-black-0.jpg'
        },
        description: 'Elite Performance. Pro-level Hasselblad Camera for Mobile. Smooth Beyond Belief.',
        options: {
            storage: ['128GB', '256GB'],
            colors: ['Flowy Emerald', 'Silky Black']
        },
        variantPricing: {
            storage: { '128GB': 0, '256GB': 100 }
        }
    },

    {
        id: 32,
        name: 'Xiaomi 14 Ultra',
        price: 999.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra.jpg',
        colorImages: {
            'Black': 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-black-0.jpg',
            'White': 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-white-0.jpg',
            'Blue': 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-blue-0.jpg'
        },
        description: 'Leica Optics, Snapdragon 8 Gen 3, and a stunning 2K AMOLED display.',
        options: {
            storage: ['256GB', '512GB'],
            colors: ['Black', 'White', 'Blue']
        },
        variantPricing: {
            storage: { '256GB': 0, '512GB': 150 }
        }
    },
    {
        id: 33,
        name: 'Google Pixel 8a',
        price: 499.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8a.jpg',
        description: 'Meet Pixel 8a, the helpful Google phone with the dual camera system.',
        options: {
            storage: ['128GB', '256GB'],
            colors: ['Charcoal', 'Porcelain', 'Bay', 'Aloe']
        },
        variantPricing: {
            storage: { '128GB': 0, '256GB': 60 }
        }
    },
    {
        id: 35,
        name: 'Samsung Galaxy A55 5G',
        price: 449.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
        colorImages: {
            'Awesome Lilac': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-lilac-0.jpg',
            'Awesome Iceblue': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-iceblue-0.jpg',
            'Awesome Navy': 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-navy-0.jpg'
        },
        description: 'Epic camera, immersive display, and outstanding battery life at an incredible value.',
        options: {
            storage: ['128GB', '256GB'],
            colors: ['Awesome Lilac', 'Awesome Iceblue', 'Awesome Navy']
        },
        variantPricing: {
            storage: { '128GB': 0, '256GB': 60 }
        }
    },

    {
        id: 37,
        name: 'Sony Xperia 1 VI',
        price: 1399.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-vi.jpg',
        description: 'The ultimate photographer’s phone with continuous optical zoom.',
        options: {
            storage: ['256GB', '512GB'],
            colors: ['Black', 'Platinum Silver', 'Khaki Green']
        },
        variantPricing: {
            storage: { '256GB': 0, '512GB': 150 }
        }
    },
    {
        id: 38,
        name: 'Asus Zenfone 11 Ultra',
        price: 899.00,
        category: 'Mobiles',
        image: 'https://fdn2.gsmarena.com/vv/bigpic/asus-zenfone-11-ultra.jpg',
        description: 'Go big with Zenfone 11 Ultra. Powerful performance in a large-scale design.',
        options: {
            storage: ['256GB', '512GB'],
            colors: ['Black', 'Silver']
        },
        variantPricing: {
            storage: { '256GB': 0, '512GB': 100 }
        }
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
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600',
        description: 'World-class noise cancellation, spatial audio, and premium comfort.',
        options: {
            colors: ['Silver', 'Black', 'Midnight Blue']
        }
    },

    {
        id: 41,
        name: 'Logitech MX Master 3S',
        price: 99.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
        description: 'An icon remastered. Precision, silence, and flow with advanced darkfield tracking.',
        options: {
            colors: ['Graphite', 'Pale Gray', 'White']
        },
        variantPricing: {
            colors: { 'Graphite': 0, 'Pale Gray': 5, 'White': 10 }
        }
    },
    {
        id: 42,
        name: 'Dell UltraSharp 32" 4K',
        price: 899.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
        description: 'Exceptional visual experience with the world’s first 6K monitor with IPS Black technology.',
        options: {
            colors: ['Black', 'Silver']
        },
        variantPricing: {
            colors: { 'Black': 0, 'Silver': 50 }
        }
    },

    {
        id: 44,
        name: 'DJI Mini 4 Pro',
        price: 759.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced mini drone with 4K HDR video and Omni-directional Obstacle Sensing.',
        options: {
            colors: ['Gray']
        }
    },
    {
        id: 45,
        name: 'Sony Alpha a7 IV',
        price: 2499.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
        description: 'The hybrid hero. Full-frame 33MP sensor for stunning photos and 4K 60p video.',
        options: {
            colors: ['Black']
        }
    },
    {
        id: 46,
        name: 'Keychron Q1 Max',
        price: 189.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&q=80&w=600',
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
        },
        variantPricing: {
            sizes: { 'S': 0, 'M': 0, 'L': 0, 'XL': 5, 'XXL': 10 },
            colors: { 'Light Wash': 0, 'Dark Wash': 5, 'Black': 10 }
        }
    },


    {
        id: 47,
        name: 'Adidas Essentials Tracksuit',
        price: 75.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600',
        description: 'Classic sporty style, comfortable for both workouts and relaxing.'
    },
    {
        id: 18,
        name: 'Nike Sportswear Tech Fleece',
        price: 130.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
        description: 'Innovative fleece fabric provides lightweight warmth and comfort.'
    },
    {
        id: 19,
        name: 'H&M Linen Shirt',
        price: 34.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
        description: 'Breathable linen blend shirt, perfect for warm weather style.'
    },
    {
        id: 48,
        name: 'Ralph Lauren Polo Shirt',
        price: 95.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=600',
        description: 'The iconic Polo shirt, a staple of modern style since 1972.'
    },
    {
        id: 49,
        name: 'Calvin Klein Slim Fit Jeans',
        price: 110.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        description: 'Timeless slim fit jeans with a hint of stretch for comfort.',
        options: {
            sizes: ['28', '30', '32', '34', '36'],
            colors: ['Blue', 'Black', 'Gray']
        },
        variantPricing: {
            colors: { 'Blue': 0, 'Black': 5, 'Gray': 5 }
        }
    },
    {
        id: 50,
        name: 'Mango Floral Midi Dress',
        price: 69.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
        description: 'Elegant floral print dress, perfect for spring and summer outings.',
        options: {
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Floral Pink', 'Floral Blue', 'Floral White']
        },
        variantPricing: {
            colors: { 'Floral Pink': 0, 'Floral Blue': 5, 'Floral White': 10 }
        }
    },
    {
        id: 42,
        name: 'The North Face Rain Jacket',
        price: 150.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1617952236317-0bd127407984?auto=format&fit=crop&q=80&w=600',
        description: 'Waterproof and breathable jacket, perfect for outdoor adventures.',
        options: {
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Black', 'Navy', 'Red', 'Green']
        },
        variantPricing: {
            sizes: { 'S': 0, 'M': 0, 'L': 0, 'XL': 10, 'XXL': 15 },
            colors: { 'Black': 0, 'Navy': 5, 'Red': 10, 'Green': 10 }
        }
    },
    {
        id: 78,
        name: 'Levi\'s 501 Original Jeans',
        price: 89.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        description: 'The blueprint for every pair of jeans in existence.',
        options: {
            sizes: ['28', '30', '32', '34', '36', '38'],
            colors: ['Original Blue', 'Black', 'Light Wash']
        },
        variantPricing: {
            colors: { 'Original Blue': 0, 'Black': 5, 'Light Wash': 5 }
        }
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
        description: 'Lighter than ever. Boost your run with incredible energy return.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Black', 'White', 'Gray']
        },
        variantPricing: {
            colors: { 'Black': 0, 'White': 5, 'Gray': 5 }
        }
    },
    {
        id: 20,
        name: 'Converse Chuck Taylor All Star',
        price: 60.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600',
        description: 'The definitive classic. Canvas upper, rubber sole, and timeless style.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Black', 'White', 'Red', 'Navy']
        },
        variantPricing: {
            colors: { 'Black': 0, 'White': 0, 'Red': 5, 'Navy': 5 }
        }
    },
    {
        id: 52,
        name: 'New Balance 574',
        price: 90.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600',
        description: 'The most iconic New Balance shoe. Classic design and premium comfort.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Gray', 'Navy', 'Black']
        },
        variantPricing: {
            colors: { 'Gray': 0, 'Navy': 5, 'Black': 5 }
        }
    },
    {
        id: 53,
        name: 'Vans Old Skool',
        price: 70.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600',
        description: 'The classic skate shoe and the first to bare the iconic side stripe.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Black/White', 'Navy', 'Red']
        },
        variantPricing: {
            colors: { 'Black/White': 0, 'Navy': 5, 'Red': 5 }
        }
    },

    {
        id: 55,
        name: 'Birkenstock Arizona Sandals',
        price: 110.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1556804335-2fa563e93aae?auto=format&fit=crop&q=80&w=600',
        description: 'The legendary two-strap sandal with the anatomically shaped footbed.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Brown', 'Black', 'White']
        },
        variantPricing: {
            colors: { 'Brown': 0, 'Black': 5, 'White': 5 }
        }
    },

    {
        id: 57,
        name: 'Timberland 6-Inch Premium Boot',
        price: 198.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600',
        description: 'The original waterproof boot. Rugged, durable, and unmistakably Timberland.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Wheat', 'Black', 'Brown']
        },
        variantPricing: {
            colors: { 'Wheat': 0, 'Black': 10, 'Brown': 10 }
        }
    },
    {
        id: 58,
        name: 'Asics Gel-Kayano 30',
        price: 160.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=600',
        description: 'Legendary stability and comfort for long-distance running.',
        options: {
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Black/White', 'Triple White', 'Navy/Red']
        },
        variantPricing: {
            colors: { 'Black/White': 0, 'Triple White': 10, 'Navy/Red': 15 }
        }
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
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=600',
        description: 'Pure, raw organic honey. Great as a natural sweetener.',
        options: {
            weight: ['250g', '500g', '1kg']
        },
        variantPricing: {
            weight: { '250g': 0, '500g': 5, '1kg': 10 }
        }
    },
    {
        id: 58,
        name: 'Quinoa Organic (1kg)',
        price: 15.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=600',
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
        image: 'https://images.unsplash.com/photo-1606791450998-d3859ac80814?auto=format&fit=crop&q=80&w=600',
        description: 'Pure and mineral-rich pink salt for healthy seasoning.'
    },




    // Appliances
    {
        id: 22,
        name: 'LG 260L Frost Free Refrigerator',
        price: 450.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
        description: 'Smart inverter compressor for energy saving and silent operation.'
    },


    {
        id: 24,
        name: 'Midea 1.5 Ton Split AC',
        price: 399.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1619478963499-6475f49fe6de?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1558618048-fd0bfb6c280c?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'High energy efficiency, silent operation, and rapid cooling.'
    },
    {
        id: 64,
        name: 'Panasonic Microwave Oven',
        price: 180.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1584568694244-14fbcee8ebc9?auto=format&fit=crop&q=80&w=600'
        ],
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
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1458684430571-9d5c3df75b5b?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'Create third wave specialty coffee at home from bean to espresso.'
    },

    {
        id: 68,
        name: 'iRobot Roomba j7+',
        price: 799.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'Intelligent robot vacuum that avoids pet waste and cords.'
    },
    {
        id: 82,
        name: 'Philips Air Purifier 2000i',
        price: 299.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1583394293214-ce4c84b1c00d?auto=format&fit=crop&q=80&w=600'
        ],
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
        description: 'Luxurious velvet sofa with a modern silhouette and gold-finished legs.'
    },
    {
        id: 26,
        name: 'Abstract Canvas Wall Art',
        price: 120.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600',
        description: 'Large-scale abstract painting with vibrant colors and expressive brushwork.'
    },
    {
        id: 70,
        name: 'Ceramic Vase Set',
        price: 45.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=600',
        description: 'Set of three minimalist ceramic vases with unique textures.'
    },



    {
        id: 85,
        name: 'Decorative Mirror (Brass)',
        price: 150.00,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
        description: 'Round decorative wall mirror with a hand-polished brass frame.'
    },


    // Beauty & Toys
    {
        id: 28,
        name: 'LEGO Star Wars Millennium Falcon',
        price: 169.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=600',
        description: 'Iconic Star Wars starship recreated with authentic details.'
    },

    {
        id: 30,
        name: 'Plush Teddy Bear',
        price: 25.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&q=80&w=600',
        description: 'Soft and cuddly teddy bear, perfect for kids and adults alike.'
    },

    {
        id: 74,
        name: 'LEGO Technic 4x4 Off-Roader',
        price: 249.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced LEGO Technic building set for realistic off-road play.'
    },
    {
        id: 75,
        name: 'Dyson Airwrap Styler',
        price: 599.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600',
        description: 'Multi-styler to curl, shape, smooth, and hide flyaways with no extreme heat.'
    },


    {
        id: 87,
        name: 'Nintendo Switch OLED',
        price: 349.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=600',
        description: 'The newest addition to the Nintendo Switch family, with a vibrant OLED screen.'
    },
    {
        id: 88,
        name: 'Revlon One-Step Hair Dryer',
        price: 39.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=600',
        description: 'Deliver gorgeous volume and brilliant shine in a single step.'
    },
];
