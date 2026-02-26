import https from 'https';

const terms = [
    'OnePlus 12',
    'Xiaomi 14 Ultra',
    'Asus Zenfone 11',
    'Sony Xperia 1 VI',
    'Dell XPS 15',
    'MacBook Air M2',
    'PlayStation 5 Console',
    'Nintendo Switch OLED',
    'Samsung Galaxy S24 Ultra'
];

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
            } catch (e) {
                console.log(`${term} -> Not found`);
            }
        });
    });
}
terms.forEach(searchCommons);
