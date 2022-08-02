if(navigator.serviceWorker) {
    //console.log('sw supported');
    window.addEventListener('load', ()=> {
        navigator.serviceWorker
            .register('./sw_cached_pages.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`service worker: error: ${err}`))
    });
}