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

async function syncFinalImages() {
    try {
        console.log("Fetching current products from DB...");
        const dbProducts = await makeRequest({
            host: '127.0.0.1',
            port: 5001,
            path: '/api/products',
            method: 'GET'
        });

        console.log(`Syncing ${products.length} products with final images...`);
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
                }, { ...dbProduct, image: localProduct.image });
                count++;
            }
        }
        console.log(`✅ Updated ${count} products with final curated images.`);

    } catch (err) {
        console.error("Execution Error:", err.message);
    }
}

syncFinalImages();
