async function fixImages() {
    const images = {
        'Mobiles': 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70',
        'Electronics': 'https://rukminim2.flixcart.com/image/612/612/k07698w0/headphone/8/3/h/sony-wh-1000xm3-original-imafhzh37jyyguhe.jpeg?q=70',
        'Fashion': 'https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/j/m/v/l-no-den-jack-black-try-this-original-imagr7gefgznvuyz.jpeg?q=70',
        'Footwear': 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/i/l/10-rng-eva-740-wht-blk-10-bruton-white-black-original-imahjn6cmwhphfaw.jpeg?q=70',
        'Grocery': 'https://rukminim2.flixcart.com/image/612/612/kthjy4w0/honey/h/e/8/pure-honey-saffron-infused-natural-honey-raw-honey-honey-spoon-original-imag6tgr8fngf3hj.jpeg?q=70',
        'Appliances': 'https://rukminim2.flixcart.com/image/612/612/xif0q/air-conditioner-new/g/w/g/-original-imahfzh87w8yphzg.jpeg?q=70',
        'Home Decor': 'https://rukminim2.flixcart.com/image/612/612/kk8chu80/mirror/v/y/k/3-0-120-shrutih-original-imafzkfzzyghz7zv.jpeg?q=70',
        'Beauty & Toys': 'https://rukminim2.flixcart.com/image/612/612/k7f02vk0/educational-toy/s/h/v/millennium-falcon-75257-lego-original-imafpzx9fhygzphw.jpeg?q=70',
        'Gaming': 'https://rukminim2.flixcart.com/image/312/312/k5lcvbk0/gaming-console/y/h/g/1-switch-v2-32-nintendo-original-imafz8ayh7jyt5h7.jpeg?q=70',
        'Instruments': 'https://rukminim2.flixcart.com/image/612/612/xif0q/acoustic-guitar/u/t/z/acoustic-guitar-with-accessories-combo-kit-6-string-guitar-original-imaghtky7zhgfzzg.jpeg?q=70'
    };

    try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        const products = await response.json();
        console.log(`Checking ${products.length} products...`);

        let updatedCount = 0;
        for (const product of products) {
            if (product.name === 'iPhone 15 Pro Max') {
                // Keep the local high-quality one if it exists, otherwise use a placeholder
                continue;
            }

            const category = product.category || 'Electronics';
            const newImage = images[category] || images['Electronics'];

            // Only update if it's external or dummy
            if (!product.image || product.image.includes('fakestoreapi') || product.image.includes('dummyjson') || product.image.includes('unsplash')) {
                const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...product, image: newImage })
                });
                if (updateRes.ok) updatedCount++;
            }
        }
        console.log(`Successfully updated ${updatedCount} products via API!`);
    } catch (err) {
        console.error("API Error:", err.message);
    }
}
fixImages();
