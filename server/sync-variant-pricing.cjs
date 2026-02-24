const http = require('http');
const { products, coupons } = require('./data.js'); // Assuming this is CommonJS if we rename it or if it supports it

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

async function syncAdvancedData() {
    try {
        console.log("Fetching current products from DB...");
        const dbProducts = await makeRequest({
            host: '127.0.0.1',
            port: 5001,
            path: '/api/products',
            method: 'GET'
        });

        console.log(`Syncing ${products.length} products with variant pricing...`);
        let count = 0;
        for (const localProduct of products) {
            const dbProduct = dbProducts.find(p => p.name === localProduct.name);
            if (dbProduct) {
                const id = dbProduct._id || dbProduct.id;
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products/${id}`,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
                }, { ...dbProduct, variantPricing: localProduct.variantPricing, options: localProduct.options });
                count++;
            }
        }
        console.log(`✅ Updated ${count} products with variant pricing.`);

    } catch (err) {
        console.error("Execution Error:", err.message);
    }
}

syncAdvancedData();
