const CACHE_NAME = 'juno-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/src/css/variables.css',
    '/src/css/styles.css',
    '/src/css/screens/expenses.css',
    '/src/css/components/funds.css',
    '/src/css/components/calculator.css',
    '/src/js/app.js'
];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Force SW update
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        }).then(() => self.clients.claim()) // Claim clients immediately
    );
});

self.addEventListener('fetch', (e) => {
    // Network First strategy
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
