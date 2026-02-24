import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'data.js');
let dataStr = fs.readFileSync(dataFilePath, 'utf-8');

const urlRegex = /https:\/\/(fakestoreapi\.com|images\.unsplash\.com)[^"'\s]+/g;

dataStr = dataStr.replace(urlRegex, (match, p1, offset, string) => {
    const context = string.substring(Math.max(0, offset - 100), offset + 50).toLowerCase();
    
    if (context.includes('laptop') || context.includes('macbook')) {
        return 'https://cdn.dummyjson.com/product-images/6/thumbnail.jpg';
    } else if (context.includes('shoe') || context.includes('sneaker')) {
        return 'https://cdn.dummyjson.com/product-images/56/thumbnail.jpg';
    } else if (context.includes('shirt') || context.includes('jacket')) {
        return 'https://cdn.dummyjson.com/product-images/53/thumbnail.jpg';
    } else if (context.includes('watch')) {
        return 'https://cdn.dummyjson.com/product-images/61/thumbnail.jpg';
    } else if (context.includes('bag') || context.includes('backpack')) {
        return 'https://cdn.dummyjson.com/product-images/71/thumbnail.jpg';
    }
    return 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg';
});

fs.writeFileSync(dataFilePath, dataStr, 'utf-8');
console.log('Fixed broken images in data.js cleanly');
