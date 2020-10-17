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
    "url": "images/1oushi.jpg",
    "revision": "3e4b1bd097137441f4305a61b70361ae"
  },
  {
    "url": "images/2zhongshi.jpg",
    "revision": "4e6531aa0c3ad12ecd0b6d259855ba8b"
  },
  {
    "url": "images/3Google.jpg",
    "revision": "16862b400a0da399d45fa1db056b14aa"
  },
  {
    "url": "images/4jiaren.jpg",
    "revision": "c3fafc064328714c493d5dc70633f95b"
  },
  {
    "url": "images/5jobs.jpg",
    "revision": "7adbdb4ad4e8a7bfb770ab70721eca6d"
  },
  {
    "url": "images/617173.jpg",
    "revision": "335f164a529f09e49999c92ce890d58f"
  },
  {
    "url": "images/fu.png",
    "revision": "9cbfdefb3351a4fb9ae8d378671588e0"
  },
  {
    "url": "images/H.ogg",
    "revision": "c8e30dacfae7d6377dcdb1ef0fd4ea62"
  },
  {
    "url": "images/kainy.jpg",
    "revision": "d05fc5e39ccf46082f9f047fd543826f"
  },
  {
    "url": "images/MicroMessenger.png",
    "revision": "900c6000374c5291464473b216ded017"
  },
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
    "revision": "3869867dda31c46da874533e4e6da814"
  },
  {
    "url": "js/hover.js",
    "revision": "1c0dfe66e3635f163ccf10a0954bf2e1"
  },
  {
    "url": "js/service-worker.js",
    "revision": "718564d47db0633433c72764879b084a"
  },
  {
    "url": "js/touch.js",
    "revision": "a608c981cac9fa09d8efc7f2afd5beb3"
  },
  {
    "url": "index.html",
    "revision": "6db39144d5a0b53ed150f119dbf2010d"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true,
  "directoryIndex": "index.html",
  "ignoreUrlParametersMatching": [/./]
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('https://wx2.sinaimg.cn/large/(.*)', workboxSW.strategies.cacheFirst({
  "cacheableResponse": {
    "statuses": [
      0,
      200
    ]
  }
}), 'GET');
