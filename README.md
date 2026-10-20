# Aplicativos de História 🏛️

Duas ferramentas para estudar **História**, feitas em HTML, CSS e JavaScript puro
(sem dependências, sem build). Toda a interface e todo o conteúdo estão em
**português do Brasil (pt-BR)**.

Abra [`app/index.html`](app/index.html) no navegador para ver a lista de aplicativos
e escolher qual usar. Não é preciso instalar nada.

## Instalar no celular ou no computador

Os dois aplicativos são **PWAs**: dá para instalar na tela inicial e usar offline.

- **Android/Chrome:** banner "Adicionar à tela de início" ou o botão **📲 Instalar** no topo do app
- **iPhone/iPad (Safari):** Compartilhar → "Adicionar à Tela de Início"
- **Chrome/Edge no PC:** ícone de instalar na barra de endereço

Online: **https://maccasdoshtml.github.io/atividadedemichel/**

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
app/
├── index.html                     # página inicial com os links
├── cronicas-da-historia/          # flashcards com repetição espaçada
│   ├── index.html
│   ├── css/styles.css
│   └── js/{dados.js, app.js}
└── histor-em-foco/                # quiz, cartões e estatísticas
    ├── index.html
    ├── css/styles.css
    └── js/{dados.js, app.js}
```

## Rodando localmente

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000/app/
```

Os dados de cada usuário ficam no `localStorage` do navegador, no dispositivo dele.
