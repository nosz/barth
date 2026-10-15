/* Service Worker – Nathalie Barth · Mutige Kinderherzen (Webseite). Die App unter was-mache-ich-wenn-app/ hat einen eigenen Worker. */
const VERSION = "1.0.26";
const CACHE = "natbarth-site-" + VERSION;
const CORE = ["./", "index.html", "impressum.html", "datenschutz.html", "stil.css", "seite.js", "fenster.js", "manifest.webmanifest"];
const OPTIONAL = ["favicon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "vorschau_natbarth.jpg",
  "bilder/loewe-klein.png", "bilder/nathalie-barth.jpg", "bilder/buch-cover.jpg", "bilder/gruppentraining.jpg", "bilder/einzeltraining.jpg", "bilder/workshop.jpg",
  "bilder/seminar-kreis.jpg", "bilder/seminar-matte.jpg", "bilder/seminar-urkunden.jpg", "bilder/seminar-tafel.jpg", "bilder/logo-mutige-kinderherzen.jpg",
  "was-mache-ich-wenn-app/vorschau_app.jpg"];
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    await Promise.all(OPTIONAL.map(u => c.add(u).catch(() => {})));
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => { for (const k of await caches.keys()) if (k.startsWith("natbarth-site-") && k !== CACHE) await caches.delete(k); await self.clients.claim(); })());
});
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  if (url.pathname.includes("/was-mache-ich-wenn-app/") && !url.pathname.endsWith("vorschau_app.jpg")) return; // eigener Worker der App
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(no, 4000))]);
        if (r && r.ok) c.put(req, r.clone());
        return r;
      } catch (_) {
        return (await c.match(req, { ignoreSearch: true })) || (await c.match("index.html")) || Response.error();
      }
    })());
    return;
  }
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || Response.error();
  })());
});