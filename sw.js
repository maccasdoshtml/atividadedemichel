/* =========================================
   Service worker do site — Escola Estadual
   Professor Abel Freire Coelho (Mossoró-RN)

   Cuida de todo o site: página inicial e os
   dois aplicativos. Permite instalar o site
   na tela inicial e usar sem internet.
   ========================================= */

const VERSAO = "eepafc-site-v2";
const CACHE = VERSAO;

/* Tudo que é preciso para o site abrir offline. */
const CASCA = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/logo.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon-180.png",

  "./app/index.html",

  "./app/cronicas-da-historia/index.html",
  "./app/cronicas-da-historia/manifest.webmanifest",
  "./app/cronicas-da-historia/css/styles.css",
  "./app/cronicas-da-historia/js/dados.js",
  "./app/cronicas-da-historia/js/app.js",
  "./app/cronicas-da-historia/assets/logo.svg",
  "./app/cronicas-da-historia/icons/icon-192.png",
  "./app/cronicas-da-historia/icons/icon-512.png",
  "./app/cronicas-da-historia/icons/icon-maskable-512.png",
  "./app/cronicas-da-historia/icons/apple-touch-icon-180.png",

  "./app/histor-em-foco/index.html",
  "./app/histor-em-foco/manifest.webmanifest",
  "./app/histor-em-foco/css/styles.css",
  "./app/histor-em-foco/js/dados.js",
  "./app/histor-em-foco/js/app.js",
  "./app/histor-em-foco/assets/logo.svg",
  "./app/histor-em-foco/icons/icon-192.png",
  "./app/histor-em-foco/icons/icon-512.png",
  "./app/histor-em-foco/icons/icon-maskable-512.png",
  "./app/histor-em-foco/icons/apple-touch-icon-180.png",
];

/* Página usada quando o usuário está offline. */
const OFFLINE = "./app/index.html";

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

  /* Navegação: rede primeiro (conteúdo novo), cache como reserva (offline). */
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

  /* Demais arquivos: cache primeiro, atualizando em segundo plano. */
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
