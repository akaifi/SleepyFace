const version = "0.6.18";
const cacheName = `SleepyFace-${version}`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                    `/SleepyFace/`,
                    `/SleepyFace/index.html`,
                    `/SleepyFace/styles/main.css`,
                    `/SleepyFace/scripts/main.min.js`,
                    `/SleepyFace/scripts/comlink.global.js`,
                    `/SleepyFace/scripts/messagechanneladapter.global.js`,
                    `/SleepyFace/scripts/pwacompat.min.js`,
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