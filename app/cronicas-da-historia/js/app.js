/* =========================================
   Crônicas da História — lógica do app
   ========================================= */

const CHAVE = "cronicas-historia-v1";
const CHAVE_TEMA = "cronicas-historia-tema";
const DIA = 24 * 60 * 60 * 1000;

let cards = [];
let filtro = { busca: "", tema: "", status: "" };
let sessao = { fila: [], indice: 0, revelada: false, respondidas: 0, total: 0 };
let quiz = { perguntas: [], indice: 0, acertos: 0, tipo: "multipla", erradas: [] };
let cardEditando = null;

/* ---------------- Utilidades ---------------- */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function uid() {
  return "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function aviso(mensagem) {
  const el = $("#aviso");
  el.textContent = mensagem;
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.hidden = true; }, 2600);
}

function temaPorId(id) {
  return TEMAS.find((t) => t.id === id) || { id: id, nome: id, emoji: "📚", cor: "#999" };
}

function nomeTema(id) {
  return temaPorId(id).nome;
}

/* ---------------- Armazenamento ---------------- */

function criarCard(dados) {
  return {
    id: uid(),
    frente: dados.frente,
    verso: dados.verso,
    tema: dados.tema || TEMAS[0].id,
    criadoEm: Date.now(),
    reps: 0,
    lapses: 0,
    intervalo: 0,
    ease: 2.5,
    due: Date.now(),
    lastReview: null
  };
}

function carregar() {
  const bruto = localStorage.getItem(CHAVE);
  if (bruto) {
    try {
      const dados = JSON.parse(bruto);
      if (Array.isArray(dados) && dados.length) { cards = dados; return; }
    } catch (e) {
      console.warn("Falha ao ler os dados salvos:", e);
    }
  }
  cards = CARTOES.map(criarCard);
  salvar();
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(cards));
  } catch (e) {
    aviso("Não foi possível salvar (armazenamento cheio ou bloqueado).");
  }
}

/* ---------------- Revisão espaçada (SM-2 simplificado) ---------------- */

function agendar(card, nota) {
  const agora = Date.now();
  let ease = card.ease;

  if (nota === 0) {                    // esqueci
    card.reps = 0;
    card.lapses += 1;
    card.intervalo = 0;
    ease = Math.max(1.3, ease - 0.2);
    card.due = agora + 10 * 60 * 1000;  // volta em 10 minutos
  } else if (nota === 3) {             // difícil
    card.intervalo = Math.max(1, Math.round((card.intervalo || 1) * 1.2));
    ease = Math.max(1.3, ease - 0.15);
    card.due = agora + card.intervalo * DIA;
  } else if (nota === 4) {             // fácil
    if (card.reps === 0) card.intervalo = 1;
    else if (card.reps === 1) card.intervalo = 3;
    else card.intervalo = Math.max(1, Math.round(card.intervalo * ease));
    card.due = agora + card.intervalo * DIA;
  } else {                             // muito fácil
    if (card.reps === 0) card.intervalo = 3;
    else card.intervalo = Math.max(2, Math.round(card.intervalo * ease * 1.3));
    ease = Math.min(3, ease + 0.15);
    card.due = agora + card.intervalo * DIA;
  }

  card.ease = Math.min(3, ease);
  card.reps += 1;
  card.lastReview = agora;
}

function estaVencido(card) {
  return card.due <= Date.now();
}

/* ---------------- Temas ---------------- */

function preencherSelectTemas() {
  const opcoes = TEMAS.map((t) =>
    `<option value="${t.id}">${t.emoji} ${escapar(t.nome)}</option>`).join("");

  $("#filtro-tema").innerHTML = `<option value="">Todos os temas</option>` + opcoes;
  $("#quiz-tema").innerHTML = `<option value="">Todos os temas</option>` + opcoes;
  $("#linha-tema").innerHTML = `<option value="">Todos os temas</option>` + opcoes;
  $("#card-tema").innerHTML = opcoes;
}

function atualizarContador() {
  $("#contador-pendentes").textContent = cards.filter(estaVencido).length;
}

function renderResumo() {
  const hoje = cards.filter(estaVencido).length;
  const novos = cards.filter((c) => c.reps === 0).length;
  const revisados = cards.filter((c) => c.reps > 0).length;

  $("#resumo-estudo").innerHTML = [
    `<span class="resumo-item"><strong>${cards.length}</strong> cards</span>`,
    `<span class="resumo-item">📌 <strong>${hoje}</strong> para revisar</span>`,
    `<span class="resumo-item">🌱 <strong>${novos}</strong> ainda não vistos</span>`,
    `<span class="resumo-item">✅ <strong>${revisados}</strong> já revisados</span>`,
    `<span class="resumo-item">🗂️ <strong>${TEMAS.length}</strong> temas</span>`
  ].join("");
}

/* =========================================
   ABA: ESTUDAR
   ========================================= */

function montarSessao(estudarAdiante) {
  const agora = Date.now();
  let fila = cards.filter((c) => c.due <= agora);
  fila.sort((a, b) => a.due - b.due);

  if (!fila.length && estudarAdiante) {
    fila = cards.slice().sort((a, b) => a.due - b.due);
  }

  sessao = { fila, indice: 0, revelada: false, respondidas: 0, total: fila.length };
  renderEstudo();
}

function renderEstudo() {
  const areaEstudo = $("#area-estudo");
  const vazio = $("#estudo-vazio");

  if (!sessao.fila.length) {
    areaEstudo.hidden = true;
    vazio.hidden = false;
    $("#progresso-texto").textContent = "0 / 0";
    $("#progresso-fill").style.width = "0%";
    return;
  }

  vazio.hidden = true;
  areaEstudo.hidden = false;

  const card = sessao.fila[sessao.indice];
  const tema = temaPorId(card.tema);
  $("#etiqueta-tema").textContent = tema.emoji + " " + tema.nome;
  $("#cartao-frente").textContent = card.frente;
  $("#cartao-tras").textContent = card.verso;

  versoVisivel(sessao.revelada);
  $("#btn-revelar").hidden = sessao.revelada;
  $("#area-avaliacao").hidden = !sessao.revelada;

  if (sessao.revelada) {
    $("#txt-0").textContent = "em 10 min";
    $("#txt-3").textContent = "em " + Math.max(1, Math.round((card.intervalo || 1) * 1.2)) + " d";
    $("#txt-4").textContent = "em " + (card.reps <= 1 ? "1 d" : (card.reps === 2 ? "3 d" : Math.max(1, Math.round(card.intervalo * card.ease)) + " d"));
    $("#txt-5").textContent = "em " + (card.reps === 0 ? "3 d" : Math.max(2, Math.round(card.intervalo * card.ease * 1.3)) + " d");
  }

  const pct = sessao.total ? Math.round((sessao.respondidas / sessao.total) * 100) : 0;
  $("#progresso-fill").style.width = pct + "%";
  $("#progresso-texto").textContent = sessao.respondidas + " / " + sessao.total;
}

function versoVisivel(visivel) {
  $("#cartao-verso").hidden = !visivel;
}

function responderEstudo(nota) {
  if (!sessao.revelada) return;
  const card = sessao.fila[sessao.indice];
  agendar(card, nota);
  salvar();

  sessao.respondidas += 1;
  sessao.indice += 1;
  sessao.revelada = false;

  if (sessao.indice >= sessao.fila.length) {
    const total = sessao.total;
    sessao.fila = [];
    sessao.indice = 0;
    sessao.respondidas = 0;
    sessao.total = 0;
    $("#estudo-vazio-msg").textContent =
      `Você revisou ${total} card(s) nesta sessão. Volte mais tarde para as próximas revisões.`;
  }

  renderEstudo();
  atualizarContador();
  renderResumo();
  renderLista();
}

/* =========================================
   ABA: QUIZ
   ========================================= */

function montarQuiz(quantidade, tema, tipo) {
  let perguntas = [];

  if (tipo === "banco") {
    const pool = tema ? QUESTOES.filter((q) => q.tema === tema) : QUESTOES.slice();
    if (!pool.length) {
      aviso("Não há questões cadastradas para este tema.");
      return;
    }
    perguntas = embaralhar(pool).slice(0, Math.min(quantidade, pool.length)).map((q) => ({
      tipo: "multipla",
      tema: q.tema,
      pergunta: q.pergunta,
      opcoes: q.alternativas.slice(),
      correta: q.alternativas[q.correta],
      explicacao: q.explicacao,
    }));
  } else {
    let pool = tema ? cards.filter((c) => c.tema === tema) : cards.slice();
    if (pool.length < 2) {
      aviso("É preciso ter pelo menos 2 cards para montar um quiz.");
      return;
    }
    pool = embaralhar(pool);
    const usadas = pool.slice(0, Math.min(quantidade, pool.length));
    const outros = embaralhar(cards.filter((c) => !usadas.some((u) => u.id === c.id)));

    perguntas = usadas.map((card) => {
      const p = { tipo, tema: card.tema, pergunta: card.frente, correta: card.verso, explicacao: "" };
      if (tipo === "multipla") {
        const distratores = outros.slice(0, 3).map((c) => c.verso);
        p.opcoes = embaralhar([card.verso, ...distratores]);
      }
      return p;
    });
  }

  quiz = { perguntas, indice: 0, acertos: 0, tipo, erradas: [] };
  $("#quiz-config").hidden = true;
  $("#quiz-resultado").hidden = true;
  $("#quiz-jogo").hidden = false;
  renderQuiz();
}

function renderQuiz() {
  const p = quiz.perguntas[quiz.indice];
  if (!p) return;

  $("#quiz-progresso-fill").style.width = Math.round((quiz.indice / quiz.perguntas.length) * 100) + "%";
  $("#quiz-progresso-texto").textContent = (quiz.indice + 1) + " / " + quiz.perguntas.length;

  const tema = temaPorId(p.tema);
  $("#quiz-etiqueta").textContent = tema.emoji + " " + tema.nome;
  $("#quiz-pergunta").textContent = p.pergunta;
  $("#quiz-feedback").hidden = true;
  $("#quiz-feedback").className = "feedback";

  if (p.tipo === "multipla") {
    $("#quiz-multipla").hidden = false;
    $("#quiz-escrita").hidden = true;
    const letras = ["A", "B", "C", "D"];
    $("#quiz-multipla").innerHTML = p.opcoes.map((op, i) =>
      `<button class="alternativa" data-opcao="${escapar(op)}">
         <span class="letra">${letras[i]}</span>
         <span>${escapar(op)}</span>
       </button>`
    ).join("");
  } else {
    $("#quiz-multipla").hidden = true;
    $("#quiz-escrita").hidden = false;
    const input = $("#quiz-input");
    input.value = "";
    input.disabled = false;
    $("#btn-enviar-resposta").disabled = false;
    setTimeout(() => input.focus(), 50);
  }
}

function conferirResposta(resposta) {
  const p = quiz.perguntas[quiz.indice];
  let acertou = false;

  if (p.tipo === "multipla") {
    acertou = resposta === p.correta;
    $$("#quiz-multipla .alternativa").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.opcao === p.correta) btn.classList.add("correta");
      else if (btn.dataset.opcao === resposta) btn.classList.add("errada");
    });
  } else {
    const a = normalizar(resposta);
    const b = normalizar(p.correta);
    acertou = a === b || (a.length >= 4 && b.length >= 4 && (b.includes(a) || a.includes(b)));
    $("#quiz-input").disabled = true;
    $("#btn-enviar-resposta").disabled = true;
  }

  if (acertou) quiz.acertos += 1;
  else quiz.erradas.push(p);

  const feedback = $("#quiz-feedback");
  feedback.hidden = false;
  feedback.className = "feedback " + (acertou ? "acertou" : "errou");
  $("#quiz-feedback-titulo").textContent = acertou ? "Acertou! ✅" : "Não foi dessa vez ❌";

  const explicacao = p.explicacao
    ? `<br><em>${escapar(p.explicacao)}</em>`
    : "";
  $("#quiz-feedback-texto").innerHTML = acertou
    ? `Resposta: <strong>${escapar(p.correta)}</strong>${explicacao}`
    : `Resposta correta: <strong>${escapar(p.correta)}</strong>${explicacao}`;

  $("#btn-proxima").textContent = quiz.indice === quiz.perguntas.length - 1 ? "Ver resultado" : "Próxima questão";
}

function proximaPergunta() {
  quiz.indice += 1;
  if (quiz.indice >= quiz.perguntas.length) {
    $("#quiz-jogo").hidden = true;
    $("#quiz-resultado").hidden = false;
    renderResultado();
  } else {
    renderQuiz();
  }
}

function renderResultado() {
  const total = quiz.perguntas.length;
  const nota = quiz.acertos;
  const pct = Math.round((nota / total) * 100);
  const icone = $("#resultado-icone");
  const titulo = $("#resultado-titulo");
  const msg = $("#resultado-msg");

  $("#resultado-nota").textContent = nota;
  $("#resultado-total").textContent = total;

  if (pct === 100) {
    icone.textContent = "🏆"; titulo.textContent = "Perfeito!";
    msg.textContent = "Você acertou todas as questões. Excelente domínio do conteúdo!";
  } else if (pct >= 70) {
    icone.textContent = "🎉"; titulo.textContent = "Muito bom!";
    msg.textContent = "Você acertou a maioria. Revise os pontos que errou e tente de novo.";
  } else if (pct >= 40) {
    icone.textContent = "📚"; titulo.textContent = "Bom começo!";
    msg.textContent = "Ainda dá para melhorar. Revise os cards errados e refaça o quiz.";
  } else {
    icone.textContent = "💪"; titulo.textContent = "Continue estudando!";
    msg.textContent = "Volte ao modo Estudar para memorizar o conteúdo antes de tentar novamente.";
  }

  $("#btn-refazer-erradas").hidden = quiz.erradas.length === 0;
}

function refazerErradas() {
  const perguntas = embaralhar(quiz.erradas).map((p) => {
    const nova = Object.assign({}, p);
    if (nova.tipo === "multipla") nova.opcoes = embaralhar(nova.opcoes);
    return nova;
  });
  if (!perguntas.length) return;

  quiz = { perguntas, indice: 0, acertos: 0, tipo: quiz.tipo, erradas: [] };
  $("#quiz-resultado").hidden = true;
  $("#quiz-jogo").hidden = false;
  renderQuiz();
}

/* =========================================
   ABA: CARDS
   ========================================= */

function cardsFiltrados() {
  const busca = normalizar(filtro.busca);
  const agora = Date.now();

  return cards.filter((c) => {
    if (filtro.tema && c.tema !== filtro.tema) return false;

    if (busca) {
      const alvo = normalizar(c.frente + " " + c.verso + " " + nomeTema(c.tema));
      if (!alvo.includes(busca)) return false;
    }

    if (filtro.status) {
      const diff = c.due - agora;
      if (filtro.status === "due") { if (diff > 0) return false; }
      else if (diff > Number(filtro.status) * DIA) return false;
    }
    return true;
  });
}

function renderLista() {
  const lista = cardsFiltrados();
  const container = $("#lista-cards");
  $("#cards-vazio").hidden = lista.length > 0;

  container.innerHTML = lista.map((c) => {
    const diff = c.due - Date.now();
    const atrasado = diff <= 0;
    const pill = atrasado
      ? '<span class="pill hoje">Para revisar agora</span>'
      : `<span class="pill futuro">Revisar em ${Math.max(1, Math.round(diff / DIA))} d</span>`;
    const novas = c.reps === 0 ? '<span class="pill">Novo</span>' : '';
    const tema = `<span class="pill">${escapar(nomeTema(c.tema))}</span>`;

    return `<article class="item-card">
      <span class="item-frente">${escapar(c.frente)}</span>
      <span class="item-tras">${escapar(c.verso)}</span>
      <span class="item-meta">${tema}${novas}${pill}<span class="pill">${c.reps} ${c.reps === 1 ? "revisão" : "revisões"}</span></span>
      <span class="item-acoes">
        <button class="btn btn-claro" data-editar="${c.id}">Editar</button>
        <button class="btn btn-claro" data-excluir="${c.id}">Excluir</button>
      </span>
    </article>`;
  }).join("");
}

/* ---------------- Modal ---------------- */

function abrirModal(card) {
  cardEditando = card || null;
  $("#modal-titulo").textContent = card ? "Editar card" : "Novo card";
  $("#card-frente").value = card ? card.frente : "";
  $("#card-tras").value = card ? card.verso : "";
  $("#card-tema").value = card ? card.tema : TEMAS[0].id;
  $("#modal-fundo").hidden = false;
  setTimeout(() => $("#card-frente").focus(), 50);
}

function fecharModal() {
  $("#modal-fundo").hidden = true;
  cardEditando = null;
}

function salvarCardForm() {
  const frente = $("#card-frente").value.trim();
  const verso = $("#card-tras").value.trim();
  const tema = $("#card-tema").value;

  if (!frente || !verso) {
    aviso("Preencha a pergunta e a resposta.");
    return;
  }

  if (cardEditando) {
    cardEditando.frente = frente;
    cardEditando.verso = verso;
    cardEditando.tema = tema;
    aviso("Card atualizado.");
  } else {
    cards.unshift(criarCard({ frente, verso, tema }));
    aviso("Card criado!");
  }

  salvar();
  fecharModal();
  renderLista();
  atualizarContador();
  renderResumo();
  montarSessao(false);
}

/* ---------------- Importar / Exportar ---------------- */

function exportarCards() {
  const conteudo = JSON.stringify(cards, null, 2);
  const blob = new Blob([conteudo], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cards-historia-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  aviso("Cards exportados!");
}

function importarCards(texto) {
  try {
    const dados = JSON.parse(texto);
    if (!Array.isArray(dados)) throw new Error("formato inválido");

    const validos = dados.filter((d) => d && d.frente && d.verso).map((d) => {
      const novo = criarCard({
        frente: d.frente,
        verso: d.verso,
        tema: TEMAS.some((t) => t.id === d.tema) ? d.tema : TEMAS[0].id,
      });
      if (typeof d.ease === "number") novo.ease = d.ease;
      if (typeof d.reps === "number") novo.reps = d.reps;
      if (typeof d.intervalo === "number") novo.intervalo = d.intervalo;
      if (typeof d.due === "number") novo.due = d.due;
      if (typeof d.lapses === "number") novo.lapses = d.lapses;
      return novo;
    });

    if (!validos.length) throw new Error("nenhum card válido");

    const ids = new Set(cards.map((c) => c.id));
    validos.forEach((c) => { if (ids.has(c.id)) c.id = uid(); });
    cards = cards.concat(validos);

    salvar();
    renderLista();
    atualizarContador();
    renderResumo();
    montarSessao(false);
    aviso(`${validos.length} card(s) importado(s)!`);
  } catch (e) {
    aviso("Arquivo inválido: " + e.message);
  }
}

/* =========================================
   ABA: LINHA DO TEMPO
   ========================================= */

function renderLinha() {
  const tema = $("#linha-tema").value;
  const busca = normalizar($("#linha-busca").value);

  const eventos = LINHA_DO_TEMPO
    .filter((e) => (!tema || e.tema === tema))
    .filter((e) => !busca || normalizar(e.titulo + " " + e.descricao).includes(busca))
    .slice()
    .sort((a, b) => a.ano - b.ano);

  $("#linha-lista").innerHTML = eventos.map((e) => {
    const t = temaPorId(e.tema);
    const ano = e.ano < 0 ? `${Math.abs(e.ano)} a.C.` : String(e.ano);
    return `<li class="evento">
      <span class="evento-ano">${ano}</span>
      <p class="evento-titulo">${escapar(e.titulo)}</p>
      <p class="evento-desc">${escapar(e.descricao)}</p>
      <span class="pill evento-tema">${t.emoji} ${escapar(t.nome)}</span>
    </li>`;
  }).join("") || `<li class="vazio"><p>Nenhum evento encontrado.</p></li>`;
}

/* =========================================
   EVENTOS
   ========================================= */

function trocarAba(nome) {
  $$(".aba").forEach((b) => b.classList.toggle("ativa", b.dataset.aba === nome));
  $$(".painel").forEach((p) => p.classList.toggle("ativo", p.id === "painel-" + nome));
}

function alternarTema() {
  const escuro = document.body.classList.toggle("tema-escuro");
  localStorage.setItem(CHAVE_TEMA, escuro ? "escuro" : "claro");
  $("#btn-tema").textContent = escuro ? "☀️" : "🌙";
}

function registrarEventos() {
  // Abas
  $$(".aba").forEach((btn) => btn.addEventListener("click", () => trocarAba(btn.dataset.aba)));

  // Tema claro/escuro
  $("#btn-tema").addEventListener("click", alternarTema);

  // Estudar
  $("#btn-revelar").addEventListener("click", () => {
    sessao.revelada = true;
    renderEstudo();
  });

  $$(".avaliacao-botoes .btn").forEach((btn) => {
    btn.addEventListener("click", () => responderEstudo(Number(btn.dataset.nota)));
  });

  $("#btn-estudar-fora").addEventListener("click", () => montarSessao(true));
  $("#btn-ir-quiz").addEventListener("click", () => trocarAba("quiz"));

  // Quiz
  $("#quiz-quantidade").addEventListener("input", (e) => {
    $("#quiz-quantidade-valor").textContent = e.target.value;
  });

  $("#btn-iniciar-quiz").addEventListener("click", () => {
    const tipo = document.querySelector('input[name="quiz-tipo"]:checked').value;
    montarQuiz(Number($("#quiz-quantidade").value), $("#quiz-tema").value, tipo);
  });

  $("#quiz-multipla").addEventListener("click", (e) => {
    const btn = e.target.closest(".alternativa");
    if (btn && !btn.disabled) conferirResposta(btn.dataset.opcao);
  });

  $("#btn-enviar-resposta").addEventListener("click", () => {
    const valor = $("#quiz-input").value.trim();
    if (!valor) { aviso("Escreva sua resposta antes de enviar."); return; }
    conferirResposta(valor);
  });

  $("#quiz-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      $("#btn-enviar-resposta").click();
    }
  });

  $("#btn-proxima").addEventListener("click", proximaPergunta);
  $("#btn-novo-quiz").addEventListener("click", () => {
    $("#quiz-config").hidden = false;
    $("#quiz-jogo").hidden = true;
    $("#quiz-resultado").hidden = true;
  });
  $("#btn-refazer-erradas").addEventListener("click", refazerErradas);

  // Cards
  $("#btn-novo-card").addEventListener("click", () => abrirModal(null));
  $("#btn-cancelar").addEventListener("click", fecharModal);
  $("#modal-fundo").addEventListener("click", (e) => {
    if (e.target === $("#modal-fundo")) fecharModal();
  });
  $("#form-card").addEventListener("submit", (e) => {
    e.preventDefault();
    salvarCardForm();
  });

  $("#busca").addEventListener("input", (e) => { filtro.busca = e.target.value; renderLista(); });
  $("#filtro-tema").addEventListener("change", (e) => { filtro.tema = e.target.value; renderLista(); });
  $("#filtro-status").addEventListener("change", (e) => { filtro.status = e.target.value; renderLista(); });

  $("#lista-cards").addEventListener("click", (e) => {
    const editar = e.target.closest("[data-editar]");
    const excluir = e.target.closest("[data-excluir]");

    if (editar) {
      const card = cards.find((c) => c.id === editar.dataset.editar);
      if (card) abrirModal(card);
    }

    if (excluir) {
      const card = cards.find((c) => c.id === excluir.dataset.excluir);
      if (!card) return;
      if (confirm(`Excluir este card?\n\n${card.frente}`)) {
        cards = cards.filter((c) => c.id !== card.id);
        salvar();
        renderLista();
        atualizarContador();
        renderResumo();
        montarSessao(false);
        aviso("Card excluído.");
      }
    }
  });

  $("#btn-exportar").addEventListener("click", exportarCards);
  $("#btn-importar").addEventListener("click", () => $("#input-importar").click());
  $("#input-importar").addEventListener("change", (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => importarCards(leitor.result);
    leitor.readAsText(arquivo);
    e.target.value = "";
  });

  // Linha do tempo
  $("#linha-tema").addEventListener("change", renderLinha);
  $("#linha-busca").addEventListener("input", renderLinha);

  // Atalhos de teclado
  document.addEventListener("keydown", (e) => {
    if ($("#modal-fundo").hidden === false) return;
    const noQuiz = $("#painel-quiz").classList.contains("ativo");
    const noEstudo = $("#painel-estudar").classList.contains("ativo");

    if (noEstudo && !sessao.revelada && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      $("#btn-revelar").click();
    } else if (noEstudo && sessao.revelada && ["1", "2", "3", "4"].includes(e.key)) {
      const notas = [0, 3, 4, 5];
      responderEstudo(notas[Number(e.key) - 1]);
    } else if (noQuiz && !e.target.closest("input, textarea, select")) {
      if (e.key === "Enter" && $("#quiz-jogo").hidden === false) $("#btn-proxima").click();
    }
  });
}

/* =========================================
   PWA: service worker e instalação
   ========================================= */

let promptInstalacao = null;

function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((e) => {
      console.warn("Service worker não registrado:", e);
    });
  });
}

function prepararInstalacao() {
  const botao = $("#btn-instalar");
  if (!botao) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    promptInstalacao = e;
    botao.hidden = false;
  });

  botao.addEventListener("click", async () => {
    if (!promptInstalacao) {
      /* Navegador sem instalação automática (ex.: Safari): explica o caminho. */
      aviso("Use o menu do navegador (⋮) → “Instalar aplicativo” ou “Adicionar à tela de início”.");
      return;
    }
    botao.hidden = true;
    promptInstalacao.prompt();
    await promptInstalacao.userChoice;
    promptInstalacao = null;
  });

  window.addEventListener("appinstalled", () => {
    botao.hidden = true;
    promptInstalacao = null;
    aviso("App instalado! Agora ele abre direto na tela inicial.");
  });

  /* Se o navegador não disparar o evento, mostramos o botão mesmo assim
     para o aluno saber que existe a opção de instalar. */
  setTimeout(() => {
    if (promptInstalacao) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    botao.hidden = false;
  }, 2500);
}

/* =========================================
   INICIALIZAÇÃO
   ========================================= */

function iniciar() {
  if (localStorage.getItem(CHAVE_TEMA) === "escuro") {
    document.body.classList.add("tema-escuro");
    $("#btn-tema").textContent = "☀️";
  }

  carregar();
  preencherSelectTemas();
  registrarEventos();
  renderLista();
  renderResumo();
  renderLinha();
  atualizarContador();
  montarSessao(false);

  registrarServiceWorker();
  prepararInstalacao();
}

document.addEventListener("DOMContentLoaded", iniciar);
