self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'manifest.json'
            ]);
        })
    );
});
self.addEventListener("activate", event => {
    console.log('Activate!');
});
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
