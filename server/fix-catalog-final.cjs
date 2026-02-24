const http = require('http');
const { products } = require('./data.js');

const makeRequest = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(body ? JSON.parse(body) : null);
                    } catch (e) {
                        resolve(body);
                    }
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

async function syncCatalogFix() {
    try {
        console.log("Fetching current products from DB...");
        const dbProducts = await makeRequest({
            host: '127.0.0.1',
            port: 5001,
            path: '/api/products',
            method: 'GET'
        });

        console.log(`Checking ${products.length} catalog items...`);
        let updatedCount = 0;
        let createdCount = 0;

        for (const localProduct of products) {
            const dbProduct = dbProducts.find(p => p.name.trim().toLowerCase() === localProduct.name.trim().toLowerCase());

            const productData = {
                name: localProduct.name,
                price: localProduct.price,
                category: localProduct.category,
                image: localProduct.image,
                description: localProduct.description,
                options: localProduct.options,
                variantPricing: localProduct.variantPricing,
                images: localProduct.images || [localProduct.image],
                colorImages: localProduct.colorImages
            };

            if (dbProduct) {
                const id = dbProduct._id || dbProduct.id;
                console.log(`Updating: ${localProduct.name}`);
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products/${id}`,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                }, productData);
                updatedCount++;
            } else {
                console.log(`Creating: ${localProduct.name}`);
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products`,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }, productData);
                createdCount++;
            }
        }
        console.log(`✅ Finalization Complete: Updated ${updatedCount}, Created ${createdCount}.`);

    } catch (err) {
        console.error("Execution Error:", err.message);
    }
}

syncCatalogFix();
