importScripts("idb.js");
importScripts("idbindexdb.js");
importScripts("jscript.js");

//var fetchFromAPI = "https://api.github.com/users/zeeshanhanif/followers"; //REST API link will come here


var cacheName = "ultimate-toDo-pwa_1";

var filesToCache = [
    '/index.html',
    '/jscript.js',
    '/idbindexdb.js',
    '/idb.js',
    '/sw.js',
    '/manifest.js',
    '/manifest.json',
    '/style.css',
    '/images/banner.jpg',
    '/images/done.png',
    '/images/right_tick.png',
    '/images/wrong_tick.png',
    '/'
];


self.addEventListener('install', function (e) {
    ("install done");
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




self.addEventListener('fetch', function (event) {
    if (event.request.url.indexOf(fetchFromAPI) < 0) {
        console.log("fetch static Pages");
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(function () {// Look at network first 
                // if unsuccessful in retreiving from network then look fro cache
                console.log("from indexdb");
                return "no_internet"; // caches.match(event.request);
            })
        );
    }
});

