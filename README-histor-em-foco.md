# História em Foco 🏛️

Aplicativo de estudos de **História**, feito em HTML, CSS e JavaScript puro (sem
dependências, sem build). Toda a interface e todo o conteúdo estão em **português
do Brasil (pt-BR)**.

## Como usar

Basta abrir o arquivo `index.html` no navegador — não precisa instalar nada.

```bash
# ou sirva localmente
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Funcionalidades

| Aba | O que faz |
| --- | --- |
| **Quiz** | 59 questões de múltipla escolha com explicação após cada resposta, nota final e revisão dos erros |
| **Cartões** | 29 cartões de revisão que viram ao clique (ou com a tecla `Espaço`) |
| **Linha do tempo** | 37 eventos históricos ordenados cronologicamente, de 3000 a.C. a 1991 |
| **Estatísticas** | Total de respostas, acertos, precisão e desempenho por tema |

Extras: atalhos de teclado (`1`–`4` respondem, `Enter` avança), filtro por tema em
todas as abas, tema claro/escuro automático, layout responsivo e progresso salvo
no `localStorage` do navegador.

## Instalar como app (PWA)

Também é uma **PWA**: abra o site e use o banner "Adicionar à tela de início" (ou
o ícone de instalar na barra de endereço). No iPhone/Safari: Compartilhar →
"Adicionar à Tela de Início". O app funciona offline graças ao service worker
(`sw.js`), e o conteúdo vem do `manifest.webmanifest`.

## Conteúdo

6 temas: Brasil (colonização e Império), Brasil (República e hoje), Mundo Antigo,
Idade Média e Renascimento, Revoluções e Era Moderna, Guerras Mundiais e Guerra Fria.

## Estrutura

```
app/histor-em-foco/
├── index.html      # estrutura da página
├── css/styles.css  # estilos (com suporte a tema escuro)
└── js/
    ├── dados.js    # conteúdo: questões, cartões e linha do tempo
    └── app.js      # lógica do aplicativo
```

Para adicionar questões, edite `js/dados.js`: cada item precisa de `tema`,
`pergunta`, `alternativas`, `correta` (índice da alternativa certa) e `explicacao`.
