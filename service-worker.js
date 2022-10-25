importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "fontello/css/animation.css",
    "revision": "5efb6f925470166045ba28c25131f79a"
  },
  {
    "url": "fontello/css/fontello-embedded.css",
    "revision": "8102da9c55d201d4567ed9af20fa0c0c"
  },
  {
    "url": "fontello/css/fontello-ie7.css",
    "revision": "048d5d6e3ebb4658d2b6500cd20308e1"
  },
  {
    "url": "fontello/css/fontello.css",
    "revision": "1a81758210a279c20cf682b8ef6f6de4"
  },
  {
    "url": "fontello/font/fontello.eot",
    "revision": "d422b038883e45a04c1b1740913f4c47"
  },
  {
    "url": "fontello/font/fontello.svg",
    "revision": "e932930809c5c5a1f4bc303116fcd179"
  },
  {
    "url": "fontello/font/fontello.ttf",
    "revision": "a4f35bfa9f941a07e1c9613bc7adfd22"
  },
  {
    "url": "fontello/font/fontello.woff",
    "revision": "93235d4188f03bd85d23e7ed3b1775b0"
  },
  {
    "url": "js/common.js",
    "revision": "91aea6d07705c4d56b5bdf9c69445d42"
  },
  {
    "url": "js/hover.js",
    "revision": "1c0dfe66e3635f163ccf10a0954bf2e1"
  },
  {
    "url": "js/touch.js",
    "revision": "a608c981cac9fa09d8efc7f2afd5beb3"
  },
  {
    "url": "index.html",
    "revision": "8124cc9399848e36b39481c26056cd6d"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true,
  "directoryIndex": "index.html",
  "ignoreUrlParametersMatching": [/./]
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('https://cdn.jsdelivr.net/gh/kainy/(.*)', workboxSW.strategies.cacheFirst({
  "cacheableResponse": {
    "statuses": [
      0,
      200
    ]
  }
}), 'GET');
workboxSW.router.registerRoute('https://a.kainy.cn/(.*)', workboxSW.strategies.cacheFirst({
  "cacheableResponse": {
    "statuses": [
      0,
      200
    ]
  }
}), 'GET');
workboxSW.router.registerRoute('https://wx2.sinaimg.cn/(.*)', workboxSW.strategies.cacheFirst({
  "cacheableResponse": {
    "statuses": [
      0,
      200
    ]
  }
}), 'GET');
