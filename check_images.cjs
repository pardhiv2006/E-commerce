const https = require('https');
const http = require('http');

// Inline the products since we can't use ES modules easily in CJS
// We'll grep from the JS file
const fs = require('fs');
const content = fs.readFileSync('./src/data.js', 'utf8');

// Extract image URLs with product names
const lines = content.split('\n');
const products = [];
let currentName = '';
let currentId = '';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("name:")) {
        currentName = line.match(/name:\s*'([^']+)'/)?.[1] || '';
    }
    if (line.startsWith("id:")) {
        currentId = line.match(/id:\s*(\d+)/)?.[1] || '';
    }
    if (line.startsWith("image:") && currentName) {
        const urlMatch = line.match(/image:\s*'([^']+)'/);
        if (urlMatch) {
            products.push({ id: currentId, name: currentName, url: urlMatch[1] });
            currentName = '';
            currentId = '';
        }
    }
}

function checkUrl(url) {
    // Resolve local paths like /images/... to localhost dev server
    const fullUrl = url.startsWith('/') ? `http://localhost:5174${url}` : url;
    const lib = fullUrl.startsWith('https') ? https : http;
    return new Promise((resolve) => {
        try {
            const req = lib.get(fullUrl, { timeout: 5000 }, (res) => {
                resolve({ status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
            });
            req.on('error', () => resolve({ status: 0, ok: false }));
            req.on('timeout', () => { req.destroy(); resolve({ status: 0, ok: false }); });
        } catch (e) {
            resolve({ status: 0, ok: false });
        }
    });
}

async function main() {
    console.log(`Checking ${products.length} product images...\n`);
    const broken = [];

    for (const p of products) {
        const result = await checkUrl(p.url);
        const icon = result.ok ? '✅' : '❌';
        if (!result.ok) {
            broken.push(p);
            console.log(`${icon} [${p.id}] ${p.name} → ${result.status} | ${p.url}`);
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Total: ${products.length} | Broken: ${broken.length} | OK: ${products.length - broken.length}`);

    if (broken.length > 0) {
        console.log('\nBroken products:');
        broken.forEach(p => console.log(`  [${p.id}] ${p.name}`));
    }
}

main();
