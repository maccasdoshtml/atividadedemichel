/* =========================================================
   História em Foco — Lógica do aplicativo (pt-BR)
   ========================================================= */

(function () {
  'use strict';

  const CHAVE_STORAGE = 'historia-em-foco:estatisticas';

  /* ---------- Utilidades ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function temaPorId(id) {
    return TEMAS.find((t) => t.id === id) || { id: id, nome: id, emoji: '📚', cor: '#999' };
  }

  function rolarParaTopo() {
    // A animação suave vem do CSS (html { scroll-behavior: smooth })
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

  /* ---------- Estatísticas (localStorage) ---------- */
  function carregarEstatisticas() {
    try {
      const bruto = localStorage.getItem(CHAVE_STORAGE);
      if (!bruto) return { total: 0, acertos: 0, porTema: {} };
      const dados = JSON.parse(bruto);
      return {
        total: dados.total || 0,
        acertos: dados.acertos || 0,
        porTema: dados.porTema || {}
      };
    } catch (e) {
      return { total: 0, acertos: 0, porTema: {} };
    }
  }

  function salvarEstatisticas() {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estatisticas));
    } catch (e) {
      /* navegador sem armazenamento (modo privado): seguimos sem salvar */
    }
  }

  let estatisticas = carregarEstatisticas();

  function registrarResposta(tema, acertou) {
    estatisticas.total++;
    if (acertou) estatisticas.acertos++;
    if (!estatisticas.porTema[tema]) estatisticas.porTema[tema] = { total: 0, acertos: 0 };
    estatisticas.porTema[tema].total++;
    if (acertou) estatisticas.porTema[tema].acertos++;
    salvarEstatisticas();
  }

  /* ---------- Estado ---------- */
  const estado = {
    aba: 'quiz',
    temaQuiz: 'todas',
    questoes: [],
    indice: 0,
    acertos: 0,
    respondidas: [],
    erros: [],
    bloqueado: false,
    temaCartao: 'todas',
    cartoes: [],
    indiceCartao: 0,
    virado: false,
    temaLinha: 'todas'
  };

  /* =======================================================
     NAVEGAÇÃO ENTRE ABAS
     ======================================================= */
  function trocarAba(nome) {
    estado.aba = nome;
    $$('.aba').forEach((botao) => {
      const ativo = botao.dataset.aba === nome;
      botao.classList.toggle('aba--ativa', ativo);
      botao.setAttribute('aria-selected', ativo ? 'true' : 'false');
    });
    $$('.painel').forEach((painel) => {
      painel.classList.toggle('painel--ativo', painel.id === 'painel-' + nome);
      painel.hidden = painel.id !== 'painel-' + nome;
    });
    if (nome === 'estatisticas') renderEstatisticas();
  }

  $$('.aba').forEach((botao) => {
    botao.addEventListener('click', () => trocarAba(botao.dataset.aba));
  });

  /* =======================================================
     CHIPS DE TEMA
     ======================================================= */
  function montarChips(container, selecaoInicial, aoMudar, contar) {
    container.innerHTML = '';
    const opcoes = [{ id: 'todas', nome: 'Todos os temas', emoji: '🌍', cor: '#9c4221' }].concat(TEMAS);
    opcoes.forEach((tema) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (tema.id === selecaoInicial ? ' chip--ativo' : '');
      chip.dataset.tema = tema.id;
      const quantidade = contar ? contar(tema.id) : 0;
      chip.innerHTML =
        '<span aria-hidden="true">' + tema.emoji + '</span> ' +
        '<span>' + tema.nome + '</span>' +
        (tema.id === 'todas' || !quantidade ? '' : ' <span class="chip__contagem">' + quantidade + '</span>');
      chip.addEventListener('click', () => {
        container.querySelectorAll('.chip').forEach((c) => c.classList.remove('chip--ativo'));
        chip.classList.add('chip--ativo');
        aoMudar(tema.id);
      });
      container.appendChild(chip);
    });
  }

  function contarQuestoes(temaId) {
    return filtrarQuestoes(temaId).length;
  }

  function contarCartoes(temaId) {
    return temaId === 'todas' ? CARTOES.length : CARTOES.filter((c) => c.tema === temaId).length;
  }

  function contarEventos(temaId) {
    return temaId === 'todas' ? LINHA_DO_TEMPO.length : LINHA_DO_TEMPO.filter((e) => e.tema === temaId).length;
  }

  /* =======================================================
     QUIZ
     ======================================================= */
  function filtrarQuestoes(temaId) {
    return temaId === 'todas' ? QUESTOES.slice() : QUESTOES.filter((q) => q.tema === temaId);
  }

  function montarChipsQuiz() {
    montarChips($('#quiz-categorias'), estado.temaQuiz, (id) => {
      estado.temaQuiz = id;
    }, contarQuestoes);
  }

  function iniciarQuiz() {
    estado.questoes = embaralhar(filtrarQuestoes(estado.temaQuiz));
    estado.indice = 0;
    estado.acertos = 0;
    estado.respondidas = [];
    estado.erros = [];
    estado.bloqueado = false;

    $('#quiz-intro').hidden = true;
    $('#quiz-revisao').hidden = true;
    $('#quiz-resultado').hidden = true;
    $('#quiz-questao').hidden = false;
    mostrarQuestao();
  }

  function mostrarQuestao() {
    const questao = estado.questoes[estado.indice];
    if (!questao) return;

    estado.bloqueado = false;
    const tema = temaPorId(questao.tema);

    $('#quiz-tema').textContent = tema.emoji + ' ' + tema.nome;
    $('#quiz-atual').textContent = estado.indice + 1;
    $('#quiz-total').textContent = estado.questoes.length;
    $('#quiz-acertos').textContent = estado.acertos;
    $('#quiz-pergunta').textContent = questao.pergunta;
    $('#quiz-retorno').hidden = true;
    $('#btn-proxima').hidden = true;

    const progresso = Math.round((estado.indice / estado.questoes.length) * 100);
    $('#quiz-barra').style.width = progresso + '%';
    $('#quiz-progresso').setAttribute('aria-valuenow', progresso);

    const container = $('#quiz-opcoes');
    container.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D', 'E'];
    questao.alternativas.forEach((texto, indice) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'opcao';
      botao.dataset.indice = indice;
      botao.innerHTML =
        '<span class="opcao__letra">' + letras[indice] + '</span>' +
        '<span class="opcao__texto">' + texto + '</span>';
      botao.addEventListener('click', () => responder(indice));
      container.appendChild(botao);
    });
  }

  function responder(indice) {
    if (estado.bloqueado) return;
    estado.bloqueado = true;

    const questao = estado.questoes[estado.indice];
    const acertou = indice === questao.correta;

    if (acertou) estado.acertos++;
    estado.respondidas.push({ questao: questao, acertou: acertou });
    if (!acertou) estado.erros.push(questao);
    registrarResposta(questao.tema, acertou);

    const botoes = $$('#quiz-opcoes .opcao');
    botoes.forEach((botao, i) => {
      botao.disabled = true;
      if (i === questao.correta) botao.classList.add('opcao--correta');
      else if (i === indice) botao.classList.add('opcao--errada');
      else botao.classList.add('opcao--esmaecida');
    });

    const retorno = $('#quiz-retorno');
    retorno.classList.toggle('retorno--erro', !acertou);
    retorno.hidden = false;
    $('#quiz-retorno-titulo').textContent = acertou
      ? '✅ Isso aí! Você acertou.'
      : '❌ Não foi dessa vez.';
    $('#quiz-retorno-texto').textContent = questao.explicacao;

    $('#quiz-acertos').textContent = estado.acertos;

    const progresso = Math.round(((estado.indice + 1) / estado.questoes.length) * 100);
    $('#quiz-barra').style.width = progresso + '%';
    $('#quiz-progresso').setAttribute('aria-valuenow', progresso);

    const proxima = $('#btn-proxima');
    proxima.hidden = false;
    proxima.textContent = estado.indice === estado.questoes.length - 1 ? 'Ver resultado' : 'Próxima';
    proxima.focus();
  }

  function proximaQuestao() {
    if (estado.indice < estado.questoes.length - 1) {
      estado.indice++;
      mostrarQuestao();
    } else {
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    $('#quiz-questao').hidden = true;
    $('#quiz-resultado').hidden = false;

    const total = estado.questoes.length;
    const nota = Math.round((estado.acertos / total) * 100);
    const tema = temaPorId(estado.temaQuiz === 'todas' ? null : estado.temaQuiz);

    let emoji = '🎉';
    let titulo = 'Muito bem!';
    let texto = '';

    if (nota === 100) {
      emoji = '🏆';
      titulo = 'Gabaritou!';
      texto = 'Você acertou todas as ' + total + ' questões de ' + (estado.temaQuiz === 'todas' ? 'todos os temas' : tema.nome) + '. Impressionante!';
    } else if (nota >= 70) {
      emoji = '🎉';
      titulo = 'Mandou bem!';
      texto = 'Você acertou ' + estado.acertos + ' de ' + total + ' questões. Está firme no conteúdo!';
    } else if (nota >= 40) {
      emoji = '💪';
      titulo = 'Quase lá!';
      texto = 'Você acertou ' + estado.acertos + ' de ' + total + ' questões. Revise as explicações dos erros e tente de novo.';
    } else {
      emoji = '📚';
      titulo = 'Bora estudar mais!';
      texto = 'Você acertou ' + estado.acertos + ' de ' + total + ' questões. Use a revisão abaixo para fixar os pontos fracos.';
    }

    $('#resultado-emoji').textContent = emoji;
    $('#resultado-titulo').textContent = titulo;
    $('#resultado-texto').textContent = texto;
    $('#resultado-nota').textContent = nota + '%';
  }

  function revisarErros() {
    const lista = $('#lista-erros');
    lista.innerHTML = '';

    if (!estado.erros.length) {
      lista.innerHTML = '<p class="vazio">Nenhum erro para revisar — você foi muito bem! 🎉</p>';
    } else {
      estado.erros.forEach((questao) => {
        const item = document.createElement('div');
        item.className = 'item-erro';
        const correta = questao.alternativas[questao.correta];
        item.innerHTML =
          '<p class="item-erro__pergunta">' + questao.pergunta + '</p>' +
          '<p class="item-erro__resposta">Resposta correta: <b>' + correta + '</b></p>' +
          '<p class="item-erro__resposta">' + questao.explicacao + '</p>';
        lista.appendChild(item);
      });
    }

    $('#quiz-resultado').hidden = true;
    $('#quiz-questao').hidden = true;
    $('#quiz-revisao').hidden = false;
    rolarParaTopo();
  }

  /* =======================================================
     CARTÕES DE REVISÃO
     ======================================================= */
  function montarChipsCartoes() {
    montarChips($('#cartoes-categorias'), estado.temaCartao, (id) => {
      estado.temaCartao = id;
      prepararCartoes();
    }, contarCartoes);
  }

  function prepararCartoes() {
    const base = estado.temaCartao === 'todas'
      ? CARTOES.slice()
      : CARTOES.filter((c) => c.tema === estado.temaCartao);
    estado.cartoes = embaralhar(base);
    estado.indiceCartao = 0;
    estado.virado = false;
    mostrarCartao();
  }

  function mostrarCartao() {
    const cartao = estado.cartoes[estado.indiceCartao];
    if (!cartao) return;

    $('#cartoes-contador').textContent = (estado.indiceCartao + 1) + ' / ' + estado.cartoes.length;
    $('#flashcard-frente').textContent = cartao.frente;
    $('#flashcard-verso').textContent = cartao.verso;
    estado.virado = false;
    $('#flashcard').classList.remove('flashcard--virada');
  }

  function virarCartao() {
    estado.virado = !estado.virado;
    $('#flashcard').classList.toggle('flashcard--virada', estado.virado);
  }

  function moverCartao(passo) {
    if (!estado.cartoes.length) return;
    estado.indiceCartao = (estado.indiceCartao + passo + estado.cartoes.length) % estado.cartoes.length;
    mostrarCartao();
  }

  /* =======================================================
     LINHA DO TEMPO
     ======================================================= */
  function montarChipsLinha() {
    montarChips($('#linha-categorias'), estado.temaLinha, (id) => {
      estado.temaLinha = id;
      renderLinhaTempo();
    }, contarEventos);
  }

  function formatarAno(ano) {
    return ano < 0 ? Math.abs(ano) + ' a.C.' : ano + ' d.C.';
  }

  function renderLinhaTempo() {
    const container = $('#linha-tempo');
    container.innerHTML = '';

    const eventos = LINHA_DO_TEMPO
      .filter((e) => estado.temaLinha === 'todas' || e.tema === estado.temaLinha)
      .slice()
      .sort((a, b) => a.ano - b.ano);

    if (!eventos.length) {
      container.innerHTML = '<p class="vazio">Nenhum evento encontrado para este filtro.</p>';
      return;
    }

    eventos.forEach((evento) => {
      const tema = temaPorId(evento.tema);
      const item = document.createElement('article');
      item.className = 'evento';
      item.innerHTML =
        '<span class="evento__ano">' + formatarAno(evento.ano) + '</span>' +
        '<h3 class="evento__titulo">' + evento.titulo + '</h3>' +
        '<p class="evento__descricao">' + evento.descricao + '</p>' +
        '<span class="evento__tema">' + tema.emoji + ' ' + tema.nome + '</span>';
      container.appendChild(item);
    });
  }

  /* =======================================================
     ESTATÍSTICAS
     ======================================================= */
  function renderEstatisticas() {
    const total = estatisticas.total;
    const acertos = estatisticas.acertos;
    const precisao = total ? Math.round((acertos / total) * 100) : 0;

    $('#stat-total').textContent = total;
    $('#stat-acertos').textContent = acertos;
    $('#stat-precisao').textContent = precisao + '%';

    const container = $('#stat-temas');
    container.innerHTML = '';

    const comDados = TEMAS.filter((t) => estatisticas.porTema[t.id]);
    if (!comDados.length) {
      container.innerHTML = '<p class="vazio">Você ainda não respondeu a nenhuma questão. Comece um quiz para ver seu desempenho aqui! 📊</p>';
      return;
    }

    comDados.forEach((tema) => {
      const dados = estatisticas.porTema[tema.id];
      const pct = dados.total ? Math.round((dados.acertos / dados.total) * 100) : 0;
      const linha = document.createElement('div');
      linha.className = 'tema-linha';
      linha.innerHTML =
        '<div class="tema-linha__topo">' +
          '<span class="tema-linha__nome">' + tema.emoji + ' ' + tema.nome + '</span>' +
          '<span class="tema-linha__valor">' + dados.acertos + '/' + dados.total + ' (' + pct + '%)</span>' +
        '</div>' +
        '<div class="tema-linha__trilho"><div class="tema-linha__barra" style="width:' + pct + '%; background:' + tema.cor + ';"></div></div>';
      container.appendChild(linha);
    });
  }

  function limparEstatisticas() {
    if (!window.confirm('Tem certeza que deseja apagar todas as suas estatísticas? Essa ação não pode ser desfeita.')) return;
    estatisticas = { total: 0, acertos: 0, porTema: {} };
    salvarEstatisticas();
    renderEstatisticas();
  }

  /* =======================================================
     EVENTOS GLOBAIS
     ======================================================= */
  $('#btn-iniciar').addEventListener('click', iniciarQuiz);
  $('#btn-proxima').addEventListener('click', proximaQuestao);
  $('#btn-reiniciar').addEventListener('click', iniciarQuiz);
  $('#btn-revisar').addEventListener('click', revisarErros);
  $('#btn-ver-stats').addEventListener('click', () => trocarAba('estatisticas'));
  $('#btn-voltar-quiz').addEventListener('click', () => {
    $('#quiz-revisao').hidden = true;
    $('#quiz-questao').hidden = false;
  });

  $('#btn-cartao-virar').addEventListener('click', virarCartao);
  $('#btn-cartao-anterior').addEventListener('click', () => moverCartao(-1));
  $('#btn-cartao-proximo').addEventListener('click', () => moverCartao(1));
  $('#btn-cartao-aleatorio').addEventListener('click', prepararCartoes);
  $('#flashcard').addEventListener('click', virarCartao);

  $('#btn-limpar-stats').addEventListener('click', limparEstatisticas);

  document.addEventListener('keydown', (evento) => {
    if (evento.target.tagName === 'INPUT' || evento.target.tagName === 'TEXTAREA') return;

    // Quiz: teclas 1 a 4 respondem, Enter avança
    if (estado.aba === 'quiz' && !$('#quiz-questao').hidden) {
      const indice = ['1', '2', '3', '4', '5'].indexOf(evento.key);
      if (indice !== -1 && !estado.bloqueado) {
        const botao = $('#quiz-opcoes .opcao[data-indice="' + indice + '"]');
        if (botao) { evento.preventDefault(); responder(indice); }
        return;
      }
      if (evento.key === 'Enter' && !$('#btn-proxima').hidden) {
        evento.preventDefault();
        proximaQuestao();
        return;
      }
    }

    // Cartões: espaço vira o cartão
    if (estado.aba === 'cartoes' && (evento.key === ' ' || evento.code === 'Space')) {
      evento.preventDefault();
      virarCartao();
    }
  });

/* =======================================================
     PWA: service worker (permite instalar e usar offline)
     ======================================================= */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (erro) {
        console.warn('Service worker não registrado:', erro);
      });
    });
  }

  /* =======================================================
     PWA: botão "Instalar" (aparece quando o navegador
     permite instalar o app)
     ======================================================= */
  (function prepararInstalacao() {
    var botao = document.getElementById('btn-instalar');
    if (!botao) return;

    var prompt = null;

    function aviso(mensagem) {
      var aviso = document.createElement('div');
      aviso.textContent = mensagem;
      aviso.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);' +
        'background:#0f2340;color:#fff;padding:11px 20px;border-radius:999px;font-size:14px;' +
        'box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:60;max-width:90vw;text-align:center';
      document.body.appendChild(aviso);
      setTimeout(function () { aviso.remove(); }, 4200);
    }

    window.addEventListener('beforeinstallprompt', function (evento) {
      evento.preventDefault();
      prompt = evento;
      botao.hidden = false;
    });

    botao.addEventListener('click', function () {
      if (!prompt) {
        aviso('Use o menu do navegador (⋮) → “Instalar aplicativo” ou “Adicionar à tela de início”.');
        return;
      }
      botao.hidden = true;
      prompt.prompt();
      prompt.userChoice.then(function () { prompt = null; });
    });

    window.addEventListener('appinstalled', function () {
      botao.hidden = true;
      prompt = null;
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      botao.hidden = true;
    } else {
      /* Se o navegador não disparar o evento, o botão aparece mesmo assim
         para o aluno saber que existe a opção de instalar. */
      setTimeout(function () {
        if (!prompt) botao.hidden = false;
      }, 2500);
    }
  })();

  /* =======================================================
     Inicialização
     ======================================================= */
  montarChipsQuiz();
  montarChipsCartoes();
  montarChipsLinha();
  prepararCartoes();
  renderLinhaTempo();
  renderEstatisticas();
  trocarAba('quiz');
})();
