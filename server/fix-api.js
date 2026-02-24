import fs from 'fs';

async function fixViaApi() {
    try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        const products = await response.json();

        let updatedCount = 0;

        for (const product of products) {
            if (product.image && (product.image.includes('fakestoreapi') || product.image.includes('unsplash'))) {
                const context = (product.name + " " + product.category + " " + product.description).toLowerCase();
                let newImage = 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg';

                if (context.includes('laptop') || context.includes('macbook')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/6/thumbnail.jpg';
                } else if (context.includes('shoe') || context.includes('sneaker')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/56/thumbnail.jpg';
                } else if (context.includes('shirt') || context.includes('jacket')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/53/thumbnail.jpg';
                } else if (context.includes('watch')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/61/thumbnail.jpg';
                } else if (context.includes('bag') || context.includes('backpack')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/71/thumbnail.jpg';
                } else if (context.includes('headphones') || context.includes('audio')) {
                    newImage = 'https://cdn.dummyjson.com/product-images/100/thumbnail.jpg';
                }

                const updateRes = await fetch(`http://127.0.0.1:5001/api/products/${product._id || product.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...product, image: newImage })
                });

                if (updateRes.ok) {
                    updatedCount++;
                } else {
                    console.log('Failed to update', product.name);
                }
            }
        }
        console.log(`Successfully updated ${updatedCount} products via API!`);
    } catch (err) {
        console.error("API error", err);
    }
}
fixViaApi();
