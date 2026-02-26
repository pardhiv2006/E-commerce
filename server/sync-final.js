import { products } from './data.js';
import http from 'http';

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

async function syncAllProducts() {
    try {
        console.log(`Syncing ${products.length} products to DB...`);
        let count = 0;
        for (const localProduct of products) {
            try {
                // We use POST to create new records after the reset
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: '/api/products',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }, localProduct);
                count++;
            } catch (err) {
                console.error(`Failed to sync ${localProduct.name}:`, err.message);
            }
        }
        console.log(`✅ Successfully uploaded ${count} products to the database.`);

    } catch (err) {
        console.error("Execution Error:", err.message);
    }
}

syncAllProducts();
