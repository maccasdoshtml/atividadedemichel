/* =========================================
   Service worker — Crônicas da História
   Permite instalar o app e usar offline.
   ========================================= */

const VERSAO = "cronicas-v1";
const CACHE = VERSAO;

/* Casca do app: o que precisa estar disponível para o app abrir. */
const CASCA = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/dados.js",
  "./js/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CASCA))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(
        chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requisicao = event.request;

  if (requisicao.method !== "GET") return;

  const url = new URL(requisicao.url);
  if (url.origin !== self.location.origin) return;

  /* Navegação: tenta a rede primeiro e cai no cache se estiver offline. */
  if (requisicao.mode === "navigate") {
    event.respondWith(
      fetch(requisicao)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE).then((cache) => cache.put(requisicao, copia));
          return resposta;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  /* Demais recursos: cache primeiro, atualizando em segundo plano. */
  event.respondWith(
    caches.match(requisicao).then((cacheado) => {
      const daRede = fetch(requisicao)
        .then((resposta) => {
          if (resposta && resposta.status === 200 && resposta.type === "basic") {
            const copia = resposta.clone();
            caches.open(CACHE).then((cache) => cache.put(requisicao, copia));
          }
          return resposta;
        })
        .catch(() => cacheado);

      return cacheado || daRede;
    })
  );
});
