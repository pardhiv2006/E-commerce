import https from 'https';

const q = "denim jacket flat lay white background";
const options = {
  hostname: 'unsplash.com',
  port: 443,
  path: `/napi/search/photos?query=${encodeURIComponent(q)}&per_page=10`,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json && json.results) {
        json.results.forEach(img => {
          console.log(img.urls.regular);
          console.log(img.alt_description);
          console.log('---');
        });
      }
    } catch(e) { console.log(e.message); }
  });
});
req.end();
