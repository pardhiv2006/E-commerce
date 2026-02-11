#!/usr/bin/env python3
import re

# Read the data.js file
with open('src/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find MacBook Pro and replace it with images
pattern = r"(\s{4}\{\s*\n\s{8}id: 15,\s*\n\s{8}name: 'Apple MacBook Pro 14\",'\s*\n\s{8}price: 1999\.00,\s*\n\s{8}category: 'Electronics',\s*\n\s{8}image: 'https://images\.unsplash\.com/photo-1517336714460-4c98882c3fae\?auto=format&fit=crop&q=80&w=600',\s*\n\s{8}description: 'The world[''']s best laptop for prose\. Supercharged by M3, M3 Pro, and M3 Max\.'\s*\n\s{4}\},)"

replacement = """    {
        id: 15,
        name: 'Apple MacBook Pro 14"',
        price: 1999.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1517336714460-4c98882c3fae?auto=format&fit=crop&q=80&w=600',
        images: [
            'https://images.unsplash.com/photo-1517336714460-4c98882c3fae?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1529148482759-b1ae42c17dba?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1535550487073-48ec42fc16cd?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=600'
        ],
        colorImages: {
            'Space Black': [
                'https://images.unsplash.com/photo-1517336714460-4c98882c3fae?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1535550487073-48ec42fc16cd?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1529148482759-b1ae42c17dba?auto=format&fit=crop&q=80&w=600'
            ]
        },
        description: 'The world's best laptop for prose. Supercharged by M3, M3 Pro, and M3 Max.'
    },"""

new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

if new_content != content:
    with open('src/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("✓ Successfully updated MacBook Pro with images")
else:
    print("✗ Could not find MacBook Pro pattern")
