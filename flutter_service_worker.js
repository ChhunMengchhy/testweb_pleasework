'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "50a7a884cf4b054e90d2d693af06695b",
"assets/AssetManifest.smcbin": "4832c5b84f1a81c9feccddb25799b461",
"assets/assets/add.png": "78f4cdb8ec9372dcbc9391fd0c1ffecc",
"assets/assets/b0.png": "650a125007efd167182c04deff5b77f9",
"assets/assets/b1.png": "7019aff46a643ac013fcf778bbec023c",
"assets/assets/b2.png": "bdd41262a3f74248b1bdb0556546aed8",
"assets/assets/b3.png": "f149257c155626886426e01004b00d8d",
"assets/assets/b4.png": "2889ed0bc3c373e5236e202e87b097bf",
"assets/assets/b5.png": "ada48c681b9fce92190ead4c44327787",
"assets/assets/b6.png": "5c9fe2ac34d212867576360ca5e4c6b6",
"assets/assets/b7.png": "a4e01be1436e1604a74f5e59d197a6be",
"assets/assets/b8.png": "9bd329c6bd6524a3c8629c689fcdfac3",
"assets/assets/b9.png": "90bcdc2e3ae3cb53fd5b42b0f1208dc8",
"assets/assets/background.png": "4f589f8ab51b7780f56a0a51f61b2292",
"assets/assets/BOARD.png": "64628ba151b95cead0ce1fa609f25310",
"assets/assets/click.wav": "2c405a25ff2a9c46712886b69435cb4f",
"assets/assets/glass.png": "23f623d634b382fcf436fd83e5c97c05",
"assets/assets/glassleg.png": "4a7d642c773eee98f36db7adc2191365",
"assets/assets/LOGO.png": "32ced9eedb4428645a04e1811d72ab44",
"assets/assets/LOGO1.png": "8b18bc3c4f9c698805899950e38e1be3",
"assets/assets/logoimg.png": "0e1eaa63b72ee3b80ea5ed82c8fdf67d",
"assets/assets/MACHINE2.png": "9868752d2e03cea6464bebb6e56a3088",
"assets/assets/MONEY.png": "24416ec17554f3315047474c874a2c62",
"assets/assets/music.png": "7c08525dd764e5eeb2621fb86aaa007a",
"assets/assets/PLAY.png": "c218354296f268bb0a5df46e77d353d8",
"assets/assets/sub.png": "b40b02bc55707a289f9e566e5b6d4ce3",
"assets/assets/timeClick.wav": "0b775db4d33eb6b93427ae8e67ed4ac6",
"assets/assets/Victorys.mp3": "078b073d6fbcc979450b72ea7b4338a9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/NOTICES": "d1e4edd5febc447b5882daae9029fff2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "0a2ab58397488ab0bc572d25e1853acc",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ce761e8ce615dc79161f8e12ccb64c34",
"icons/Icon-512.png": "37f2db5931f2b6d7836832b7906c0ae5",
"icons/Icon-maskable-192.png": "ce761e8ce615dc79161f8e12ccb64c34",
"icons/Icon-maskable-512.png": "37f2db5931f2b6d7836832b7906c0ae5",
"index.html": "5a1849ba97943f291e0ed850c85b1f9e",
"/": "5a1849ba97943f291e0ed850c85b1f9e",
"main.dart.js": "f059e6cee3d4685c56df51dfd6f4f912",
"manifest.json": "4271b4ad026b34a7b9f60b81b7b0e58d",
"version.json": "999cd03f3126141b064658017a58a1c6"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
