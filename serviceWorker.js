/* eslint-disable no-restricted-globals */
// Cache Name
const CACHE_NAME = "v1";
const urlsToCache = ["index.html"];

// Installable service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for request
self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Activate the service worker
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
