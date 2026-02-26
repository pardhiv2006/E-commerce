const fs = require('fs');
const content = fs.readFileSync('src/data.js', 'utf8');

// Match all image URLs in the entire file
const imageMatches = content.match(/https:\/\/images\.unsplash\.com\/[^']+/g);

if (!imageMatches) {
    console.log("No images found.");
    process.exit(0);
}

const urls = imageMatches;
const urlToProduct = {}; // url -> Array of product names
const lines = content.split('\n');

let currentProductName = "Root";
lines.forEach((line, idx) => {
    if (line.includes('name:')) {
        currentProductName = line.split("'")[1] || line.split('"')[1] || "Unknown";
    }

    // Find URLs in this line
    const matches = line.match(/https:\/\/images\.unsplash\.com\/[^']+/g);
    if (matches) {
        matches.forEach(url => {
            if (!urlToProduct[url]) urlToProduct[url] = [];
            if (!urlToProduct[url].includes(currentProductName)) {
                urlToProduct[url].push(currentProductName);
            }
        });
    }
});

const duplicates = Object.keys(urlToProduct).filter(url => urlToProduct[url].length > 1);

if (duplicates.length > 0) {
    console.log("Found image URLs shared between DIFFERENT products:");
    duplicates.forEach(url => {
        console.log(`- ${url}`);
        console.log(`  Shared by: ${urlToProduct[url].join(', ')}`);
    });
} else {
    console.log("All image URLs are unique across all products! ✅");
}
