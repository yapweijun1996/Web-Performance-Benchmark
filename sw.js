const CACHE_NAME = 'benchmark-v3';

self.addEventListener('install', (e) => {
  // Cache the shell on install — Vite-built assets have hashed names,
  // so we only precache the HTML entry point and let runtime caching
  // handle the rest on first load
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['/']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Clean old caches
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network-first for navigation, cache-first for assets (hashed = immutable)
  const url = new URL(e.request.url);
  const isAsset = url.pathname.startsWith('/assets/');

  if (isAsset) {
    // Hashed assets are immutable — serve from cache, fallback to network
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return res;
        })
      )
    );
  } else {
    // HTML/other: network first, fallback to cache (offline support)
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
