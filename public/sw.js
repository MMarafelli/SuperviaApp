const CACHE_NAME = 'supervia-v1.0.5';
const urlsToCache = [
  '/',
  '/SuperviaApp/',
  '/assets/icons/favicon.png',
  '/assets/icons/logo.png',
  '/assets/icons/logo-sv.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/icon_192.png',
  '/assets/icons/icon_512.png',
  '/assets/icons/192x192.png',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.debug('SW: Failed to cache resources (normal on updates):', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).catch((error) => {
      console.debug('SW: Cache cleanup error:', error);
    })
  );
  // Take control of all pages
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Fallback page for offline navigation
        if (event.request.destination === 'document') {
          return caches.match('/SuperviaApp/');
        }
      })
  );
});

// Message event - handle update notifications
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'SuperVia App', body: 'Nova atualização disponível!' };
  }

  const options = {
    title: data.title || 'SuperVia App',
    body: data.body || 'Nova atualização disponível!',
    icon: '/SuperviaApp/assets/icons/sv_192x192.png',
    badge: '/SuperviaApp/assets/icons/sv_48x48.png',
    vibrate: [200, 100, 200],
    data: data,
    actions: [
      {
        action: 'open',
        title: 'Abrir App',
        icon: '/SuperviaApp/assets/icons/sv_48x48.png'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'SuperVia App', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Se já há uma janela aberta, foca nela
        for (const client of clientList) {
          if (client.url.includes('/SuperviaApp/') && 'focus' in client) {
            return client.focus();
          }
        }
        // Senão, abre uma nova janela
        if (clients.openWindow) {
          return clients.openWindow('/SuperviaApp/');
        }
      })
    );
  }
});