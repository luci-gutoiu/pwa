//Inside your main html file (index.html), paste the following inside script tags at the end of your body tag
//Registering a service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}

--------------------------------

//Inside your sw.js
//You can get the polyfill from here: https://github.com/dominiccooney/cache-polyfill/blob/master/index.js
importScripts('serviceworker-cache-polyfill.js');

//Listening in on an install event and caching site assets
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('your_app_name').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
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
