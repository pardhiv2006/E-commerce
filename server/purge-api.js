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

async function purgeAll() {
    try {
        console.log("Fetching all products for purge...");
        const dbProducts = await makeRequest({
            host: '127.0.0.1',
            port: 5001,
            path: '/api/products',
            method: 'GET'
        });

        console.log(`Found ${dbProducts.length} products. Deleting one by one...`);
        let count = 0;
        for (const p of dbProducts) {
            const id = p._id || p.id;
            try {
                await makeRequest({
                    host: '127.0.0.1',
                    port: 5001,
                    path: `/api/products/${id}`,
                    method: 'DELETE'
                });
                count++;
            } catch (err) {
                console.error(`Failed to delete ${p.name} (${id}):`, err.message);
            }
        }
        console.log(`✅ Successfully purged ${count} products.`);

    } catch (err) {
        console.error("Purge Error:", err.message);
    }
}

purgeAll();
