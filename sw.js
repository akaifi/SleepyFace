const version = "0.6.18";
const cacheName = `SleepyFace-${version}`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                    ``,
                    `index.html`,
                    `styles/main.css`,
                    `scripts/main.min.js`,
                    `scripts/comlink.global.js`,
                    `scripts/messagechanneladapter.global.js`,
                    `scripts/pwacompat.min.js`,
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});