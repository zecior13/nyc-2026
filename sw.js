const CACHE = "nyc-2026-v90";

// Rdzeń jest mały i musi zostać zapisany w całości, aby aplikacja zawsze się uruchomiła.
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./museum-data.js",
  "./met-on-view-data.js",
  "./museum-expanded-data.js",
  "./museum-education-data.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

// Zdjęcia pobieramy osobno, na wyraźne polecenie użytkownika. Pojedynczy błąd
// nie może już zablokować instalacji całej aplikacji.
const MEDIA_ASSETS = [
  "./assets/maps/nyc-illustrated-master-v1.png",
  "./assets/maps/nyc-subway-map-2025.svg",
  "./assets/places/blue-note.jpg",
  "./assets/places/carrie-house.jpg",
  "./assets/places/friends-house.jpg",
  "./assets/places/jefferson-market.jpg",
  "./assets/places/magnolia.jpg",
  "./assets/places/stonewall.jpg",
  "./assets/places/washington-square.jpg",
  ...Array.from({ length: 130 }, (_, index) =>
    `./assets/photos/${String(index + 1).padStart(3, "0")}.jpg`
  ),
  "./assets/photos/131.webp",
  "./assets/photos/132.jpg",
  "./assets/photos/133.jpg",
  "./assets/photos/134.jpg",
  "./assets/photos/135.webp",
  "./assets/photos/136.jpg",
  "./assets/photos/137.webp",
  "./assets/photos/138.webp",
  "./assets/photos/139.jpg",
  "./assets/photos/140.jpg",
  "./assets/photos/141.webp",
  "./assets/photos/142.jpg",
  "./assets/photos/143.jpg",
  ...Array.from({ length: 105 }, (_, index) =>
    `./assets/photos/${String(index + 144).padStart(3, "0")}.jpg`
  ),
  ...[436123,436138,436139,436140,436141,436150,436152,436153,436168,436524,436525,436526,436527,436529,436530,436531,436532,436533,436534,436535,436536,436945,436946,436952,436960,437385,437387,437388,437390,437392,437393,437395,437396,437397,437399,437402,437406,437424,437425,437426,437428,437429,437430,437432,437436,437437,437980,437984,437998,438002,438010,438011,438012,438013,438014,438722,438815,438817,438819,438857,441104,459082,459098,459123,782304]
    .map(id => `./assets/photos/met-${id}.jpg`)
];

const assetUrl = asset => new URL(asset, self.location.href).href;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function sendMediaStatus(client, type = "OFFLINE_STATUS") {
  if (!client) return;
  const cache = await caches.open(CACHE);
  const matches = await Promise.all(MEDIA_ASSETS.map(asset => cache.match(assetUrl(asset))));
  client.postMessage({
    type,
    done: matches.filter(Boolean).length,
    total: MEDIA_ASSETS.length,
    failed: 0
  });
}

async function cacheOfflineMedia(client) {
  const cache = await caches.open(CACHE);
  let done = 0;
  let failed = 0;
  const total = MEDIA_ASSETS.length;

  // Małe partie są stabilniejsze w Safari na iPhonie niż 134 pobrania jednocześnie.
  for (let start = 0; start < MEDIA_ASSETS.length; start += 5) {
    const batch = MEDIA_ASSETS.slice(start, start + 5);
    await Promise.all(batch.map(async asset => {
      const url = assetUrl(asset);
      try {
        const cached = await cache.match(url);
        if (!cached) {
          const response = await fetch(new Request(url, { cache: "reload" }));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          await cache.put(url, response);
        }
      } catch (error) {
        failed += 1;
      } finally {
        done += 1;
        client?.postMessage({ type: "OFFLINE_PROGRESS", done, total, failed });
      }
    }));
  }

  // Ponowne policzenie pamięci podręcznej daje prawdziwy wynik także po ponowieniu.
  const matches = await Promise.all(MEDIA_ASSETS.map(asset => cache.match(assetUrl(asset))));
  client?.postMessage({
    type: "OFFLINE_COMPLETE",
    done: matches.filter(Boolean).length,
    total,
    failed: total - matches.filter(Boolean).length
  });
}

self.addEventListener("message", event => {
  if (event.data?.type === "CHECK_OFFLINE_MEDIA") {
    event.waitUntil(sendMediaStatus(event.source));
  }
  if (event.data?.type === "CACHE_OFFLINE_MEDIA") {
    event.waitUntil(cacheOfflineMedia(event.source));
  }
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const sameOrigin = new URL(event.request.url).origin === self.location.origin;

  if (!sameOrigin) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          caches.open(CACHE).then(cache => cache.put("./index.html", response.clone()));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Obrazy i pliki aplikacji otwieramy najpierw lokalnie; po pierwszym pobraniu
  // nie wymagają już sieci.
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }))
  );
});
