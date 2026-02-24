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
        image: '/images/iphone_natural_titanium_clean_1771847498961.png',
        description: 'Titanium design, A17 Pro chip, and the most powerful camera system ever in an iPhone.',
        options: {
            storage: ['128GB', '256GB', '512GB', '1TB'],
            colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        },
        colorImages: {
            'Natural Titanium': [
                '/images/iphone_natural_titanium_clean_1771847498961.png'
            ],
            'Blue Titanium': [
                '/images/iphone_blue_titanium_clean_1771847527895.png'
            ],
            'White Titanium': [
                '/images/iphone_white_titanium_clean_1771847542906.png'
            ],
            'Black Titanium': [
                '/images/iphone_black_titanium_clean_1771847566096.png'
            ]
        },
        variantPricing: {
            storage: {
                '128GB': 0,
                '256GB': 100,
                '512GB': 300,
                '1TB': 500
            }
        }
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 1299.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1610940882244-5966236ca446?w=800&q=80',
        description: 'The ultimate Galaxy Ultra. With Galaxy AI, a 200MP camera, and built-in S Pen.',
        options: {
            storage: ['256GB', '512GB', '1TB'],
            colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']
        },
        variantPricing: {
            storage: {
                '256GB': 0,
                '512GB': 200,
                '1TB': 450
            }
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
        image: 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=800&q=80',
        description: 'Elite Performance. Pro-level Hasselblad Camera for Mobile. Smooth Beyond Belief.',
        options: {
            storage: ['128GB', '256GB'],
            colors: ['Flowy Emerald', 'Silky Black']
        }
    },

    {
        id: 34,
        name: 'Motorola Edge 50 Pro',
        price: 450.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1605170439002-90f450c99b2b?w=800&q=80',
        description: 'Intelligence meets art. World first AI powered pro-grade camera.'
    },
    {
        id: 37,
        name: 'Sony Xperia 1 VI',
        price: 1399.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
        description: 'The ultimate photographer’s phone with continuous optical zoom.'
    },
    {
        id: 38,
        name: 'Asus Zenfone 11 Ultra',
        price: 899.00,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a49dd5?auto=format&fit=crop&q=80&w=600',
        description: 'Go big with Zenfone 11 Ultra. Powerful performance in a large-scale design.'
    },

    // Electronics
    {
        id: 14,
        name: 'Sony WH-1000XM5 Headphones',
        price: 349.00,
        category: 'Electronics',
        image: '/images/sony_black_clean_1771847608171.png',
        description: 'Industry-leading noise cancellation, crystal clear hands-free calling, and 30-hour battery life.',
        options: {
            colors: ['Silver', 'Black', 'Midnight Blue']
        },
        colorImages: {
            'Silver': [
                '/images/sony_silver_clean_1771847590469.png'
            ],
            'Black': [
                '/images/sony_black_clean_1771847608171.png'
            ],
            'Midnight Blue': [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
            ]
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
        image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600',
        description: 'Classic denim jacket that gets better with time. Versatile and durable.',
        options: {
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Original Indigo', 'Black Denim', 'Light Wash']
        },
        colorImages: {
            'Original Indigo': [
                'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=600'
            ],
            'Black Denim': [
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
            ],
            'Light Wash': [
                'https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=600'
            ]
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
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
        description: 'Classic sporty style, comfortable for both workouts and relaxing.'
    },
    {
        id: 48,
        name: 'Ralph Lauren Polo Shirt',
        price: 95.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
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
        image: 'https://images.unsplash.com/photo-1572804013307-59c85b3eb6d7?auto=format&fit=crop&q=80&w=600',
        description: 'Elegant floral print dress, perfect for spring and summer outings.'
    },
    {
        id: 51,
        name: 'The North Face Rain Jacket',
        price: 150.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
        description: 'Waterproof and breathable jacket for maximum outdoor protection.'
    },
    {
        id: 78,
        name: 'Levi\'s 501 Original Jeans',
        price: 89.00,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
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
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99bcf26a?auto=format&fit=crop&q=80&w=600',
        description: 'The classic skate shoe and the first to bare the iconic side stripe.'
    },
    {
        id: 55,
        name: 'Birkenstock Arizona Sandals',
        price: 110.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=600',
        description: 'The legendary two-strap sandal with the anatomically shaped footbed.'
    },
    {
        id: 57,
        name: 'Timberland 6-Inch Premium Boot',
        price: 198.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600',
        description: 'The original waterproof boot. Rugged, durable, and unmistakably Timberland.'
    },
    {
        id: 80,
        name: 'Asics Gel-Kayano 30',
        price: 160.00,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced stability and comfort for long-distance running.'
    },

    // Grocery
    {
        id: 10,
        name: 'Cold Pressed Olive Oil (1L)',
        price: 24.50,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacabc87c5?auto=format&fit=crop&q=80&w=600',
        description: 'Extra virgin olive oil. Heart-healthy and delicious.',
        options: {
            weight: ['500ml', '1L', '2L', '5L']
        },
        variantPricing: {
            weight: {
                '500ml': 0,
                '1L': 12.00,
                '2L': 30.00,
                '5L': 70.00
            }
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
        },
        variantPricing: {
            weight: {
                '250g': 0,
                '500g': 15.00,
                '1kg': 35.00
            }
        }
    },
    {
        id: 21,
        name: 'Organic Honey (500g)',
        price: 12.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
        description: 'Pure, organic wildflower honey, ethically sourced.',
        options: {
            weight: ['250g', '500g', '1kg']
        },
        variantPricing: {
            weight: {
                '250g': 0,
                '500g': 10.00,
                '1kg': 25.00
            }
        }
    },
    {
        id: 58,
        name: 'Quinoa Organic (1kg)',
        price: 15.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1612531383344-77e8a93910c5?w=800&q=80',
        description: 'Highly nutritious, organic white quinoa grains.'
    },
    {
        id: 59,
        name: 'Almond Butter (340g)',
        price: 14.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
        description: 'Creamy, roasted almond butter, made with 100% natural ingredients.'
    },
    {
        id: 60,
        name: 'Green Tea Matcha (100g)',
        price: 22.00,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=800&q=80',
        description: 'Premium ceremonial grade Japanese matcha powder.'
    },
    {
        id: 61,
        name: 'Himalayan Pink Salt (500g)',
        price: 8.50,
        category: 'Grocery',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
        description: 'Pure, mineral-rich Himalayan pink salt crystals.'
    },




    // Appliances
    {
        id: 22,
        name: 'LG 260L Frost Free Refrigerator',
        price: 499.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        description: 'Spacious and energy-efficient double door refrigerator.'
    },
    {
        id: 24,
        name: 'Midea 1.5 Ton Split AC',
        price: 399.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
        description: 'Powerful cooling with smart inverter technology and energy saving mode.'
    },
    {
        id: 64,
        name: 'Panasonic Microwave Oven',
        price: 180.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
        description: 'Versatile convection microwave for baking, grilling, and reheating.'
    },
    {
        id: 65,
        name: 'Dyson V15 Detect Vacuum',
        price: 749.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
        description: 'Most powerful, intelligent cordless vacuum with laser illumination.'
    },
    {
        id: 66,
        name: 'Breville Barista Pro',
        price: 849.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80',
        description: 'Barista-quality performance with a new intuitive interface.'
    },
    {
        id: 68,
        name: 'iRobot Roomba j7+',
        price: 799.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80',
        description: 'Smart robotic vacuum with obstacle avoidance and clean base.'
    },
    {
        id: 82,
        name: 'Philips Air Purifier 2000i',
        price: 299.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1585771724684-2428f9a60ca2?w=800&q=80',
        description: 'Advanced air purification with real-time feedback and smart app control.'
    },
    {
        id: 83,
        name: 'Instant Pot Pro 10-in-1',
        price: 149.00,
        category: 'Appliances',
        image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&q=80',
        description: 'Multi-functional pressure cooker for faster, healthier meals.'
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
        image: 'https://images.unsplash.com/photo-1585366119957-e556f403e4e7?auto=format&fit=crop&q=80&w=600',
        description: 'Iconic Star Wars starship recreated with authentic details.'
    },

    {
        id: 30,
        name: 'Plush Teddy Bear',
        price: 25.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1559440666-44b204e32087?auto=format&fit=crop&q=80&w=600',
        description: 'Soft and cuddly teddy bear, perfect for kids and adults alike.'
    },

    {
        id: 74,
        name: 'LEGO Technic 4x4 Off-Roader',
        price: 249.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1533558701576-23c65e42c2fb?auto=format&fit=crop&q=80&w=600',
        description: 'Advanced LEGO Technic building set for realistic off-road play.'
    },
    {
        id: 75,
        name: 'Dyson Airwrap Styler',
        price: 599.00,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1647416390977-27088b90c7f0?auto=format&fit=crop&q=80&w=600',
        description: 'Multi-styler to curl, shape, smooth, and hide flyaways with no extreme heat.'
    },


    {
        id: 87,
        name: 'Nintendo Switch OLED',
        price: 349.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=600',
        description: 'The newest addition to the Nintendo Switch family, with a vibrant OLED screen.'
    },
    {
        id: 88,
        name: 'Revlon One-Step Hair Dryer',
        price: 39.99,
        category: 'Beauty & Toys',
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600',
        description: 'A versatile hair styling tool that dries and volumizes in one step.'
    },
];
