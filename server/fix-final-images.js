async function fixImages() {
    try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        if (!response.ok) throw new Error('Could not fetch products');
        const products = await response.json();

        console.log(`Checking ${products.length} products...`);

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

            // Only update if it looks like a broken/remote link we want to replace
            // Actually replace everything to be safe and consistent
            try {
                const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...product, image: newImage })
                });
                if (updateRes.ok) updatedCount++;
            } catch (err) {
                console.error(`Failed to update product ${product.name}`, err);
            }
        }

        console.log(`Successfully updated ${updatedCount} products via API!`);
    } catch (err) {
        console.error("Error in fixImages", err);
    }
}

fixImages();
