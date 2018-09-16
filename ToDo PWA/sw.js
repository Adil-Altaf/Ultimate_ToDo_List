var cacheName = "ultimate-toDo-pwa_1";

var filesToCache = [
    '/index.html',
    '/jscript.js',
    '/style.css',
    '/images/banner.jpg',
    '/images/done.png',
    '/images/right_tick.png',
    '/images/wrong_tick.png',
    '/'
];


self.addEventListener('install', function (e) {
    console.log("install done");
    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log("all files added to cache");
                return cache.addAll(filesToCache);
            })
    );
});


self.addEventListener('activate', function (e) {
    console.log("activated");
    e.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== cacheName) {
                        console.log("Removing old cache :" + key)
                        return caches.delete(key);
                    }
                }));
            })
    );
});




self.addEventListener('fetch', function (e) {
    e.respondWith(
        fetch(e.request).catch(function () {  // Look at network first 
            // if unsuccessful in retreiving from network then look fro cache
            return caches.match(e.request);
        })
    );
});

