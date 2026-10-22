/* =========================================
   Service worker — Crônicas da História
   Permite instalar o app e usar offline.
   ========================================= */

const VERSAO = "cronicas-v3";
const CACHE = VERSAO;

/* Casca do app: o que precisa estar disponível para o app abrir. */
const CASCA = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/dados.js",
  "./js/app.js",
  "./assets/logo.jpg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon-180.png",
];

/* Página usada quando o usuário está offline. */
const OFFLINE = "./index.html";

/* Um item que falhou não pode derrubar a instalação inteira. */
async function guardar(cache, lista) {
  const resultados = await Promise.allSettled(
    lista.map((url) => cache.add(new Request(url, { cache: "reload" })))
  );
  const falhas = resultados
    .map((r, i) => (r.status === "rejected" ? lista[i] : null))
    .filter(Boolean);
  if (falhas.length) console.warn("SW: não foi possível guardar", falhas);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => guardar(cache, CASCA))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
      )
      .then(() => self.clients.claim())
  );
});

/* Permite atualizar o app assim que uma versão nova é publicada. */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
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
        .catch(async () => {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match(requisicao)) ||
            (await cache.match(url.pathname)) ||
            (await cache.match(OFFLINE)) ||
            (await cache.match("./"))
          );
        })
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
