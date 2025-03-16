const CACHE_NAME = "api-cache-v4"; // Change version when updating logic

// Install Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting(); // Activate the worker immediately
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event: **Network-First with Cache Fallback**
self.addEventListener("fetch", (event) => {
    const url = event.request.url;

    if (url.includes("typicode")) { // Target API requests
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Update cache with fresh response
                        return networkResponse; // Return fresh data
                    });
                })
                .catch(() => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        return cache.match(event.request).then((cachedResponse) => {
                            return cachedResponse || new Response(JSON.stringify({ error: "Offline mode: No cached data available" }), { headers: { "Content-Type": "application/json" } });
                        });
                    });
                })
        );
    }
});
