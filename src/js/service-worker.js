
let deferredPrompt;

self.addEventListener('beforeinstallprompt', (event) => {
 
  event.preventDefault();
  
  
  deferredPrompt = event;
  
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('MastTools.com-cache').then((cache) => {
      return cache.addAll([
        '../../index.html',
        '../img/logo192.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
