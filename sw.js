//Inside your sw.js
//You can get the polyfill from here: https://github.com/dominiccooney/cache-polyfill/blob/master/index.js
importScripts('/pwa/serviceworker-cache-polyfill.js');

//Listening in on an install event and caching site assets
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('your_app_name').then(function(cache) {
     return cache.addAll([
       '/pwa',
       '/pwa/index.html',
        // Place more assets
     ]);
   })
 );
});

//Listening in on fetch requests and if found in cache, bring file from cache
self.addEventListener('fetch', function(event) {
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
