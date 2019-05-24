var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
var filesToCache = [
  '/pwa/',
 "./pwa/fonts",
 "./pwa/fonts/roboto",
 "./pwa/fonts/roboto/Roboto-Bold.woff",
 "./pwa/fonts/roboto/Roboto-Bold.woff2",
 "./pwa/fonts/roboto/Roboto-Light.woff",
 "./pwa/fonts/roboto/Roboto-Light.woff2",
 "./pwa/fonts/roboto/Roboto-Medium.woff",
 "./pwa/fonts/roboto/Roboto-Medium.woff2",
 "./pwa/fonts/roboto/Roboto-Regular.woff",
 "./pwa/fonts/roboto/Roboto-Regular.woff2",
 "./pwa/fonts/roboto/Roboto-Thin.woff",
 "./pwa/fonts/roboto/Roboto-Thin.woff2",
 "./pwa/images",
 "./pwa/images/icons",
 "./pwa/images/icons/icon-128x128.png",
 "./pwa/images/icons/icon-144x144.png",
 "./pwa/images/icons/icon-152x152.png",
 "./pwa/images/icons/icon-192x192.png",
 "./pwa/images/icons/icon-256x256.png",
 "./pwa/index.html",
 "./pwa/manifest.json",
 "./pwa/scripts",
 "./pwa/scripts/app.js",
 "./pwa/scripts/jquery-3.3.1.js",
 "./pwa/scripts/materialize.js",
 "./pwa/service-worker.js",
 "./pwa/styles",
 "./pwa/styles/materialize.css",
 "./pwa/styles/style.css"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
