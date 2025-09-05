self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("doctors-pwa").then(cache => {
      return cache.addAll([
        "index.html",
        "details.html",
        "style.css",
        "app.js",
        "details.js",
        "translations.js",
        "data.json",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

