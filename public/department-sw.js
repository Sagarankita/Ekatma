const CACHE_NAME = 'ekatma-dept-v1';

const STATIC_ASSETS = [
  '/department/offline.html'
];

self.addEventListener('install', (event) => {
  // Safe update-available UX: we do not force skipWaiting to prevent data loss on open screens.
  // The client will prompt the user to reload.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('ekatma-dept-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do not intercept non-GET requests (mutations remain network-only)
  if (event.request.method !== 'GET') {
    return;
  }

  // Ensure worker does not control unrelated root/Entrepreneur routes (fallback safety)
  if (!url.pathname.startsWith('/department')) {
    return;
  }

  // Do not cache authenticated/dynamic API data or domain data
  if (url.pathname.includes('/api/')) {
    return;
  }

  // Fallback to offline.html for navigation requests if offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/department/offline.html');
      })
    );
  }
});
