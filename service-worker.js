// Importar el archivo manifest.json para obtener la información de la aplicación
import { registerSW } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { cacheFirst } from 'workbox-strategies';

// Configuración del servicio worker
registerSW({
  // El nombre del servicio worker
  scope: '/',
  // La ruta del archivo manifest.json
  manifestURL: 'manifest.json',
});

// Cacheear los archivos necesarios
precacheAndRoute(self.__WB_MANIFEST);

// Manejar las solicitudes de recursos
self.addEventListener('fetch', (event) => {
  // Cacheear los recursos solicitados
  event.respondWith(
    cacheFirst({
      // La ruta del recurso solicitado
      cacheName: 'my-app-cache',
      // El método para obtener el recurso
      match: (request) => request.url.includes('my-app'),
    })
  );
});
