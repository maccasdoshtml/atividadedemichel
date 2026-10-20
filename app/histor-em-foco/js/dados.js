/* =========================================================
   História em Foco — Base de conteúdo (pt-BR)
   ========================================================= */

const TEMAS = [
  { id: 'brasil-colonia', nome: 'Brasil: colonização e Império', emoji: '🇧🇷', cor: '#2e9e5b' },
  { id: 'brasil-republica', nome: 'Brasil: República e hoje', emoji: '🏛️', cor: '#1f8a70' },
  { id: 'mundo-antigo', nome: 'Mundo Antigo', emoji: '🏺', cor: '#c98a2b' },
  { id: 'idade-media', nome: 'Idade Média e Renascimento', emoji: '🏰', cor: '#8b5e3c' },
  { id: 'era-moderna', nome: 'Revoluções e Era Moderna', emoji: '⚖️', cor: '#b3453e' },
  { id: 'guerras', nome: 'Guerras Mundiais e Guerra Fria', emoji: '🕊️', cor: '#4a5b8c' }
];

const QUESTOES = [
  /* ---------- Brasil: colonização e Império ---------- */
  {
    tema: 'brasil-colonia',
    pergunta: 'Em que ano o Brasil foi descoberto pelos portugueses?',
    alternativas: ['1492', '1500', '1510', '1822'],
    correta: 1,
    explicacao: 'Em 22 de abril de 1500, a frota de Pedro Álvares Cabral chegou às terras do atual Brasil, que viria a ser batizada como Terra de Santa Cruz.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Qual era o principal produto da economia do Brasil colonial nos séculos XVII e XVIII?',
    alternativas: ['Café', 'Algodão', 'Ouro', 'Trigo'],
    correta: 2,
    explicacao: 'A mineração de ouro (e, depois, de diamantes) foi o motor da economia brasileira durante boa parte do período colonial.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Quem governou o Brasil colonial por mais tempo?',
    alternativas: ['Os vice-reis', 'Os capitães-mores', 'Os donatários', 'Os mamelucos'],
    correta: 0,
    explicacao: 'O cargo de vice-rei durou de 1621 a 1808 e substituiu os governadores-gerais, exercendo grande poder central sobre a colônia.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Qual lei de 13 de maio de 1823 proibiu o tráfico negreiro?',
    alternativas: ['Lei Feitoria', 'Lei do Ventre Livre', 'Lei Áurea', 'Lei dos Sexagenários'],
    correta: 1,
    explicacao: 'A Lei do Ventre Livre (1830) instituiu o nascido livre, mas o tráfico continuou ilegal por décadas — a proibição real só veio com a Lei Áurea (1888).'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Em que período o café se tornou a principal riqueza do Brasil?',
    alternativas: ['Século XVI', 'Século XVII', 'Século XIX', 'Século XX'],
    correta: 2,
    explicacao: 'A partir do início do século XIX, a produção cafeicultora concentrava a economia do Império, contando com o crescente mercado internacional.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Qual conjunto de tratados encerrou a Guerra dos Trinta Anos, em 1648?',
    alternativas: ['Tratado de Versalhes', 'Paz de Vestfália', 'Tratado de Madri', 'Convenção de Viena'],
    correta: 1,
    explicacao: 'A Paz de Vestfália encerrou a Guerra dos Trinta Anos (1618–1648) e fixou a soberania dos Estados nacionais europeus, base do sistema de estados moderno.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'O que foi o sistema de sesmarias?',
    alternativas: [
      'Um sistema de trabalho escravo para a agricultura',
      'Um regime de concessão de terras para cultivo pelo colono',
      'Uma guilda de comerciantes do Porto',
      'Um tributo em dinheiro pago à Coroa'
    ],
    correta: 1,
    explicacao: 'As sesmarias eram terras devolutas cedidas pelo governo português a colonizadores para que as cultivassem — a base da estrutura fundiária do Brasil colonial.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Em 1808, com a invasão francesa, o rei Dom João VI mudou a capital do Brasil para:',
    alternativas: ['Salvador', 'Rio de Janeiro', 'São Paulo', 'Recife'],
    correta: 1,
    explicacao: 'Em 1808 a família real portuguesa transferiu-se para o Rio de Janeiro, que se tornou capital do Império até a Proclamação da República, em 1889.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Qual foi o primeiro presidente da República do Brasil?',
    alternativas: ['Deodoro da Fonseca', 'Floriano Peixoto', 'Prudente de Morais', 'Juscelino Kubitschek'],
    correta: 0,
    explicacao: 'Deodoro da Fonseca presidiu o Brasil de 1889 a 1891; foi deposto por Floriano Peixoto, que governou até 1894.'
  },
  {
    tema: 'brasil-colonia',
    pergunta: 'Qual movimento da década de 1780 foi a primeira grande conspiração contra o domínio português no Brasil?',
    alternativas: ['Revolução de 1930', 'Inconfidência Mineira', 'Guerra dos Farrapos', 'Intentona Comunista'],
    correta: 1,
    explicacao: 'A Inconfidência Mineira (1789) foi reprimida com a execução de Tiradentes, anos mais tarde. A Conspiração dos Independentes de Minas, de 1808, foi a primeira conspiração logo após a chegada da família real.'
  },

  /* ---------- Brasil: República e hoje ---------- */
  {
    tema: 'brasil-republica',
    pergunta: 'Em que ano foi proclamada a República no Brasil?',
    alternativas: ['1888', '1889', '1891', '1900'],
    correta: 1,
    explicacao: 'A República foi proclamada em 15 de novembro de 1889, encerrando o Segundo Reinado e consolidando a República como forma de governo.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Quem foi o primeiro presidente civil eleito pelo povo no Brasil?',
    alternativas: ['Prudente de Morais', 'Campos Sales', 'Juscelino Kubitschek', 'Getúlio Vargas'],
    correta: 0,
    explicacao: 'Prudente de Morais foi eleito em 1894, o primeiro presidente civil eleito democraticamente — sua posse marcou o início da República Oligárquica.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'O que significava a política do "café com leite" no início da República?',
    alternativas: [
      'A alternância de poder entre paulistas e mineiros',
      'A ditadura daforestsiga militar',
      'O regime de 1964',
      'A reforma agrária de 1960'
    ],
    correta: 0,
    explicacao: 'A expressão resume o domínio oligárquico: São Paulo (do café) e Minas Gerais (do leite) revezavam no comando do país entre 1894 e 1930.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Em 1930, o movimento revolucionário levou ao poder:',
    alternativas: ['Juscelino Kubitschek', 'Getúlio Vargas', 'Carlos Luz', 'Epitácio Pessoa'],
    correta: 1,
    explicacao: 'A Revolução de 1930 derrubou Washington Luís e instaurou o governo de Getúlio Vargas, encerrando a República Oligárquica.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Qual documento deu base ao Estado Novo (1937–1945)?',
    alternativas: ['A Constituição de 1824', 'A Constituição de 1946', 'A Carta Constitucional de 1937', 'O Ato Institucional nº 5'],
    correta: 2,
    explicacao: 'A Carta Constitucional de 1937 concentrou poderes no presidente e instituiu o Estado Novo, um regime autoritário vigente durante a Segunda Guerra.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Quem foi a primeira mulher a disputar a Presidência do Brasil?',
    alternativas: ['Bertha Lutz', 'Ivete Vargas', 'Dilma Rousseff', 'Ruth Cardoso'],
    correta: 0,
    explicacao: 'Bertha Lutz foi a primeira mulher a disputar uma vaga à Presidência, em 1934, pelo Partido Social Democrático. Nunca foi eleita.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'O que estabeleceu o Ato Institucional nº 5, de 1968?',
    alternativas: [
      'A anistia dos presos políticos',
      'A censura prévia à imprensa e o fim das garantias constitucionais',
      'A criação do Tribunal Superior Militar',
      'A abertura política do país'
    ],
    correta: 1,
    explicacao: 'O AI-5 concentrou poderes no Executivo, instituiu a censura e endureceu a ditadura militar (1964–1985).'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Em 1985, o movimento pelas "Diretas Já" levou ao poder:',
    alternativas: ['José Sarney', 'Fernando Collor', 'Itamar Franco', 'Tancredo Neves'],
    correta: 0,
    explicacao: 'José Sarney foi eleito pelo Congresso em 1985, dando início à redemocratização após 21 anos de ditadura militar.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Qual documento é conhecido como "Constituição Cidadã"?',
    alternativas: ['Constituição de 1824', 'Constituição de 1891', 'Constituição de 1946', 'Constituição de 1988'],
    correta: 3,
    explicacao: 'A Constituição de 1988, chamada de "Constituição Cidadã", inaugurou a redemocratização e ampliou direitos sociais e políticos.'
  },
  {
    tema: 'brasil-republica',
    pergunta: 'Em que ano o Brasil ganhou a independência?',
    alternativas: ['1808', '1822', '1889', '1824'],
    correta: 1,
    explicacao: 'A Independência do Brasil foi declarada em 7 de setembro de 1822, por Dom Pedro I, que se coroou o primeiro imperador.'
  },

  /* ---------- Mundo Antigo ---------- */
  {
    tema: 'mundo-antigo',
    pergunta: 'Em que região se desenvolveu a civilização do Antigo Egito?',
    alternativas: ['Vale do Rio Tigre', 'Vale do rio Nilo', 'Planície do Indo', 'Costa do Mediterrâneo'],
    correta: 1,
    explicacao: 'O Egito Antigo floresceu às margens do rio Nilo, cuja cheia anual fertilizava as terras e sustentava a agricultura faraônica.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Qual civilização antiga ergueu a cidade de Machu Picchu?',
    alternativas: ['Astecas', 'Maias', 'Incas', 'Olmecas'],
    correta: 2,
    explicacao: 'Machu Picchu é uma cidade inca nos Andes, construída no século XV e abandonada no século XVI.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Qual filósofo grego escreveu o diálogo "A República"?',
    alternativas: ['Sócrates', 'Platão', 'Aristóteles', 'Heródoto'],
    correta: 1,
    explicacao: 'Platão escreveu "A República", diálogo sobre justiça, política e educação — obra central do pensamento filosófico ocidental.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Qual império foi governado por Júlio César e, depois, por Augusto?',
    alternativas: ['Império Grego', 'Império Romano', 'Império Persa', 'Império Egípcio'],
    correta: 1,
    explicacao: 'Júlio Césarditou a República romana e seu herdeiro Augusto inaugurou o Principado, período de Pax Romana.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'A Muralha da China, em sua forma mais extensa, foi erguida principalmente durante qual dinastia?',
    alternativas: ['Tang', 'Han', 'Ming', 'Song'],
    correta: 2,
    explicacao: 'A Grande Muralha foi consolidada principalmente na dinastia Ming (1368–1644), unindo muralhas erguidas por dinastias anteriores.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'O Código de Hamurábi foi gravado no Antigo Iraque. Sob qual domínio?',
    alternativas: ['Egípcio', 'Babilônico', 'Assírio', 'Hitita'],
    correta: 1,
    explicacao: 'Hamurábi foi rei da Babilônia no século XVIII a.C.; seu código de leis gravado em estelas é uma das fontes mais antigas do direito.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Qual povo mesoamericano desenvolveu a escrita e o calendário usados por maias e astecas?',
    alternativas: ['Os olmecas', 'Os zapotecos', 'Os purépecha', 'Os tarascos'],
    correta: 0,
    explicacao: 'Os olmecas são considerados o berço das civilizações mesoamericanas, tendo criado um sistema de escrita, contagem e calendário.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Qual filósofo grego fundou a escola que buscava explicar o universo por meio dos números?',
    alternativas: ['Sócrates', 'Pitágoras', 'Demócrito', 'Heródoto'],
    correta: 1,
    explicacao: 'Pitágoras de Samos (séc. VI a.C.) fundou a escola pitagórica, que relacionava os números e as proporções à explicação do universo.'
  },
  {
    tema: 'mundo-antigo',
    pergunta: 'Quem unificou os estados chineses e fundou o primeiro império do país?',
    alternativas: ['Han Wendi', 'Qin Shi Huang', 'Kublai Khan', 'Confúcio'],
    correta: 1,
    explicacao: 'Qin Shi Huang unificou os estados no século III a.C. e padronizou escrita, moedas, pesos e medidas, fundando o Império Qin.'
  },

  /* ---------- Idade Média e Renascimento ---------- */
  {
    tema: 'idade-media',
    pergunta: 'Qual sistema econômico predominou na Europa feudal?',
    alternativas: ['Economia de mercado', 'Economia feudal', 'Economia planificada', 'Economia industrial'],
    correta: 1,
    explicacao: 'Na economia feudal, a produção agrícola destinava-se à subsistência, e o servo estava vinculado à terra que cultivava.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Qual foi a consequência principal das Cruzadas, formadas na Idade Média?',
    alternativas: [
      'O fim imediato do feudalismo',
      'A intensificação do comércio mediterrâneo e o contato com o Oriente',
      'A unificação política da Europa',
      'A invenção da imprensa'
    ],
    correta: 1,
    explicacao: 'Além do aspecto religioso, as Cruzadas abriram rotas comerciais com o Mediterrâneo oriental, impulsionando cidades como Veneza e Gênova.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Quem pintou o teto da Capela Sistina?',
    alternativas: ['Leonardo da Vinci', 'Michelangelo', 'Rafael', 'Albrecht Dürer'],
    correta: 1,
    explicacao: 'Michelangelo pintou o teto e a parede do altar da Capela Sistina (1508–1512), uma das obras emblemáticas do Renascimento.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Qual invenção de Gutenberg, por volta de 1440, revolucionou a difusão do conhecimento?',
    alternativas: ['A prensa tipográfica', 'A bússola', 'A pólvora', 'O papel'],
    correta: 0,
    explicacao: 'A prensa de tipos móveis multiplicou a produção de livros na Europa e contribuiu decisivamente para a Reforma e para a Revolução Científica.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Em 1453, os otomanos tomaram Constantinopla, encerrando o Império Bizantino. Quem comandava o cerco?',
    alternativas: ['Tamerlão', 'Maomé II', 'Selim I', 'Solimão, o Magnífico'],
    correta: 1,
    explicacao: 'Maomé II (Mehmed II) conquistou Constantinopla aos 21 anos, tornando-a Istambul, capital do Império Otomano.'
  },
  {
    tema: 'idade-media',
    pergunta: 'A Peste Negra (século XIV) chegou à Europa principalmente por via:',
    alternativas: ['Marítima, com os navios genoveses', 'Terrestre, pela Rota da Seda', 'Aérea', 'Fluvial, pelo Reno'],
    correta: 0,
    explicacao: 'A peste chegou em 1347 com navios genoveses que aportaram em Messina, espalhando-se rapidamente pelo continente europeu.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Qual filósofo grego influenciou fortemente o pensamento da Idade Média?',
    alternativas: ['Platão', 'Aristóteles', 'Epicuro', 'Cínico'],
    correta: 1,
    explicacao: 'As obras de Aristóteles, redescobertas pelos cruzados e traduzidas do árabe, viraram a base do pensamento escolar medieval.'
  },
  {
    tema: 'idade-media',
    pergunta: 'O que caracterizava a arquitetura gótica?',
    alternativas: [
      'Arcos de volta perfeita e paredes espessas',
      'Arcos ogivais, vitrais e grande verticalidade',
      'Colunas dóricas e frontões gregos',
      'Cúpulas bizantinas em cúpula '
    ],
    correta: 1,
    explicacao: 'A arquitetura gótica, com arcos ogivais e grandes vitrais, buscava altura e luz — um contraponto às catedrais românicas.'
  },
  {
    tema: 'idade-media',
    pergunta: 'Qual movimento renascentista valorizava o ser humano e a Antiguidade clássica?',
    alternativas: ['O Humanismo', 'O Teocentrismo', 'O Feudalismo', 'O Barroco'],
    correta: 0,
    explicacao: 'O humanismo do Renascimento colocou o homem no centro das reflexões, retomando a herança da Grécia e de Roma.'
  },

  /* ---------- Revoluções e Era Moderna ---------- */
  {
    tema: 'era-moderna',
    pergunta: 'Em que ano começou a Revolução Francesa?',
    alternativas: ['1776', '1789', '1804', '1815'],
    correta: 1,
    explicacao: 'A Revolução Francesa começou em julho de 1789, com a tomada da Bastilha — marco inicial da Idade Contemporânea.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Qual documento promulgado em 1789 marcou a Revolução Francesa?',
    alternativas: [
      'A Carta Magna',
      'A Declaração dos Direitos do Homem e do Cidadão',
      'O Código de Napoleão',
      'O Manifesto Comunista'
    ],
    correta: 1,
    explicacao: 'A Declaração dos Direitos do Homem e do Cidadão (26 de agosto de 1789) proclamou a liberdade, a igualdade e a soberania popular.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Em 1815, após a derrota de Napoleão, qual conferência redefiniu a Europa?',
    alternativas: ['Congresso de Viena', 'Congresso de Berlim', 'Conferência de Versalhes', 'Tratado de Versalhes'],
    correta: 0,
    explicacao: 'O Congresso de Viena (1814–1815) restaurou as monarquias europeias e desenhou o equilíbrio de poder do século XIX.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'A Revolução Industrial começou na Inglaterra, impulsionada inicialmente por qual setor?',
    alternativas: ['Têxteis', 'Siderurgia', 'Ferrovia', 'Química'],
    correta: 0,
    explicacao: 'A indústria têxtil, com o tear de fiação de Jenny e a máquina a vapor de Watt, foi a alavanca inicial da industrialização.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Qual líder liderou a unificação da Alemanha em 1871?',
    alternativas: ['Otto von Bismarck', 'Napoleão III', 'Kaiser Wilhelm II', 'Frederico, o Grande'],
    correta: 0,
    explicacao: 'Bismarck unificou os Estados alemães por meio de três guerras (Dinamarca, Áustria e França), proclamando o Império em 1871.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'A Restauração Meiji (1868) transformou o Japão por meio de:',
    alternativas: [
      'Da restauração do poder imperial após a Guerra Civil',
      'Da industrialização acelerada e da abertura ao Ocidente',
      'Da fundação do Partido Comunista Japonês',
      'Da anexação pela China'
    ],
    correta: 1,
    explicacao: 'A Restauração Meiji modernizou o Japão rapidamente, transformando-o na primeira potência asiática do século XX.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Qual potência europeia exercia maior influência na China no século XIX?',
    alternativas: ['Portugal', 'Holanda', 'Reino Unido', 'Espanha'],
    correta: 2,
    explicacao: 'O Reino Unido dominava o comércio com a China, o que levou às Guerras do Ópio (1839–1842) e à abertura do mercado chinês.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'O Iluminismo europeu influenciou diretamente:',
    alternativas: ['As Revoluções Americana e Francesa', 'A Santa Inquisição', 'O Absolutismo', 'A Guerra dos Trinta Anos'],
    correta: 0,
    explicacao: 'Ideias como o contrato social, a separação dos poderes e os direitos individuais alimentaram as revoluções do século XVIII.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Em 1848, qual livro de Karl Marx e Friedrich Engels foi publicado?',
    alternativas: ['O Capital', 'O Manifesto Comunista', 'A República', 'O Contrato Social'],
    correta: 1,
    explicacao: 'O Manifesto Comunista, publicado em fevereiro de 1848, defendia a abolição do sistema capitalista e a revolução proletária.'
  },
  {
    tema: 'era-moderna',
    pergunta: 'Em 1494, o Tratado de Tordesillas dividiu as terras do Novo Mundo entre:',
    alternativas: ['Portugal e Espanha', 'Inglaterra e França', 'Holanda e Portugal', 'Espanha e Inglaterra'],
    correta: 0,
    explicacao: 'O acordo firmado entre Portugal e Espanha traçou a linha de demarcação que repartiu as terras descobertas entre as duas coroas.'
  },

  /* ---------- Guerras e Guerra Fria ---------- */
  {
    tema: 'guerras',
    pergunta: 'Em que ano começou a Primeira Guerra Mundial?',
    alternativas: ['1912', '1914', '1918', '1919'],
    correta: 1,
    explicacao: 'A Grande Guerra começou em 1914, com a crise de Sarajevo e a declaração de guerra da Áustria-Hungria à Sérvia.'
  },
  {
    tema: 'guerras',
    pergunta: 'Qual foi o estopim imediato da Primeira Guerra Mundial?',
    alternativas: [
      'A queda do Muro de Berlim',
      'O assassinato do arquiduque Francisco Ferdinando',
      'A invasão do Iraque',
      'A coroação de Napoleão'
    ],
    correta: 1,
    explicacao: 'O assassinato do arquiduque sérvio Francisco Ferdinando, em Sarajevo, em junho de 1914, desencadeou a rede de alianças que levou à guerra.'
  },
  {
    tema: 'guerras',
    pergunta: 'Em que ano terminou a Segunda Guerra Mundial?',
    alternativas: ['1943', '1944', '1945', '1946'],
    correta: 2,
    explicacao: 'A guerra terminou em 1945, com a rendição da Alemanha em maio e a do Japão em setembro.'
  },
  {
    tema: 'guerras',
    pergunta: 'Quais são as duas cidades atômicas lançadas sobre o Japão em agosto de 1945?',
    alternativas: ['Tóquio e Osaka', 'Hiroshima e Nagasaki', 'Quioto e Yokohama', 'Nagasaki e Kobe'],
    correta: 1,
    explicacao: 'Em 6 e 9 de agosto de 1945, os bombardeios atômicos de Hiroshima e Nagasaki encerraram a guerra no Pacífico.'
  },
  {
    tema: 'guerras',
    pergunta: 'A Guerra Fria opôs dois grandes blocos:',
    alternativas: [
      'Alemanha e França',
      'Estados Unidos e União Soviética',
      'Inglaterra e Portugal',
      'Japão e China'
    ],
    correta: 1,
    explicacao: 'A Guerra Fria opôs o bloco capitalista, liderado pelos EUA, ao bloco soviético, em um confronto sem confronto armado direto.'
  },
  {
    tema: 'guerras',
    pergunta: 'Qual organização internacional foi criada em 1945 para manter a paz mundial?',
    alternativas: ['A Liga das Nações', 'A ONU', 'A União Europeia', 'A OTAN'],
    correta: 1,
    explicacao: 'A ONU (Organização das Nações Unidas) foi fundada em 1945, após a Segunda Guerra Mundial, com sede em Nova York.'
  },
  {
    tema: 'guerras',
    pergunta: 'Em 1957, qual evento inaugurou a corrida espacial?',
    alternativas: [
      'O primeiro ser humano na Lua',
      'O lançamento do Sputnik pela URSS',
      'A primeira missão tripulada da NASA',
      'A criação da NASA'
    ],
    correta: 1,
    explicacao: 'O Sputnik 1, o primeiro satélite artificial, foi lançado pela URSS em 4 de outubro de 1957, iniciando a era espacial.'
  },
  {
    tema: 'guerras',
    pergunta: 'Quem governava a Alemanha nazista durante a Segunda Guerra Mundial?',
    alternativas: ['Wilhelm II', 'Adolf Hitler', 'Hermann Göring', 'Heinrich Himmler'],
    correta: 1,
    explicacao: 'Adolf Hitler liderou o Terceiro Reich de 1933 a 1945, responsável pela Segunda Guerra Mundial e pelo Holocausto.'
  },
  {
    tema: 'guerras',
    pergunta: 'Em 1969, a missão Apollo 11 levou o primeiro ser humano à Lua. Quem foi?',
    alternativas: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'John Glenn'],
    correta: 1,
    explicacao: 'Neil Armstrong deu o primeiro passo na Lua em 20 de julho de 1969, seguido por Buzz Aldrin.'
  },
  {
    tema: 'guerras',
    pergunta: 'Qual conflito opôs Estados Unidos e Vietnã entre 1955 e 1975?',
    alternativas: ['Guerra da Bahia', 'Guerra do Vietnã', 'Guerra da Coréia', 'Guerra das Falklands'],
    correta: 1,
    explicacao: 'A Guerra do Vietnã opôs o Vietnã do Norte, com apoio soviético e chinês, ao Vietnã do Sul, patrocinado pelos EUA.'
  },
  {
    tema: 'guerras',
    pergunta: 'O que marcou o fim da Guerra Fria?',
    alternativas: [
      'A assinatura do Tratado de Versalhes',
      'A queda do Muro de Berlim (1989) e a dissolução da URSS (1991)',
      'O fim da Guerra do Vietnã',
      'A criação da ONU'
    ],
    correta: 1,
    explicacao: 'A queda do Muro de Berlim e a dissolução da União Soviética encerraram a bipolaridade que sustentava a Guerra Fria.'
  }
];

const CARTOES = [
  { tema: 'brasil-colonia', frente: 'O que foi o tráfico negreiro?', verso: 'O transporte forçado de pessoas africanas para o Brasil, para trabalhar como escravas. Foi proibido pela Lei Áurea (1888), mas na prática cessou apenas com a Lei dos Sexagenários (1835), que proibiu o tráfico atlântico.' },
  { tema: 'brasil-colonia', frente: 'Qual foi o impacto do açúcar no Brasil colonial?', verso: 'Criou a elite dos senhores de engenho, financeou o tráfico negreiro e tornou a economia brasileira voltada à exportação para a Europa.' },
  { tema: 'brasil-colonia', frente: 'O que significa "bandeirismo"?', verso: 'A expansão dos paulistas pelo interior do território em busca de minérios, de mão de obra indígena e de novas terras.' },
  { tema: 'brasil-colonia', frente: 'Por que o Rio de Janeiro virou capital do Brasil?', verso: 'Com a chegada da família real em 1808, fugindo da invasão napoleônica na Europa, e por sua excelente posição portuária.' },
  { tema: 'brasil-colonia', frente: 'O que foi o sistema de sesmarias?', verso: 'Terras devolutas cedidas pelo governo português a colonizadores para cultivo, base da estrutura fundiária colonial.' },
  { tema: 'brasil-republica', frente: 'O que foi a República Oligárquica?', verso: 'Período de 1894 a 1930 em que São Paulo e Minas Gerais alternavam o poder, com voto de cabresto e forte apego ao latifúndio exportador.' },
  { tema: 'brasil-republica', frente: 'O que foram as Leis de Cabanagem (1937)?', verso: 'Decretos que adiaram por dez anos o pagamento das dívidas dos estados e a apresentação de orçamentos ao Congresso.' },
  { tema: 'brasil-republica', frente: 'Qual foi o papel de JK no desenvolvimento brasileiro?', verso: 'Seu governo (1956–1961) priorizou o Plano de Metas, com obras de infraestrutura e a construção de Brasília.' },
  { tema: 'brasil-republica', frente: 'O que caracterizou o governo de Médici (1969–1974)?', verso: 'O endurecimento da repressão política, com o AI-5, a repressão a grupos de resistência armada e a política de repressão econômica.' },
  { tema: 'brasil-republica', frente: 'Qual foi o principal motivo da crise da dívida nos anos 1980?', verso: 'Os juros externos altíssimos após 1979, o fim do acesso fácil ao crédito internacional e agrowth combinada do endividamento público.' },
  { tema: 'mundo-antigo', frente: 'O que caracterizou a civilização mesoamericana dos olmecas?', verso: 'O desenvolvimento de escrita, contagem e calendário, além de grandes centros cerimoniais: são considerados o berço das civilizações pré-colombianas.' },
  { tema: 'mundo-antigo', frente: 'Quem foi Hammurábi?', verso: 'Rei da Babilônia (séc. XVIII a.C.), autor do Código de Hammurábi — um dos mais antigos conjuntos de leis conservados até hoje.' },
  { tema: 'mundo-antigo', frente: 'O que foi a Revolução Nômade?', verso: 'O movimento de povos das estepes do interior da Mongólia (séc. XIII) que derrubou o Império Chinês Song e expandiu o poder mongol.' },
  { tema: 'mundo-antigo', frente: 'Qual a diferença entre helenismo e romanização?', verso: 'Helenismo: difusão da cultura grega após as conquistas de Alexandre. Romanização: imposição de costumes, leis e língua romanas pelo Império.' },
  { tema: 'idade-media', frente: 'O que eram os feudos?', verso: 'Grandes terras (senhorios) cujo dono oferecia proteção ao camponês (servo), que trabalhava a terra em troca de apoio.' },
  { tema: 'idade-media', frente: 'Qual foi o papel da Igreja Católica na Idade Média?', verso: 'Central na vida cotidiana: organizava o calendário, a educação e a caridade, além de ordens mendicantes como franciscanos e dominicanos.' },
  { tema: 'idade-media', frente: 'O que é humanismo?', verso: 'Movimento renascentista que valorizava o ser humano e a Antiguidade clássica, em oposição ao teocentrismo medieval.' },
  { tema: 'idade-media', frente: 'Quem foi Leonardo da Vinci?', verso: 'Artista, cientista e inventor italiano, autor de obras como "A Última Ceia" e o "Homem Vitruviano".' },
  { tema: 'idade-media', frente: 'O que foi a Peste Negra?', verso: 'Peste bubônica que chegou à Europa em 1347 e matou grande parte da população, enfraquecendo o feudalismo e acelerando as mudanças sociais.' },
  { tema: 'era-moderna', frente: 'O que foi o Iluminismo?', verso: 'Movimento intelectual do século XVIII que defendia a razão, a liberdade individual e o combate ao absolutismo.' },
  { tema: 'era-moderna', frente: 'O que foi o Tratado de Tordesillas?', verso: 'Acordo de 1494, firmado por Portugal e Espanha, que dividiu as terras do Novo Mundo entre as duas coroas.' },
  { tema: 'era-moderna', frente: 'O que caracterizou a Revolução Industrial?', verso: 'O crescimento da indústria, do trabalho assalariado e da urbanização, que transformou profundamente as sociedades do século XIX.' },
  { tema: 'era-moderna', frente: 'Quem foi Simón Bolívar?', verso: 'Líder venezuelano que libertou vários países da Espanha na América do Sul e se tornou conhecido como "O Libertador".' },
  { tema: 'era-moderna', frente: 'O que foi o Código Napoleônico?', verso: 'Conjunto de leis de 1804 que reorganizou o direito privado na França e influenciou diversos códigos do mundo ocidental.' },
  { tema: 'guerras', frente: 'O que foi a Liga das Nações?', verso: 'Organização criada em 1920 após a Primeira Guerra para manter a paz; mostrou-se ineficaz diante das agressões dos anos 1930.' },
  { tema: 'guerras', frente: 'O que foi o Marshall Plan?', verso: 'Programa americano de 1948 que forneceu recursos financeiros para a reconstrução da Europa Ocidental após a guerra.' },
  { tema: 'guerras', frente: 'O que caracterizou a Guerra do Vietnã?', verso: 'Conflito entre o Vietnã do Norte e o do Sul (1955–1975), marcado pela intervenção dos EUA e pela forte oposição interna ao recrutamento.' },
  { tema: 'guerras', frente: 'O que foi a détente?', verso: 'Período de tensão reduzida entre EUA e URSS na década de 1970, com acordos de controle de armas e de cooperação espacial.' },
  { tema: 'guerras', frente: 'O que marcou o fim da Guerra Fria?', verso: 'A queda do Muro de Berlim em 1989 e a dissolução da URSS em 1991, encerrando a bipolaridade mundial.' }
];

const LINHA_DO_TEMPO = [
  { ano: -3000, titulo: 'Unificação do Egito', descricao: 'Narmer unifica o Alto e o Baixo Egito, iniciando o período de grande civilização no Vale do Nilo.', tema: 'mundo-antigo' },
  { ano: -1754, titulo: 'Código de Hammurábi', descricao: 'O rei babilônico Hammurábi faz gravar um dos mais antigos códigos de leis da história.', tema: 'mundo-antigo' },
  { ano: -1200, titulo: 'Crise da Idade do Bronze', descricao: 'Os Povos do Mar causam a ruína de grandes civilizações do Mediterrâneo oriental.', tema: 'mundo-antigo' },
  { ano: -509, titulo: 'República de Atenas', descricao: 'Clístenes institui a democracia ateniense, modelo de participação política direta.', tema: 'mundo-antigo' },
  { ano: -221, titulo: 'Unificação da China', descricao: 'Qin Shi Huang unifica os estados chineses e funda o primeiro império do país.', tema: 'mundo-antigo' },
  { ano: -27, titulo: 'Início do Império Romano', descricao: 'Otávio Augusto assume o poder e inaugura o Principado, período de Pax Romana.', tema: 'mundo-antigo' },
  { ano: 476, titulo: 'Queda do Império Romano do Ocidente', descricao: 'A deposição de Rômulo Augústulo encerra o Império ocidental e abre a Idade Média.', tema: 'idade-media' },
  { ano: 1095, titulo: 'Início das Cruzadas', descricao: 'O Papa Urbano II convoca a primeira Cruzada, impulsionando o comércio com o Mediterrâneo oriental.', tema: 'idade-media' },
  { ano: 1206, titulo: 'Império Mongol', descricao: 'Temujin é proclamado Gengis Khan, fundando um dos maiores impérios da história.', tema: 'idade-media' },
  { ano: 1347, titulo: 'Peste Negra na Europa', descricao: 'A peste chega a Messina e se espalha pela Europa, causando milhões de mortes.', tema: 'idade-media' },
  { ano: 1453, titulo: 'Queda de Constantinopla', descricao: 'Maomé II conquista a cidade, encerrando o Império Bizantino e consolidando o poder otomano.', tema: 'idade-media' },
  { ano: 1492, titulo: 'Viagem de Colombo', descricao: 'A viagem de Cristóvão Colombo chega às Américas, inaugurando a colonização europeia do continente.', tema: 'era-moderna' },
  { ano: 1500, titulo: 'Chegada dos portugueses ao Brasil', descricao: 'A frota de Pedro Álvares Cabral chega ao Brasil, que passa a ser colonizado por Portugal.', tema: 'brasil-colonia' },
  { ano: 1517, titulo: 'Protesto de Martinho Lutero', descricao: 'As 95 Teses inauguram a Reforma Protestante e a divisão religiosa do Ocidente.', tema: 'idade-media' },
  { ano: 1543, titulo: 'Modelo heliocêntrico', descricao: 'Copérnico publica o sistema solar com o Sol no centro, mudando a visão do universo.', tema: 'idade-media' },
  { ano: 1648, titulo: 'Paz de Vestfália', descricao: 'Fim da Guerra dos Trinta Anos e reconhecimento da soberania dos Estados nacionais.', tema: 'era-moderna' },
  { ano: 1750, titulo: 'Revolução Industrial na Inglaterra', descricao: 'A mecanização da produção têxtil e o uso da máquina a vapor inauguram a era industrial.', tema: 'era-moderna' },
  { ano: 1789, titulo: 'Revolução Francesa', descricao: 'A tomada da Bastilha dispara o processo revolucionário e a Declaração dos Direitos do Homem e do Cidadão.', tema: 'era-moderna' },
  { ano: 1808, titulo: 'Chegada da família real ao Brasil', descricao: 'Dom João VI desembarca no Rio de Janeiro, que passa a ser a capital do país.', tema: 'brasil-colonia' },
  { ano: 1815, titulo: 'Congresso de Viena', descricao: 'A reconstrução do mapa europeu após a queda de Napoleão e o chamado equilíbrio de poder.', tema: 'era-moderna' },
  { ano: 1822, titulo: 'Independência do Brasil', descricao: 'Declarada por Dom Pedro I em 7 de setembro, encerrando o período colonial.', tema: 'brasil-colonia' },
  { ano: 1889, titulo: 'Proclamação da República', descricao: 'A República é proclamada em 15 de novembro, encerrando o Segundo Reinado.', tema: 'brasil-republica' },
  { ano: 1914, titulo: 'Primeira Guerra Mundial', descricao: 'A crise dos Bálcãs leva à guerra mais sangrenta da história até então.', tema: 'guerras' },
  { ano: 1917, titulo: 'Revolução Russa', descricao: 'Os bolcheviques tomam o poder e fundam a primeira República Socialista do mundo.', tema: 'guerras' },
  { ano: 1929, titulo: 'Grande Depressão', descricao: 'A crise financeira de Wall Street se espalha pelo mundo e agrava as tensões políticas.', tema: 'guerras' },
  { ano: 1930, titulo: 'Revolução de 1930 no Brasil', descricao: 'Getúlio Vargas chega ao poder, encerrando a República Oligárquica.', tema: 'brasil-republica' },
  { ano: 1937, titulo: 'Estado Novo', descricao: 'A Carta Constitucional concentra poderes no presidente e institui o regime autoritário de Vargas.', tema: 'brasil-republica' },
  { ano: 1939, titulo: 'Segunda Guerra Mundial', descricao: 'O conflito mais destrutivo da história envolve cerca de setenta países.', tema: 'guerras' },
  { ano: 1945, titulo: 'Fim da Segunda Guerra e criação da ONU', descricao: 'A organização internacional é criada com o objetivo de evitar novas guerras mundiais.', tema: 'guerras' },
  { ano: 1957, titulo: 'Primeiro satélite artificial', descricao: 'O Sputnik 1 é lançado pela URSS, dando início à corrida espacial.', tema: 'guerras' },
  { ano: 1960, titulo: 'Construção de Brasília', descricao: 'A cidade-planejo é inaugurada como nova capital do país, obra símbolo do governo de JK.', tema: 'brasil-republica' },
  { ano: 1964, titulo: 'Golpe militar de 1964', descricao: 'Militares tomam o poder e iniciam a ditadura que duraria até 1985.', tema: 'brasil-republica' },
  { ano: 1969, titulo: 'Primeiro passo na Lua', descricao: 'Neil Armstrong pisa na Lua na missão Apollo 11.', tema: 'guerras' },
  { ano: 1985, titulo: 'Diretas Já e redemocratização', descricao: 'A pressão popular leva à escolha de José Sarney e ao fim da ditadura militar.', tema: 'brasil-republica' },
  { ano: 1988, titulo: 'Constituição Cidadã', descricao: 'A nova Constituição amplia direitos sociais e políticos e marca a redemocratização.', tema: 'brasil-republica' },
  { ano: 1989, titulo: 'Queda do Muro de Berlim', descricao: 'O símbolo da Guerra Fria é derrubado, acelerando o fim do bipolarismo mundial.', tema: 'guerras' },
  { ano: 1991, titulo: 'Dissolução da URSS', descricao: 'A União Soviética se dissolve, encerrando oficialmente a Guerra Fria.', tema: 'guerras' }
];
