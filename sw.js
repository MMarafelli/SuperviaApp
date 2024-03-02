// sw.js
const CACHE_NAME = 'seu-app-cache';
let currentVersion = 'v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                // Seus arquivos em cache
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('updatefound', () => {
    self.clients.matchAll().then((clients) => {
        if (clients && clients.length) {
            clients.forEach((client) => {
                client.postMessage({ action: 'updateAvailable', newVersion: currentVersion });
            });
        }
    });
});