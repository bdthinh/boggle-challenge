const CACHE_VERSION = 1;
const CACHE_NAME = `cache-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll([
    'offline.html'
  ])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map((cacheName) => {
    if (cacheName != CACHE_NAME) {
      return caches.delete(cacheName);
    }
  }))));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
    event.respondWith(fetch(request).catch(error => caches.match('offline.html')));
  }
});
