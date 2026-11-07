// Guarda la pantalla de la web para que abra rápido y funcione al abrir sin conexión (los datos siempre vienen de Google).
var C = 'mariano-v1';
self.addEventListener('install', function (e) { self.skipWaiting(); e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./', 'index.html', 'icon-192.png']); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(function (res) { var cp = res.clone(); caches.open(C).then(function (c) { c.put(r, cp); }); return res; }).catch(function () { return caches.match(r); }));
});
