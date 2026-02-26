const https = require('https');

function searchCommons(term) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(term)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            try {
                const data = JSON.parse(body);
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0];
                console.log(`${term} -> ${pages[pageId].imageinfo[0].url}`);
            } catch(e) {
                console.log(`${term} -> Not found`);
            }
        });
    });
}
searchCommons('OnePlus 12');
searchCommons('Xiaomi 14 Ultra');
searchCommons('Asus Zenfone 11');
searchCommons('Sony Xperia 1 VI');
searchCommons('Dell XPS 15');
searchCommons('MacBook Air M2');
searchCommons('PlayStation 5 Console');
searchCommons('Nintendo Switch OLED');
searchCommons('Samsung Galaxy S24 Ultra');
