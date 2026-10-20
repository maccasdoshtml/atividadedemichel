/* =========================================
   PWA da página inicial do site
   - registra o service worker do site
   - mostra o botão "Instalar" quando o
     navegador oferece a instalação
   ========================================= */

(function () {
  "use strict";

  /* ---------- Service worker (site inteiro) ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("../sw.js").catch(function (erro) {
        console.warn("Service worker não registrado:", erro);
      });
    });
  }

  /* ---------- Botão de instalação ---------- */
  var botao = document.getElementById("btn-instalar");
  if (!botao) return;

  var prompt = null;

  function aviso(mensagem) {
    var aviso = document.createElement("div");
    aviso.textContent = mensagem;
    aviso.style.cssText =
      "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);" +
      "background:#0f2340;color:#fff;padding:11px 20px;border-radius:999px;font-size:14px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:60;max-width:90vw;text-align:center";
    document.body.appendChild(aviso);
    setTimeout(function () {
      aviso.remove();
    }, 4200);
  }

  window.addEventListener("beforeinstallprompt", function (evento) {
    evento.preventDefault();
    prompt = evento;
    botao.hidden = false;
  });

  botao.addEventListener("click", function () {
    if (!prompt) {
      aviso(
        "Use o menu do navegador (⋮) → “Instalar aplicativo” ou, no iPhone, Compartilhar → “Adicionar à Tela de Início”."
      );
      return;
    }
    botao.hidden = true;
    prompt.prompt();
    prompt.userChoice.then(function () {
      prompt = null;
    });
  });

  window.addEventListener("appinstalled", function () {
    botao.hidden = true;
    prompt = null;
  });

  /* Se o app já estiver instalado, escondemos o botão */
  if (window.matchMedia("(display-mode: standalone)").matches) {
    botao.hidden = true;
  } else {
    /* Se o navegador não disparar o evento, o botão aparece mesmo assim
       para o aluno saber que existe a opção de instalar. */
    setTimeout(function () {
      if (!prompt) botao.hidden = false;
    }, 2500);
  }
})();
