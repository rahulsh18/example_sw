const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'main.js'
];

//call install event
self.addEventListener('install', e => {
    console.log('Service Worker: installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('service worker: caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//call activate event 
self.addEventListener('activate', e => {
    console.log('Service worker: activated');
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//call fetch event
self.addEventListener('fetch', e => {
    console.log('service worker: fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});