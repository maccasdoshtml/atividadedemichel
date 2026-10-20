# Crônicas da História 🏛️

Aplicativo de estudos de **História**, feito em HTML, CSS e JavaScript puro (sem
dependências, sem build). Toda a interface e todo o conteúdo estão em **português
do Brasil (pt-BR)**.

## Como usar

Basta abrir o arquivo `index.html` no navegador — não precisa instalar nada.

```bash
# ou sirva localmente
python3 -m http.server 8000
# depois acesse http://localhost:8000/cronicas-da-historia/
```

## Funcionalidades

| Aba | O que faz |
| --- | --- |
| **Estudar** | Revisão dos cards que estão "vencidos", com repetição espaçada: cada card volta em intervalos crescentes conforme você acerta |
| **Quiz** | Três formatos — múltipla escolha montada a partir dos seus cards, banco de questões com explicação, ou resposta escrita |
| **Cards** | Criar, editar, excluir, buscar e filtrar os seus flashcards; exportar e importar em JSON |
| **Linha do tempo** | 37 eventos históricos em ordem cronológica, de 3000 a.C. a 1991, com filtro por tema e busca |

Extras: tema claro/escuro, atalhos de teclado (`Espaço` revela, `1`–`4` avaliam,
`Enter` avança), layout responsivo e tudo salvo no `localStorage` do navegador.

## Instalar como app (PWA)

O app é uma **PWA** (Progressive Web App): pode ser instalada na tela inicial do
celular ou do computador e funciona **offline**.

- **No celular (Android/Chrome):** abra o site e use o banner "Adicionar à tela
  de início", ou o botão **📲 Instalar** que aparece no topo do app.
- **No iPhone/iPad (Safari):** toque em Compartilhar → "Adicionar à Tela de Início".
- **No computador (Chrome/Edge):** clique no ícone de instalar na barra de
  endereço, ou no botão **📲 Instalar** do app.

O que sustenta a instalação: `manifest.webmanifest` (nome, ícone, cores e modo
standalone) e `sw.js`, um service worker que guarda a casca do app no cache — por
isso ele abre sem internet. Os seus cards continuam salvos no `localStorage` do
navegador.

## Como funciona a repetição espaçada

Ao responder um card você informa quanto lembrava. O intervalo até a próxima revisão
é recalculado (algoritmo SM-2 simplificado):

| Resposta | Próxima revisão |
| --- | --- |
| **Esqueci** | 10 minutos (o card volta na mesma sessão) |
| **Difícil** | ~1,2× o intervalo atual, e a dificuldade ("ease") cai um pouco |
| **Fácil** | 1 dia → 3 dias → intervalo × dificuldade |
| **Muito fácil** | 3 dias no primeiro uso, depois até 1,3× o intervalo previsto |

Cards esquecidos voltam antes e com mais frequência; cards fáceis ficam dias longe.
O botão **"Estudar à frente"** mostra cards que ainda não estão vencidos, para
quem quer adiantar conteúdo.

## Conteúdo

6 temas — Brasil: colonização e Império · Brasil: República e hoje · Mundo Antigo ·
Idade Média e Renascimento · Revoluções e Era Moderna · Guerras Mundiais e Guerra Fria.

- **63 flashcards** prontos
- **59 questões** de múltipla escolha com explicação
- **37 eventos** na linha do tempo

## Estrutura

```
app/cronicas-da-historia/
├── index.html            # estrutura da página
├── manifest.webmanifest  # dados do PWA (nome, ícone, cores, modo standalone)
├── sw.js                 # service worker (cache da casca do app / offline)
├── css/styles.css        # estilos (com suporte a tema escuro)
├── icons/                # ícones do PWA (192, 512, maskable, apple-touch)
└── js/
    ├── dados.js          # conteúdo: cards, questões e linha do tempo
    └── app.js            # lógica do aplicativo
```

Ao alterar `js/`, `css/` ou `dados.js`, suba a `VERSAO` em `sw.js` (ex.:
`cronicas-v2`) para que os navegadores peguem a versão nova do cache.

Para adicionar cards, edite `js/dados.js`: cada item precisa de `tema` (id de um
dos temas em `TEMAS`), `frente` (a pergunta) e `verso` (a resposta).
Para adicionar questões, cada item precisa de `tema`, `pergunta`, `alternativas`
(quatro), `correta` (índice da alternativa certa) e `explicacao`.

## Onde os dados ficam salvos

No `localStorage` do navegador, na chave `cronicas-historia-v1`. Os cards podem ser
exportados em JSON pela aba **Cards** e importados em outro dispositivo.
