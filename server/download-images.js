import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'data.js');
let dataStr = fs.readFileSync(dataFilePath, 'utf-8');

// Match any external image URLs
const urlRegex = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|webp|gif|svg)(?:\?[^"'\s]*)?/gi;

// Also catch clean URLs without traditional extensions that we know are in data.js
const allUrlsRegex = /https:\/\/(fakestoreapi\.com|images\.unsplash\.com)[^"'\s]+/g;

const matches = new Set([...(dataStr.match(urlRegex) || []), ...(dataStr.match(allUrlsRegex) || [])]);
const urls = Array.from(matches);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) return reject(new Error('Failed to download ' + url + ' Status: ' + response.statusCode));
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => { file.close(resolve); });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

(async () => {
    let rewrittenData = dataStr;
    console.log(`Found ${urls.length} unique URLs to download.`);

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        // Skip placeholders or local images
        if (url.includes('via.placeholder.com')) continue;

        try {
            // Give them a clean name
            // Extract extension if any, otherwise default to .jpg
            let ext = '.jpg';
            if (url.includes('.png')) ext = '.png';
            if (url.includes('.webp')) ext = '.webp';

            // Unsplash images usually need a manual extension
            const filename = `product-isolated-${Date.now()}-${i}${ext}`;
            const destPath = path.join(uploadsDir, filename);

            console.log(`[${i + 1}/${urls.length}] Downloading ${url} -> ${filename}`);
            await downloadImage(url, destPath);

            // Re-write data.js pointing to localhost express statically served /uploads
            // Or just a relative path if frontend serves it, but it's server logic so:
            // The frontend pulls these from the /api/products API.
            // When frontend gets '/uploads/filename.jpg', it won't resolve unless prefixed with backend URL or proxied.
            // Let's use `http://localhost:5001/uploads/filename` exactly like the Multer fix does.
            const newUrl = `http://localhost:5001/uploads/${filename}`;
            rewrittenData = rewrittenData.split(url).join(newUrl);
        } catch (err) {
            console.error(`Failed to DL ${url}`, err.message);
        }
    }

    fs.writeFileSync(dataFilePath, rewrittenData, 'utf-8');
    console.log('Successfully updated data.js with local paths!');
})();
