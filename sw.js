const CACHE = "nyc-2026-v39";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./museum-data.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
  ,"./assets/maps/nyc-illustrated-master-v1.png"
  ,"./assets/places/washington-square.jpg"
  ,"./assets/places/stonewall.jpg"
  ,"./assets/places/blue-note.jpg"
  ,"./assets/places/jefferson-market.jpg"
  ,"./assets/places/friends-house.jpg"
  ,"./assets/places/carrie-house.jpg"
  ,"./assets/places/magnolia.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const sameOrigin = new URL(event.request.url).origin === self.location.origin;
  if (sameOrigin) {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
