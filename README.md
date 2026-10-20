# Aplicativos de História 🏛️

Duas ferramentas para estudar **História**, feitas em HTML, CSS e JavaScript puro
(sem dependências, sem build). Toda a interface e todo o conteúdo estão em
**português do Brasil (pt-BR)**.

Identidade visual da **Escola Estadual Professor Abel Freire Coelho — Mossoró-RN**:
paleta azul, amarelo e branco, com o brasão da escola no cabeçalho e nos ícones
do PWA (a logo em `assets/logo.svg` é **provisória** — basta trocar pelo arquivo
oficial mantendo o mesmo nome).

Abra [`app/index.html`](app/index.html) no navegador para ver a lista de aplicativos
e escolher qual usar. Não é preciso instalar nada.

## Instalar no celular ou no computador

O site inteiro é uma **PWA**: dá para instalar na tela inicial e usar offline.

- **Android/Chrome:** banner "Adicionar à tela de início" ou o botão **📲 Instalar**
  na página inicial
- **iPhone/iPad (Safari):** Compartilhar → "Adicionar à Tela de Início"
- **Chrome/Edge no PC:** ícone de instalar na barra de endereço

O botão "Instalar" só aparece quando o navegador realmente oferece a instalação.
Cada aplicativo (Crônicas e História em Foco) também pode ser instalado
separadamente, direto na página dele.

Online: **https://maccasdoshtml.github.io/atividadedemichel/**

> **Importante:** o service worker (o que permite o app funcionar sem internet) só
> funciona em **HTTPS** ou em `localhost`. Ao testar no celular, use o endereço
> online acima — por `http://` com o IP da rede o navegador bloqueia a instalação.

## Os aplicativos

### [Crônicas da História](app/cronicas-da-historia/) — [`README`](README-cronicas-da-historia.md)

- **Estudar** com repetição espaçada: as revisões de cada card voltam automaticamente
  conforme você acerta (1 dia → 3 dias → semanas)
- **Quiz** em três formatos: múltipla escolha a partir dos seus cards, banco de
  questões com explicação, ou resposta escrita
- **Cards**: criar, editar, excluir, buscar, filtrar, exportar e importar em JSON
- **Linha do tempo** com 37 eventos, de 3000 a.C. a 1991
- 63 flashcards e 59 questões prontos, em 6 temas

### [História em Foco](app/histor-em-foco/) — [`README`](README-histor-em-foco.md)

- **Quiz** de múltipla escolha com explicação após cada resposta
- **Cartões** de revisão que viram ao clique
- **Linha do tempo** com 37 eventos históricos
- **Estatísticas** de desempenho por tema

## Estrutura do repositório

```
manifest.webmanifest         # PWA do site inteiro (nome, ícone, cores, atalhos)
sw.js                        # service worker do site (cache + offline)
assets/logo.svg              # brasão da escola (provisório)
icons/                       # ícones do PWA (192, 512, maskable, apple-touch)
tools/gerar_logos.py         # script que gera os ícones a partir do brasão
app/
├── index.html               # página inicial com os links
├── js/pwa.js                # registra o service worker e o botão "Instalar"
├── cronicas-da-historia/    # flashcards com repetição espaçada
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── sw.js
│   ├── assets/logo.svg
│   ├── css/styles.css
│   └── js/{dados.js, app.js}
└── histor-em-foco/          # quiz, cartões e estatísticas
    ├── index.html
    ├── manifest.webmanifest
    ├── sw.js
    ├── assets/logo.svg
    ├── css/styles.css
    └── js/{dados.js, app.js}
```

## Rodando localmente

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000/app/
```

Os dados de cada usuário ficam no `localStorage` do navegador, no dispositivo dele.

## Depois de publicar uma versão nova

Suba a `VERSAO` nos `sw.js` (raiz e dos dois apps) para que os navegadores peguem
os arquivos novos. Para regerar os ícones depois de trocar a logo:

```bash
pip install pillow
python3 tools/gerar_logos.py
```
