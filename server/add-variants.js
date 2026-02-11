// Script to add variants to all products in data.js
// This adds realistic options and pricing for each category

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Define variant templates for each category
const variantTemplates = {
    'Mobiles': {
        options: (name) => ({
            storage: name.includes('Pro') || name.includes('Ultra') || name.includes('Fold')
                ? ['256GB', '512GB', '1TB']
                : ['128GB', '256GB', '512GB'],
            colors: ['Black', 'White', 'Blue', 'Silver']
        }),
        pricing: (storage) => {
            const prices = { '128GB': 0, '256GB': 100, '512GB': 200, '1TB': 400 };
            return { storage: Object.fromEntries(storage.map(s => [s, prices[s] || 0])) };
        }
    },
    'Electronics': {
        options: () => ({
            colors: ['Black', 'White', 'Silver', 'Space Gray']
        }),
        pricing: () => ({})
    },
    'Fashion': {
        options: () => ({
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['Black', 'White', 'Navy', 'Gray', 'Beige']
        }),
        pricing: (sizes) => ({
            sizes: { 'S': 0, 'M': 0, 'L': 0, 'XL': 5, 'XXL': 10 }
        })
    },
    'Footwear': {
        options: () => ({
            sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
            colors: ['Black', 'White', 'Brown', 'Blue']
        }),
        pricing: () => ({})
    },
    'Grocery': {
        options: (name) => {
            if (name.toLowerCase().includes('oil') || name.toLowerCase().includes('milk')) {
                return { quantity: ['500ml', '1L', '2L', '5L'] };
            }
            return { weight: ['250g', '500g', '1kg', '2kg'] };
        },
        pricing: (key, values) => {
            const weightPrices = { '250g': 0, '500g': 3, '1kg': 6, '2kg': 12 };
            const qtyPrices = { '500ml': 0, '1L': 2, '2L': 4, '5L': 10 };
            const priceMap = key === 'weight' ? weightPrices : qtyPrices;
            return { [key]: Object.fromEntries(values.map(v => [v, priceMap[v] || 0])) };
        }
    },
    'Appliances': {
        options: () => ({
            colors: ['White', 'Black', 'Stainless Steel', 'Silver']
        }),
        pricing: () => ({})
    },
    'Home Decor': {
        options: () => ({
            colors: ['Beige', 'Gray', 'White', 'Black', 'Brown']
        }),
        pricing: () => ({})
    },
    'Beauty & Toys': {
        options: () => ({
            colors: ['Pink', 'Blue', 'White', 'Multi-color']
        }),
        pricing: () => ({})
    }
};

console.log('Variant templates created for all categories');
console.log('Note: Run this as a Node.js script to batch-update data.js');
