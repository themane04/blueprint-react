// TODO: Replace APP_NAME with the name of the app
const APP_NAME = "PLACEHOLDER";
const CACHE_VERSION = "v1";

const STATIC_CACHE = `${APP_NAME}-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${APP_NAME}-runtime-${CACHE_VERSION}`;

/** Explicit precache (minimal – do NOT overcache) */
const PRECACHE_URLS = ["/", "/index.html", "/manifest.json"];

/** INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        cache.addAll([
          ...PRECACHE_URLS,

          // ADD URLS
        ])
      )
  );
});

/** ACTIVATE – clean old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );

  self.clients.claim();
});

/** FETCH */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-http(s)
  if (!url.protocol.startsWith("http")) return;

  // NEVER cache API
  if (url.pathname.startsWith("/api/")) return;

  // SVGs → cache-first (your original logic)
  if (url.pathname.endsWith(".svg")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            return caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Navigation + other GET → network-first (auth-safe)
  if (request.method === "GET") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Never cache partial or ranged responses
          if (response.status === 206 || request.headers.has("range")) {
            return response;
          }

          const url = new URL(request.url);

          // Never cache media / streaming
          if (
            url.pathname.endsWith(".mp4") ||
            url.pathname.endsWith(".m3u8") ||
            url.pathname.endsWith(".ts") ||
            url.pathname.includes("/hls/")
          ) {
            return response;
          }

          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, clone);
          });

          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});

/** MESSAGE – skip waiting */
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
