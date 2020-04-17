"use strict";

// The names for our caches and the version number
const version = "-v1.1.0";
const staticCache = "cachedFiles" + version;
const pagesCache = "cachedPages";
const imagesCache = "cachedImages";
const cacheList = [staticCache, pagesCache, imagesCache];

// Our list of paths to cache on install
const pagesToCache = ["/", "/offline"];

// Static files to cache on install
const staticsToCache = [
  "/js/typed.min.js",
  "/js/nghpjs.js",
  "/js/lazyload.min.js"
];

// Function to add a path to the cache
function stashInCache(request, cacheName) {
  fetch(request).then(responseFromFetch => {
    caches.open(cacheName).then(theCache => {
      return theCache.put(request, responseFromFetch);
    });
  });
}

// Install event will trigger when first initated
addEventListener("install", installEvent => {
  skipWaiting();
  // tell the browser to delay the SW installation until cache is populated
  installEvent.waitUntil(
    // now populate the cache (cache the files) using the Cache API
    // 1. Open the cache
    caches.open(staticCache).then(staticCache => {
      // Cache pages
      caches.open(pagesCache).then(pagesCache => {
        pagesCache.addAll(pagesToCache);
      });

      return staticCache.addAll(staticsToCache);
    })
  );
});

// trigger this event when a path is requested
addEventListener("fetch", fetchEvent => {
  const request = fetchEvent.request;

  //console.log(request);

  // Check if the request URL iis from us, otherwise ignore it
  if (
    request.url.indexOf("https://nicholasgriffin.dev") ||
    request.url.indexOf("http://localhost:8080")
  ) {
    // check if the request is for a page
    if (request.headers.get("Accept").includes("text/html")) {
      // respons with this if a page
      fetchEvent.respondWith(
        fetch(request)
          .then(responseFromFetch => {
            const copy = responseFromFetch.clone();

            fetchEvent.waitUntil(
              caches.open(pagesCache).then(pagesCache => {
                pagesCache.put(request, copy);
              })
            );

            return responseFromFetch;
          })
          // If the response errors
          .catch(error => {
            return caches.match(request).then(responseFromCache => {
              if (responseFromCache) {
                return responseFromCache;
              }

              // serve offlie page
              return caches.match("/offline");
            });
          })
      );

      return;
    }

    // Check if the request is for an image
    if (request.headers.get("Accept").includes("image")) {
      fetchEvent.respondWith(
        caches.match(request).then(responseFromCache => {
          // If the image is already in the cache, return it
          if (responseFromCache) {
            fetchEvent.waitUntil(stashInCache(request, imagesCache));
            return responseFromCache;
          } else {
            return (
              fetch(request)
                .then(responseFromFetch => {
                  const copy = responseFromFetch.clone();
                  fetchEvent.waitUntil(
                    caches.open(imagesCache).then(imageCache => {
                      imageCache.put(request, copy);
                    })
                  );
                  return responseFromFetch;
                })
                // If the response errors
                .catch(error => {
                  return caches.match("/offline.png");
                })
            );
          }
        })
      );

      return;
    }

    // for everything else
    fetchEvent.respondWith(
      caches.match(request).then(responseFromCache => {
        fetchEvent.waitUntil(
          fetch(request).then(responseFromFetch => {
            caches.open(pagesCache).then(pagesCache => {
              return pagesCache.put(request, responseFromFetch);
            });
          })
        );
        return responseFromCache;
      })
    );
  }
});

addEventListener("activate", activateEvent => {
  activateEvent.waitUntil(
    // Clean up caches and clear old ones on activate
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheList.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return clients.claim();
      })
  );
});

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

addEventListener("message", messageEvent => {
  if (messageEvent.data.command == "trimCaches") {
    trimCache(pagesCache, 30);
    trimCache(imagesCache, 30);
  }
});
