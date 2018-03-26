var staticCacheName = 'criativos-static-v1';

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll([
        'index.html',
        'src/my-app.html',
        'src/nossos-cursos.html',
        'src/nossos-cursonovo.html',
        'src/nossos-criativos.html',
        'src/nossos-propositos.html',
        'src/nossos-contatos.html', 
        'images/criativosinovadores-home.png',
        'images/criativosinovadores-icon.png'        
        ]);
    })
  );
});

self.addEventListener('activate', function(event){
event.waitUntil(
  caches.keys().then(function(cacheNames){
    return Promise.all(
      cacheNames.filter(function(cacheName){
      return cacheName.startsWith('criativos-') &&
      cacheName != staticCacheName;
      }).map(function(cacheName){
        return cache.delete(cacheName);      
      })
      ); 
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) return response;
        return fetch(event.request);
        })
      );
});

