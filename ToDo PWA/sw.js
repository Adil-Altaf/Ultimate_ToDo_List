importScripts("idb.js");
importScripts("idbindexdb.js");
importScripts("jscript.js");

//var fetchFromAPI = "https://api.github.com/users/zeeshanhanif/followers"; //REST API link will come here


// cache name 
var cacheName = "ultimate-toDo-pwa_1";


//file to cache
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


// intercepting install event of service worker
self.addEventListener('install', function (e) {
    ("install done");
    e.waitUntil(

        // cache all files during install event
        caches.open(cacheName)
            .then(function (cache) {
                console.log("all files added to cache");
                return cache.addAll(filesToCache);
            })
    );
});

// intercepting activate event of service worker
self.addEventListener('activate', function (e) {
    console.log("activated");
    e.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    //deleting all other cache than the name of cacheName variable
                    if (key !== cacheName) {
                        console.log("Removing old cache :" + key)
                        return caches.delete(key);
                    }
                }));
            })
    );
});



//intercepting fetch event
self.addEventListener('fetch', function (event) {
    // if request of fetch is for static file, will chk for address
    if (event.request.url.indexOf(fetchFromAPI) < 0) {
        console.log("fetch static Pages");
        event.respondWith(
            // retreive from cache
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    } else {
        event.respondWith(
            // if request of fetch is for dynamic data, will chk for address
            fetch(event.request).catch(function () {// Look at network first 
                // if unsuccessful in retreiving from network then look fro cache
                console.log("from indexdb");
                return "no_internet"; // caches.match(event.request);
            })
        );
    }
});

