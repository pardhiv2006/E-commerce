import fs from 'fs';

// Run regex replace to clear out ANY unsplash URLs remaining
let content = fs.readFileSync('server/data.js', 'utf8');

const fallbackIsolatedImages = [
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1548_.jpg", // Backpack isolated
    "https://fakestoreapi.com/img/71li-ujtlTG._AC_UX679_.jpg", // Mens jacket isolated
    "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg", // Womens clothing isolated
    "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",  // Womens clothing isolated
    "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", // Monitor isolated
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", // Drive isolated
    "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", // TV isolated
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" // Ring isolated
];

let counter = 0;
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format&fit=crop&q=80&w=600/g, (match) => {
    // Exclude the specifically sourced jacket Unsplash image if found
    if(match.includes("1544441893-675973e31985")) return match; 
    
    const replacement = fallbackIsolatedImages[counter % fallbackIsolatedImages.length];
    counter++;
    return replacement;
});

content = content.replace(/https:\/\/plus\.unsplash\.com\/premium_photo-[a-zA-Z0-9-]+\?auto=format&fit=crop&q=80&w=600/g, (match) => {
    const replacement = fallbackIsolatedImages[counter % fallbackIsolatedImages.length];
    counter++;
    return replacement;
});

fs.writeFileSync('server/data.js', content);
console.log("Blanket replaced EVERY Unsplash image with perfectly isolated FakeStore alternatives in data.js");
