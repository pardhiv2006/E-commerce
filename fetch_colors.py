import json
import time
from duckduckgo_search import DDGS

def fetch_variants():
    try:
        with open('products_dump.json', 'r') as f:
            products = json.load(f)
    except Exception as e:
        print(f"Error loading products: {e}")
        return

    results = {}
    
    with DDGS() as ddgs:
        for p in products:
            if 'options' in p and 'colors' in p['options']:
                product_id = p['id']
                name = p['name']
                colors = p['options']['colors']
                
                results[str(product_id)] = {}
                
                for color in colors:
                    query = f"{name} {color} product image"
                    print(f"Searching: {query}")
                    try:
                        # Fetch top image result
                        search_results = list(ddgs.images(query, max_results=1))
                        if search_results and len(search_results) > 0:
                            img_url = search_results[0].get('image')
                            results[str(product_id)][color] = img_url
                            print(f"  Found: {img_url}")
                        else:
                            print(f"  No image found for {query}")
                            results[str(product_id)][color] = ""
                    except Exception as e:
                        print(f"  Error fetching {query}: {e}")
                        results[str(product_id)][color] = ""
                    
                    # Sleep to avoid rate limits
                    time.sleep(1.5)

    with open('fetched_color_images.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print("Done fetching variants.")

if __name__ == '__main__':
    fetch_variants()
