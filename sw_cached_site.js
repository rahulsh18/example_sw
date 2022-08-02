const cacheName = 'v2';


//call install event
self.addEventListener('install', e => {
    console.log('Service Worker: installed');

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
       fetch(e.request)
        .then(res => {
            //make copy/clone of response
            const resClone = res.clone();
            //open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //add response to the cache
                    cache.put(e.request, resClone);
                });
                return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
});