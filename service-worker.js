const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

self.addEventListener('install', function(event) {
    // Realizar la instalación del service worker
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    // Responder con los recursos cacheados, si están disponibles
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit: devolver respuesta desde cache
                if (response) {
                    return response;
                }

                // Clonar la petición para poder consumirla y almacenarla en cache
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Verificar si la respuesta es válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar la respuesta para poder consumirla y almacenarla en cache
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
