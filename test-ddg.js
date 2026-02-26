const https = require('https');

function searchImage(query) {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' product image')}`;
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    };

    https.get(searchUrl, options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
             // Look for <img class="image_preview" src="..." /> or similar in DDG HTML snippet
             console.log(body.substring(0, 1000));
        });
    });
}

searchImage('iPhone 15 Pro Max Blue Titanium');
